import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import Training from "../training/Traning";

class CustomerList extends Component {
  state = { customers: [], open: false, message: "New customer added!" };

  componentDidMount() {
    this.loadCustomers();
  }

  loadCustomers = () => {
    fetch("https://customerrest.herokuapp.com/api/customers")
      .then(response => response.json())
      .then(jsondata => this.setState({ customers: jsondata.content }))
      .catch(err => console.error(err));
  };

  saveCustomer = customer => {
    fetch("https://customerrest.herokuapp.com/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(customer)
    })
      .then(res => this.loadCustomers())
      .then(res => this.setState({ open: true, message: this.state.message }))
      .catch(err => console.error(err));
  };

  updateCustomer = (link, updatedCustomer) => {
    fetch(link, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedCustomer)
    })
      .then(res => this.loadCustomers())
      .then(res => this.setState({ open: true, message: "Customer updated!" }))
      .catch(err => console.error(err));
  };

  deleteCustomer = customerLink => {
    fetch(customerLink.original.links[0].href, { method: "DELETE" })
      .then(res => this.loadCustomers())
      .then(res => this.setState({ open: true, message: "Customer deleted!" }))
      .catch(err => console.error(err));
  };

  loadTrainings = () => {};

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
        Header: "Training",
        filterable: false,
        sortable: false,
        width: 100,
        accessor: "links[0].href",
        Cell: ({ value, row }) => (
          <Training
            updateCustomer={this.updateCustomer}
            link={value}
            customer={row}
          />
        )
      },
      {
        Header: " ",
        filterable: false,
        sortable: false,
        width: 100,
        accessor: "links[0].href",
        Cell: ({ value, row }) => (
          <EditCustomer
            updateCustomer={this.updateCustomer}
            link={value}
            customer={row}
          />
        )
      },
      {
        Header: " ",
        filterable: false,
        sortable: false,
        width: 100,
        accessor: "links[0].href",
        Cell: value => (
          <Button color="secondary" onClick={() => this.deleteCustomer(value)}>
            DELETE
          </Button>
        )
      }
    ];

    return (
      <div>
        <AddCustomer saveCustomer={this.saveCustomer} />
        <ReactTable
          data={this.state.customers}
          columns={columns}
          sortable={true}
          filterable={true}
        />
        <Snackbar
          anchorOrigin={{
            vertical: "top",
            horizontal: "left"
          }}
          open={this.state.open}
          autoHideDuration={3000}
          onClose={this.handleClose}
          message={this.state.message}
        />
      </div>
    );
  }
}

export default CustomerList;
