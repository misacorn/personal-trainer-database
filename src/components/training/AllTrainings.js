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
        Cell: props => <div> {dateFormat(props.value)} </div>
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

      // {
      //   id: 'friendName', // Required because our accessor is not a string
      //   Header: 'Friend Name',
      //   accessor: d => d.friend.name // Custom value accessors!
      // }, {
      //   Header: props => <span>Friend Age</span>, // Custom header components!
      //   accessor: 'friend.age'
      // }

      {
        id: "firstname",
        Header: "First Name",
        accessor: d => d.customer.firstname
      },
      {
        Header: props => <div>Last Name</div>,
        accessor: "customer.lastname"
      },
      {
        Header: props => <div>Street Address</div>,
        accessor: "customer.streetaddress"
      },
      {
        Header: props => <div>Post Code</div>,
        accessor: "customer.postcode"
      },
      {
        Header: props => <div>City</div>,
        accessor: "customer.city"
      },
      {
        Header: props => <div>Email</div>,
        accessor: "customer.email"
      },
      {
        Header: props => <div>Phone</div>,
        accessor: "customer.phone"
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
