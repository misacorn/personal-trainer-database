import React, { Component } from "react";

import CustomerList from "./components/customer/CustomerList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        {/* <AppBar position="static">
          <Toolbar>
            <Button onClick={this.showCustomerList} color="inherit">
              CUSTOMERS
            </Button>
          </Toolbar>
        </AppBar> */}
        <CustomerList />
      </div>
    );
  }
}

export default App;
