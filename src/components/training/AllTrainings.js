import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";

class AllTrainings extends Component {
  state = { allTrainings: [] };

  componentDidMount = () => {
    this.loadAllTrainings();
  };

  loadAllTrainings = () => {
    fetch("https://customerrest.herokuapp.com/gettrainings")
      .then(response => response.json())
      .then(jsondata => this.setState({ allTrainings: jsondata }))
      .catch(err => console.error(err));
    console.log(this.state.allTrainings);
  };

  render() {
    const { allTrainings } = this.state;

    const dateFormat = value => {
      const date = new Date(value);
      return (
        date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
      );
    };

    const durationFormat = value => {
      return value + " mins";
    };

    const ALL_TRAININGS_COLUMNS = [
      {
        Header: "Date",
        accessor: "date",
        Cell: props => <> {dateFormat(props.value)} </>
      },
      {
        Header: "Duration",
        accessor: "duration",
        Cell: props => <>{durationFormat(props.value)}</>
      },
      {
        Header: "Activity",
        accessor: "activity"
      },
      {
        id: "firstname",
        Header: "First Name",
        accessor: d => d.customer.firstname
      },
      {
        Header: props => <>Last Name</>,
        accessor: "customer.lastname"
      },
      {
        Header: props => <>Street Address</>,
        accessor: "customer.streetaddress"
      },
      {
        Header: props => <>Post Code</>,
        accessor: "customer.postcode"
      },
      {
        Header: props => <>City</>,
        accessor: "customer.city"
      },
      {
        Header: props => <>Email</>,
        accessor: "customer.email"
      },
      {
        Header: props => <>Phone</>,
        accessor: "customer.phone"
      }
    ];
    return (
      <>
        <Button style={{ margin: "30px", fontSize: "20px" }}>
          ALL TRAININGS
        </Button>
        <ReactTable
          data={allTrainings}
          columns={ALL_TRAININGS_COLUMNS}
          sortable
          filterable
        />
      </>
    );
  }
}

export default AllTrainings;
