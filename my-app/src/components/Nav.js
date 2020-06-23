import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white
    }
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    backgroundColor: "#505050"
  },
  toolbarTitle: {
    flexGrow: 1,
    fontWeight: 900,
    color: "#333453"
  },
  link: {
    margin: theme.spacing(1, 1.5)
  }
}));

export default function Nav() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="static" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            variant="h6"
            color="inherit"
            noWrap
            className={classes.toolbarTitle}
          ></Typography>
          <nav>
            <RouterLink style={{ textDecoration: "none" }} to="/Savedposts">
              <Link
                variant="button"
                color="textPrimary"
                style={{ fontWeight: 700, color: "white" }}
                className={classes.link}
              >
                profile
              </Link>
            </RouterLink>
            <RouterLink style={{ textDecoration: "none" }} to="/">
              <Link
                variant="button"
                color="textPrimary"
                style={{ fontWeight: 700, color: "white" }}
                className={classes.link}
              >
                new post
              </Link>
            </RouterLink>
            {!localStorage.getItem("token") && (
              <RouterLink style={{ textDecoration: "none" }} to="./Signup">
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.link}
                >
                  Signup
                </Button>
              </RouterLink>
            )}
            {localStorage.getItem("token") ? (
              <RouterLink style={{ textDecoration: "none" }} to="/">
                <Button
                  onClick={() => {
                    localStorage.removeItem("token");
                  }}
                  href="#"
                  variant="contained"
                  className={classes.link}
                  color="primary"
                  style={{ fontWeight: 700 }}
                >
                  Logout
                </Button>
              </RouterLink>
            ) : (
              <RouterLink style={{ textDecoration: "none" }} to="/Login">
                <Button
                  href="#"
                  color="primary"
                  variant="contained"
                  className={classes.link}
                >
                  Login
                </Button>
              </RouterLink>
            )}
          </nav>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}