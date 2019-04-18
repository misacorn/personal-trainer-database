import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { TRAINING_COLUMNS } from "./constants";

class CustomerList extends Component {
  state = {
    customers: [],
    open: false,
    message: "New customer added!",
    showTraining: false,
    showAllCustomers: true,
    trainings: []
  };

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

  handleClose = () => {
    this.setState({ open: false });
  };

  loadTrainings = link => {
    this.setState({ showTraining: true });
    fetch(link)
      .then(response => response.json())
      .then(jsondata => this.setState({ trainings: jsondata.content }))
      .catch(err => console.error(err));
  };

  showCustomerList = () => {
    this.setState({ showAllCustomers: true, showTraining: false });
  };

  render() {
    const CUSTOMER_COLUMNS = [
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
        accessor: "links[2].href",
        Cell: ({ value, row }) => (
          <Button onClick={() => this.loadTrainings(value)}>SHOW</Button>
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
        <AppBar position="static">
          <Toolbar>
            <Button onClick={this.showCustomerList} color="inherit">
              CUSTOMERS
            </Button>
          </Toolbar>
        </AppBar>
        {this.state.showTraining && (
          <>
            <ReactTable
              data={this.state.trainings}
              columns={TRAINING_COLUMNS}
              sortable={true}
              filterable={true}
            />
          </>
        )}
        {this.state.showAllCustomers && (
          <>
            <AddCustomer saveCustomer={this.saveCustomer} />
            <ReactTable
              data={this.state.customers}
              columns={CUSTOMER_COLUMNS}
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
          </>
        )}
        )}
      </div>
    );
  }
}

export default CustomerList;
