import React from "react";

const dateFormat = value => {
  return value.slice(0, 10);
};

const durationFormat = value => {
  return value + " mins";
};

export const TRAINING_COLUMNS = [
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