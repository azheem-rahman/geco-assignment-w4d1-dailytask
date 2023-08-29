import React, { Component } from "react";
import Display from "./Display";
import Form from "./Form";
import Navbar from "./Navbar";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Grid } from "@mui/material";

class App extends Component {
  state = {
    personData: [],
  };

  addData = (props) => {
    this.setState({
      personData: [...this.state.personData, props],
    });
  };

  render() {
    return (
      <>
        <header>
          <Navbar />
        </header>

        <main>
          <h2>About You</h2>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Form addData={this.addData} />
          </LocalizationProvider>

          <h2>List of People</h2>
          <Display personData={this.state.personData} />
        </main>
      </>
    );
  }
}

export default App;
