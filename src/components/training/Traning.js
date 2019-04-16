import React, { Component } from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";

class Traning extends Component {
  state = { trainings: [] };

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

    return <div>SHOW</div>;
  }
}

export default Traning;
