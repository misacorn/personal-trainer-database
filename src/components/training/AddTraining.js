import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class AddTraining extends Component {
  state = { open: false, date: "", duration: "", activity: "" };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addNewTraining = () => {
    const { date, duration, activity } = this.state;
    const { link, saveTraining } = this.props;
    const parts = link.split("/");
    parts.pop();
    const customer = parts.join("/");
    const newTraining = {
      date,
      duration,
      activity,
      customer
    };

    saveTraining(newTraining);
    this.handleClose();
  };

  render() {
    return (
      <>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Customer</DialogTitle>
          <DialogContent>
            <TextField
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="date"
              label="Date"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              name="duration"
              label="Duration"
              fullWidth
            />
            <TextField
              onChange={this.handleChange}
              margin="dense"
              name="activity"
              label="Activity"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addNewTraining} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Button
          style={{ margin: "30px", fontSize: "20px" }}
          onClick={this.handleClickOpen}
        >
          ADD TRAINING
        </Button>
      </>
    );
  }
}

export default AddTraining;
