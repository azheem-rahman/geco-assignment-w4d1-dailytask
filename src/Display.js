import { Card, CardContent, Typography } from "@mui/material";
import React from "react";

const Display = (props) => {
  const { personData } = props;

  const personList = personData.map((person, index) => {
    return (
      <React.Fragment key={index}>
        <CardContent>
          <Typography variant="h5" component="div">
            {person.name}
          </Typography>
          <Typography color="text.secondary">{person.contact}</Typography>
          <Typography color="text.secondary">{person.email}</Typography>
          <Typography color="text.secondary">
            {person.date.getDate()}-{person.date.getMonth() + 1}-
            {person.date.getFullYear()}
          </Typography>
          <Typography variant="body2">{person.info}</Typography>
        </CardContent>
      </React.Fragment>
    );
  });
  return (
    <div>
      <Card variant="outlined">{personList}</Card>
    </div>
  );
};

export default Display;
