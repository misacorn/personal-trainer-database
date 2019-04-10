import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

class CustomerList extends Component {
  state = { customers:[], open: false, message: "New customer added!"  }

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(jsondata => this.setState({ customers: jsondata._embedded.cars }))
      .catch(err => console.error(err));
  }

  saveCustomer = customer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    })
      .then(res => this.loadCars())
      .then(res => this.setState({ open: true, message: this.state.message }))
      .catch(err => console.error(err));
  };

  updateCar = (link, updatedCustomer) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCustomer)
    })
      .then(res => this.loadCars())
      .then(res => this.setState({ open: true, message: "Customer updated!" }))
      .catch(err => console.error(err));
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {
    
    const columns = [
      {
        Header: "First Name",
        accessor: "firstname"
      },
      {
        Header: "Last Name",
        accessor: "lastname"
      },
      {
        Header: "Street Address",
        accessor: "streetaddress"
      },
      {
        Header: "Post Code",
        accessor: "postcode"
      },
      {
        Header: "City",
        accessor: "city"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Phone",
        accessor: "phone"
      },
      {
        Header: " ",
        filterable: false,
        sortable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: ({ value, row }) => (
          <EditCustomer updateCar={this.updateCustomer} link={value} customer={row} />
        )
      },
      {
        Header: " ",
        filterable: false,
        sortable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: value => (
          <Button color="secondary" onClick={() => this.deleteCustomer(value)}>
            DELETE
          </Button>
        )
      }
    ]

    return (
      
    );
  }
}

export default CustomerList;