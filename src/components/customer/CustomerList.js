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
          <EditCar updateCar={this.updateCar} link={value} car={row} />
        )
      },
      {
        Header: " ",
        filterable: false,
        sortable: false,
        width: 100,
        accessor: "_links.self.href",
        Cell: value => (
          <Button color="secondary" onClick={() => this.deleteCar(value)}>
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