import React, { useState, useEffect } from "react";
import { withFormik, Form } from "formik";
import { fade, makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { connect } from "react-redux";
import { evaluatePost, savePost } from "../actions";
import ReactMde from "react-mde";
import * as Showdown from "showdown";
import "react-mde/lib/styles/css/react-mde-all.css";

const PostTextWrapper = styled.div`
  width: 60%;
  margin: 0 auto;
  margin-top: 30px;
  text-align: center;
`;

const ButtonsWrapper = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const TitleWrapper = styled.div`
  margin-left: -7px;
`;
const useStylesReddit = makeStyles(theme => ({
  root: {
    border: "1px solid #e2e2e1",
    overflow: "hidden",
    borderRadius: 4,
    backgroundColor: "#fcfcfb",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    "&:hover": {
      backgroundColor: "#fff"
    },
    "&$focused": {
      backgroundColor: "#fff",
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
      borderColor: theme.palette.primary.main
    }
  },
  focused: {}
}));

function RedditTextField(props) {
  const classes = useStylesReddit();

  return (
    <TextField InputProps={{ classes, disableUnderline: true }} {...props} />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  margin: {
    margin: theme.spacing(1)
  }
}));

const converter = new Showdown.Converter({
  tables: true,
  simplifiedAutoLink: true,
  strikethrough: true,
  tasklists: true
});

const Post = props => {
  const { values, handleChange, recommendations, userID } = props;
  const classes = useStyles();
  const [value, setValue] = useState("**Write Your Post Here**");
  const [selectedTab, setSelectedTab] = useState("write");

  return (
    <PostTextWrapper>
      <h1>Post It Here!</h1>
      <Form>
        <TitleWrapper>
          <RedditTextField
            label="Reddit Title Here"
            name="title"
            className={classes.margin}
            variant="filled"
            id="reddit-input"
            fullWidth
            onChange={handleChange}
            value={values.title}
            style={{ width: "99%" }}
          />{" "}
        </TitleWrapper>
        <br />

        <RedditTextField
          label="Reddit Post Here"
          name="content"
          className={classes.margin}
          variant="filled"
          multiline
          rows="16"
          fullWidth
          id="reddit-input"
          onChange={handleChange}
          value={values.content}
        />
        <ButtonsWrapper>
          <Button
            variant="outlined"
            className={classes.button}
            color="primary"
            type="submit"
          >
            Submit For Recommendation
          </Button>

          <Button
            variant="outlined"
            className={classes.button}
            color="secondary"
            onClick={() => {
              props.savePost(values, recommendations, userID);
            }}
          >
            Save
          </Button>
        </ButtonsWrapper>
      </Form>
    </PostTextWrapper>
  );
};

const FormikAppPost = withFormik({
  mapPropsToValues(props) {
    const { title, content } = props.savedPost;
    return {
      title: title || "",
      content: content || ""
    };
  },
  handleSubmit(values, { props }) {
    props.evaluatePost(values);
  }
})(Post);

const mapStateToProps = state => {
  return {
    savedPost: state.savedPost,
    recommendations: state.recommendations,
    userID: state.loggedInUser
  };
};

export default connect(
  mapStateToProps,
  { evaluatePost, savePost }
)(FormikAppPost);