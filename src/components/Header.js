import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

class Header extends React.Component {

  render() {
    return (
      <div>
        <header className="jumbotron text-center">
          <h1 className="header"> City Explorer</h1>
        </header>
      </div>
    );
  }
}
export default Header;