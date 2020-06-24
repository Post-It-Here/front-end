import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";

export default function Title(props) {
  return (
    <Typography
      component="h2"
      variant="h6"
      style={{
        position: "absolute",
        color: "white",
        padding: "40px 20px 20px 20px"
      }}
      gutterBottom
    >
      {props.children}
    </Typography>
  );
}

Title.propTypes = {
  children: PropTypes.node
};