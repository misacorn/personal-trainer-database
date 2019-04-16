import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

import CustomerList from "./components/customer/CustomerList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit">CUSTOMERS</Button>
          </Toolbar>
        </AppBar>
        <CustomerList />
      </div>
    );
  }
}

export default App;
