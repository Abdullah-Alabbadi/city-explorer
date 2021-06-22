import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { description } from 'commander';
export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      display: false,
      notvalidCityName: false,
      lat: '',
      lon: '',
      date: '',
      description: '',
      city: '',
      movieData: [],
      title: '',
    }
  }//end constructor
  setCityname = (event) => {
    event.preventDefault()
    this.setState({
      cityName: event.target.value
    })
    console.log(this.state.cityName);
  }
  getData = async (event) => {
    try {
      event.preventDefault();
      await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.772c13421f7724e653c39b528cc1fb54&city=${this.state.cityName}&format=json`).then(responseVonAxios => {
        console.log(responseVonAxios);
        this.setState({
          lat: responseVonAxios.data[0].lat,
          lon: responseVonAxios.data[0].lon,
        });
console.log(this.state.lon, this.state.lat);
      });

      await axios.get(`http://localhost:8080/weather?lat=${this.state.lat}&lon=${this.state.lon}`).then(object => {
        console.log(object);
        this.setState({
          date: object.data[0].date,
          description: object.data[0].description,
          display: true,
          cityData: object.data,
        })
        console.log(this.state.cityData);
      })

      await axios.get(`http://localhost:8080/movies?city=${this.state.cityName}`).then(object => {
        console.log(object);
        this.setState({
          movieData: object.data,
        })
        console.log(this.state.movieData);

      })
    }
    catch (error) {
      this.setState({ notvalidCityName: true })
    }
  }
  render() {
    return (
      <div>
        <Header />
        <main>
          <Form onSubmit={this.getData} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>City Name</Form.Label>
              <Form.Control type="text" onChange={this.setCityname} placeholder="Enter name" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Explore
            </Button>
          </Form>
          {this.state.notvalidCityName && <p>please check city name </p>}
          {this.state.display &&
            <div>
              <p className="city1">{this.state.cityData.display_name}</p>
              <p className="city">{this.state.cityData.lat}</p>
              <p className="city">{this.state.cityData.lon}</p>
              <img
                className="map"
                src={`https://maps.locationiq.com/v3/staticmap?key=pk.d36871f015649f915282f374cff76628&q&center=${this.state.lat},${this.state.lon}&zoom=15`}
                alt=""
              />
              {this.state.cityData.map(value => {
                return (
                  <>
                    <p>{this.state.date}</p>
                    <p>{this.state.description}</p>
                  </>
                )
              })
              }

              {
                this.state.movieData.map(value => {
                  return (
                    <>
                      <img src={`https://image.tmdb.org/t/p/w500${value.poster_path}`} alt={value.title} />
                      <p>{value.overview}</p>
                      <p>{value.vote_average}</p>
                      <p>{value.vote_count}</p>
                      <p>{value.popularity}</p>
                      <p>{value.release_date}</p>
                    </>
                  )
                })
              }
            </div>
          }
        </main>
        <Footer />
      </div>
    )
  }
}
export default Main