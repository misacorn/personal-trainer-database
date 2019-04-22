import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import TrainingList from "../training/TrainingList";
import AllTrainings from "../training/AllTrainings";

class CustomerList extends Component {
  state = {
    customers: [],
    open: false,
    message: "New customer added!",
    showTraining: false,
    showAllCustomers: true,
    showAllTrainings: false,
    trainings: [],
    link: ""
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
    this.setState({
      showTraining: true,
      showAllCustomers: false,
      showAllTrainings: false
    });
    fetch(link)
      .then(response => response.json())
      .then(jsondata => this.setState({ trainings: jsondata.content, link }))
      .catch(err => console.error(err));
  };

  showCustomerList = () => {
    this.setState({
      showAllCustomers: true,
      showTraining: false,
      showAllTrainings: false
    });
  };

  showAllTrainings = () => {
    this.setState({
      showAllCustomers: false,
      showTrainings: false,
      showAllTrainings: true
    });
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

    const {
      showTraining,
      showAllTrainings,
      link,
      trainings,
      customers,
      open,
      message,
      showAllCustomers
    } = this.state;

    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Button
              onClick={this.showCustomerList}
              color="inherit"
              style={{ marginRight: "20px" }}
            >
              CUSTOMERS
            </Button>
            <Button onClick={this.showAllTrainings} color="inherit">
              ALL TRAININGS
            </Button>
          </Toolbar>
        </AppBar>
        {showAllCustomers && (
          <>
            <AddCustomer saveCustomer={this.saveCustomer} />
            <ReactTable
              data={customers}
              columns={CUSTOMER_COLUMNS}
              sortable
              filterable
            />
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={open}
              autoHideDuration={3000}
              onClose={this.handleClose}
              message={message}
            />
          </>
        )}
        {showAllTrainings && <AllTrainings />}
        {showTraining && <TrainingList link={link} trainings={trainings} />}
        )}
      </>
    );
  }
}

export default CustomerList;
