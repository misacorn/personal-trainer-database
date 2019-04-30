import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";

import AddTraining from "./AddTraining";

class TrainingList extends Component {
  state = { open: false, trainings: [], message: "" };

  handleClose = () => {
    this.setState({ open: false });
  };

  loadTrainings = link => {
    this.setState({ showTraining: true, showAllCustomers: false });
    fetch(link)
      .then(response => response.json())
      .then(jsondata => this.setState({ trainings: jsondata.content }))
      .catch(err => console.error(err));
  };

  saveTraining = training => {
    const { link } = this.props;
    fetch("https://customerrest.herokuapp.com/api/trainings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(training)
    })
      .then(res => this.loadTrainings(link))
      .then(res => this.setState({ open: true, message: "Training added!" }))
      .catch(err => console.error(err));
  };

  deleteTraining = customerLink => {
    const { link } = this.props;
    fetch(customerLink.original.links[2].href, { method: "DELETE" })
      .then(res => this.loadTrainings(link))
      .then(res => this.setState({ open: true, message: "Training deleted!" }))
      .catch(err => console.error(err));
  };

  render() {
    const { message, open } = this.state;
    const { link, trainings } = this.props;

    const dateFormat = value => {
      return value ? value.slice(0, 10) : value;
    };

    const durationFormat = value => {
      return value ? value + " mins" : value;
    };

    const TRAINING_COLUMNS = [
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
        Header: " ",
        filterable: false,
        sortable: false,
        width: 100,
        accessor: "links[2].href",
        Cell: value => (
          <Button color="secondary" onClick={() => this.deleteTraining(value)}>
            DELETE
          </Button>
        )
      }
    ];
    return (
      <>
        <AddTraining link={link} saveTraining={this.saveTraining} />
        <ReactTable
          data={trainings}
          columns={TRAINING_COLUMNS}
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
    );
  }
}

export default TrainingList;
