import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityName: '',
      cityData: {},
      display: false,
      notvalidCityName: false
    }
  }//end constructor
  setCityname = (event) => {
    event.preventDefault()
    this.setState({
      cityName: event.target.value
    })
  }
  getData = async (event) => {
    try {
      event.preventDefault();
      const axiosRespond = await axios.get(`https://us1.locationiq.com/v1/search.php?key=pk.83c86caa48f11d093c8138a3a3fc4185&city=${this.state.cityName}&format=json`);
      this.setState({
        cityData: axiosRespond.data[0],
        display: true,
        notvalidCityName: false
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
          {this.state.notvalidCityName && <p>plz enter a valid city name </p> || this.state.display &&
            <div>
              <p className="city1">{this.state.cityData.display_name}</p>
              <p className="city">{this.state.cityData.lat}</p>
              <p className="city">{this.state.cityData.lon}</p>
              <img
                className="map"
                src={`https://maps.locationiq.com/v3/staticmap?key=pk.d36871f015649f915282f374cff76628&q&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=15`}
                alt=""
              />
            </div>
          }
        </main>
        <Footer />
      </div>
    )
  }
}
export default Main