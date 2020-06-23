import React from "react";
import { withFormik, Form } from "formik";
import * as Yup from "yup";
import { connect } from "react-redux";
import styled from "styled-components";
import { registerUser } from "../actions";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

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

const SignUp = props => {
    const { values, handleChange } = props;
    return (
        <Form>
            <FormWrapper>
            <h1>Create an Account</h1>
            <TextField
            label="username"
            onChange={handleChange}
            type="username"
            placeholder="Username"
            name="username"
            />
            <TextField
             label="password"
             onChange={handleChange}
             type="password"
             placeholder="Password"
             name="password"
            />
            <ButtonWrapper>
          <Button variant="contained" type="submit">
            Sign Up
          </Button>
        </ButtonWrapper>
        </FormWrapper>
        </Form>
    );
};

const FormikApp = withFormik({
    mapPropsToValues({ username, password}) {
        return {
            username: username || "",
            password: password || ""
        };
    },
    validationSchema: Yup.object().shape({
        username: Yup.string()
        .required(),
        password: Yup.string()
        .min(8, "Password must be 8 characters or longer")
        .required()
    }),
    handleSubmit(values, { props }) {
        props.registerUser( values, props.history);
    }
})(SignUp);

export default connect(
    null,
    { registerUser }
  )(FormikApp);