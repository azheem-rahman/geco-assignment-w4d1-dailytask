import React, { Component } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers";
import { Button, FormControl } from "@mui/material";

class Form extends Component {
  state = {
    name: "",
    date: "",
    email: "",
    contact: "",
    info: "",
    errorMessages: {
      nameError: "",
      dateError: "",
      emailError: "",
      contactError: "",
      infoError: "",
    },
    formValid: false,
  };

  handleChange = (event) => {
    const eventId = event.target.id;
    const eventValue = event.target.value;

    if (eventId == "name") {
      this.validateName(eventValue);
    }
    if (eventId == "email") {
      this.validateEmail(eventValue);
    }
    if (eventId == "contact") {
      this.validateContact(eventValue);
    }
    if (eventId == "info") {
      this.validateInfo(eventValue);
    }
  };

  handleDateChange = (event) => {
    let inputDateOfBirth = event.$d;
    this.validateDate(inputDateOfBirth);
  };

  validateName = (name) => {
    let formValid = this.state.formValid;
    let nameError = this.state.errorMessages.nameError;
    let nameOnlyAlphabets = /^[A-Za-z]+$/;

    if (name.trim() === "") {
      formValid = false;
      nameError = "Please enter name";
    } else if (!nameOnlyAlphabets.test(name)) {
      formValid = false;
      nameError = "Please enter only alphabets";
    } else {
      formValid = true;
      nameError = "";
    }

    this.setState({
      name: name,
      formValid: formValid,
      errorMessages: { ...this.state.errorMessages, nameError },
    });

    return formValid;
  };

  validateDate = (date) => {
    let formValid = this.state.formValid;
    let dateError = this.state.errorMessages.dateError;

    let todayDate = new Date();
    let checkSmallerDate = date.getTime() <= todayDate.getTime();

    if (!checkSmallerDate) {
      formValid = false;
      dateError = "DOB cannot be greater than today's date";
    } else {
      formValid = true;
      dateError = "";
    }

    this.setState({
      date: date,
      formValid: formValid,
      errorMessages: { ...this.state.errorMessages, dateError },
    });

    return formValid;
  };

  validateEmail = (email) => {
    let formValid = this.state.formValid;
    let emailError = this.state.errorMessages.emailError;
    let emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    if (!emailPattern.test(email)) {
      formValid = false;
      emailError = "Please enter valid email";
    } else {
      formValid = true;
      emailError = "";
    }

    this.setState({
      email: email,
      formValid: formValid,
      errorMessages: { ...this.state.errorMessages, emailError },
    });

    return formValid;
  };

  validateContact = (contact) => {
    let formValid = this.state.formValid;
    let contactError = this.state.errorMessages.contactError;

    let isNum = /^\d+$/;

    if (contact.trim() === "") {
      formValid = false;
      contactError = "Please enter contact";
    } else if (!isNum.test(contact)) {
      formValid = false;
      contactError = "Please enter digits only";
    } else if (contact.trim().length !== 10) {
      formValid = false;
      contactError = "Please enter 10 digits";
    } else {
      formValid = true;
      contactError = "";
    }

    this.setState({
      contact: contact,
      formValid: formValid,
      errorMessages: { ...this.state.errorMessages, contactError },
    });

    return formValid;
  };

  validateInfo = (info) => {
    let formValid = this.state.formValid;
    let infoError = this.state.errorMessages.infoError;

    if (info.trim() === "") {
      formValid = false;
      infoError = "Please enter info";
    } else {
      formValid = true;
      infoError = "";
    }

    this.setState({
      info: info,
      formValid: formValid,
      errorMessages: { ...this.state.errorMessages, infoError },
    });

    return formValid;
  };

  handleSubmit = (event) => {
    event.preventDefault();

    if (
      this.validateName(this.state.name) &&
      this.validateDate(this.state.date) &&
      this.validateEmail(this.state.email) &&
      this.validateContact(this.state.contact) &&
      this.validateInfo(this.state.info)
    ) {
      alert("Form is validated!");

      this.props.addData(this.state);

      this.setState({
        name: "",
        date: "",
        email: "",
        contact: "",
        info: "",
        formValid: false,
      });
    }
  };

  render() {
    return (
      <form autoComplete="off" onSubmit={this.handleSubmit}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          style={{ border: "solid 1px black" }}
        >
          <div>
            <TextField
              required
              id="name"
              label="Name"
              onChange={this.handleChange}
              helperText={this.state.errorMessages.nameError}
            />
            <DatePicker
              label="Date of Birth"
              onChange={this.handleDateChange}
              format="DD-MM-YYYY"
              slotProps={{
                textField: {
                  required: true,
                  helperText: this.state.errorMessages.dateError,
                },
              }}
            />
          </div>

          <div>
            <TextField
              required
              id="email"
              label="Email"
              onChange={this.handleChange}
              helperText={this.state.errorMessages.emailError}
            />
            <TextField
              required
              id="contact"
              label="Contact No."
              onChange={this.handleChange}
              helperText={this.state.errorMessages.contactError}
            />
          </div>

          <div>
            <TextField
              required
              id="info"
              label="Tell me about yourself"
              multiline
              rows={4}
              onChange={this.handleChange}
              helperText={this.state.errorMessages.infoError}
            />
          </div>

          <div>
            <Button type="submit" variant="contained" sx={{ margin: 1 }}>
              Submit
            </Button>
          </div>
        </Box>
      </form>
    );
  }
}

export default Form;
