import React from "react";
import { withFormik, Form } from "formik";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { login } from "../actions";
import { connect } from "react-redux";

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  margin-left: 33%;
  margin-top: 10%;
  text-align: center;
`;

const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const Login = ({ handleChange }) => {
  return (
    <Form>
      <FormWrapper>
        <h1 style={{ color: "#333355" }}>Login</h1>
        <TextField
          label="username"
          variant="outlined"
          onChange={handleChange}
          type="username"
          placeholder="Username"
          name="username"
        />
        <TextField
          label="password"
          variant="outlined"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          name="password"
        />{" "}
        <ButtonWrapper>
          <Button variant="contained" type="submit">
            Login
          </Button>
        </ButtonWrapper>
      </FormWrapper>
    </Form>
  );
};

const FormikApp = withFormik({
  mapPropsToValues({ username, password }) {
    return {
      username: username || "",
      password: password || ""
    };
  },
  handleSubmit(values, { props }) {
    props.login(values, props.history);
  }
})(Login);

export default connect(
    null,
    { login }
  )(FormikApp);