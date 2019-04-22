import React, { Component } from "react";

class AllTrainings extends Component {
  state = { allTrainings: [] };
  render() {
    const durationFormat = value => {
      return value + " mins";
    };

    const ALL_TRAININGS_COLUMNS = [
      {
        Header: "Date",
        accessor: "date"
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
    return <>
      
    </>;
  }
}

export default AllTrainings;
