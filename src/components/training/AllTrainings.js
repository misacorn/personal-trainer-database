import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

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
  };

  render() {
    const { allTrainings } = this.state;

    const dateFormat = value => {
      const date = new Date(value);
      return date.slice(0, 10);
    };

    const durationFormat = value => {
      return value + " mins";
    };

    const ALL_TRAININGS_COLUMNS = [
      {
        Header: "Date",
        accessor: "date",
        // Cell: props => <div> {dateFormat(props.value)} </div>
      },
      {
        Header: "Duration",
        accessor: "duration",
        Cell: props => <div>{durationFormat(props.value)}</div>
      },
      {
        Header: "Activity",
        accessor: "activity"
      },
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
      }
    ];
    return (
      <>
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
