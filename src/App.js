import React, { Component } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import CustomerList from "./components/customer/CustomerList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit">
              CUSTOMER LIST
            </Typography>
          </Toolbar>
        </AppBar>
        <CustomerList />
      </div>
    );
  }
}

export default App;
