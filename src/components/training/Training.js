import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";

class Training extends Component {
  state = { trainings: [], open: false };

  loadTrainings = () => {
    this.setState({ open: true });
    const trainingUrl = this.props.link;
    fetch(trainingUrl)
      .then(response => response.json())
      .then(jsondata => this.setState({ trainings: jsondata.content }))
      .catch(err => console.error(err));
  };

  deleteTraining = () => {};

  render() {
    const columns = [
      {
        Header: "Date",
        accessor: "date"
      },
      {
        Header: "Duration",
        accessor: "duration"
      },
      {
        Header: "Activity",
        accessor: "activity"
      }
      // {
      //   Header: " ",
      //   filterable: false,
      //   sortable: false,
      //   width: 100,
      //   accessor: "links[0].href",
      //   Cell: value => (
      //     <Button color="secondary" onClick={() => this.deleteTraining(value)}>
      //       DELETE
      //     </Button>
      //   )
      // }
    ];

    return (
      <div>
        {/* <ReactTable
          data={this.state.trainings}
          columns={columns}
          sortable={true}
          filterable={true}
        /> */}
        <Button onClick={this.loadTrainings}>SHOW</Button>
        {this.state.open && (
          <ReactTable
            data={this.state.trainings}
            columns={columns}
            sortable={true}
            filterable={true}
          />
        )}
      </div>
    );
  }
}

export default Training;
