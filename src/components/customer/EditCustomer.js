import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

class EditCustomer extends Component {
  state = {
    open: false,
    firstname: "",
    lastname: "",
    streetaddress: "",
    postcode: "",
    city: "",
    email: "",
    phone: ""
  };

  handleClickOpen = () => {
    const {
      firstname,
      lastname,
      streetaddress,
      postcode,
      city,
      email,
      phone
    } = this.props.customer;
    this.setState({
      open: true,
      firstname,
      lastname,
      streetaddress,
      postcode,
      city,
      email,
      phone
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  editCustomer = () => {
    const {
      firstname,
      lastname,
      streetaddress,
      postcode,
      city,
      email,
      phone
    } = this.state;
    const newCustomer = {
      firstname,
      lastname,
      streetaddress,
      postcode,
      city,
      email,
      phone
    };
    this.props.updateCustomer(this.props.link, newCustomer);
    this.handleClose();
  };

  render() {
    const {
      firstname,
      lastname,
      streetaddress,
      postcode,
      city,
      email,
      phone
    } = this.props.customer;

    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Customer</DialogTitle>
          <DialogContent>
            <TextField
              defaultValue={firstname}
              onChange={this.handleChange}
              autoFocus
              margin="dense"
              name="firstname"
              label="First Name"
              fullWidth
            />
            <TextField
              defaultValue={lastname}
              onChange={this.handleChange}
              margin="dense"
              name="lastname"
              label="Last name"
              fullWidth
            />
            <TextField
              defaultValue={streetaddress}
              onChange={this.handleChange}
              margin="dense"
              name="streetaddress"
              label="Street Address"
              fullWidth
            />
            <TextField
              defaultValue={postcode}
              onChange={this.handleChange}
              margin="dense"
              name="postcode"
              label="Post code"
              fullWidth
            />
            <TextField
              defaultValue={city}
              onChange={this.handleChange}
              margin="dense"
              name="city"
              label="City"
              fullWidth
            />
            <TextField
              defaultValue={email}
              onChange={this.handleChange}
              margin="dense"
              name="email"
              label="Email"
              fullWidth
            />
            <TextField
              defaultValue={phone}
              onChange={this.handleChange}
              margin="dense"
              name="phone"
              label="Phone"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={this.editCustomer} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
        <Button onClick={this.handleClickOpen}>EDIT</Button>
      </div>
    );
  }
}
export default EditCustomer;
