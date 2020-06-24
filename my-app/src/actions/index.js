import axiosWithAuth from "../utils/axiosWithAuth";
import axios from "axios";

import { packagePost, packageEditedPost } from "../utils/postPackager";

// FETCHING
export const FETCHING_START = "FETCHING_START";
export const FETCHING_SUCCESS = "FETCHING_SUCCESS";
export const FETCHING_FAIL = "FETCHING_FAIL";

// REGISTERING
export const POST_START = "POST_START";
export const POST_SUCCESS = "POST_SUCCESS";
export const POST_FAIL = "POST_FAIL";

// DELETING POSTS
export const DELETE_START = "DELETE_START";
export const DELETE_SUCCESS = "DELETE_SUCCESS";
export const DELETE_FAIL = "DELETE_FAIL";

// LOG-IN
export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

// DRAFTS
export const ADD_DRAFT = "ADD_DRAFT";
export const DELETE_DRAFT = "DELETE_DRAFT";
export const EDIT_DRAFT = "EDIT_DRAFT";

// EVALUATE
export const EVAL_START = "EVAL_START";
export const EVAL_SUCCESS = "EVAL_SUCCESS";
export const EVAL_FAIL = "EVAL_FAIL";

// EDITING
export const EDIT_SAVED_POST = "EDIT_SAVED_POST";
export const EDIT_SUCCESS = "EDIT_SUCCESS";
export const EDIT_FAIL = "EDIT_FAIL";

// SAVING
export const SAVE_START = "SAVE_START";
export const SAVE_SUCCESS = "SAVE_SUCCESS";
export const SAVE_FAIL = "SAVE_FAIL";

const BASE_URL = "https://unit-4-build.herokuapp.com/";
const DS_API =
  "https://post-it-here-data-api.herokuapp.com/api/predict";

export const login = (credentials, history) => dispatch => {
  console.log(credentials, "login users credentials");
  dispatch({ type: LOGIN_START });
  axios
    .post(`${BASE_URL}api/auth/login`, credentials)
    .then(res => {
      console.log("response from server", res);
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      history.push("/Savedposts");
    })
    .catch(err => {
      console.log("Error on login", err);
      dispatch({ type: LOGIN_FAIL, payload: err });
    });
};

export const registerUser = (user, history) => dispatch => {
  console.log(user)
  axios
    .post(`${BASE_URL}api/auth/register`, user)
    .then(res => {
      const { token, user } = res.data;
      localStorage.setItem("token", token);
          history.push("/");
    })
    .catch(err => {
      console.log("Error on registration", err);
      dispatch({ type: POST_FAIL, payload: err });
    });
};

export const getSavedPosts = userID => dispatch => {
  dispatch({ type: FETCHING_START });
  axiosWithAuth()
    .get(`/posts/${userID}/user`)
    .then(res => {
      console.log("fetched save posts from backend", res);
      dispatch({ type: FETCHING_SUCCESS, payload: res });
    })
    .catch(err => {
      dispatch({ type: FETCHING_FAIL, payload: err });
    });
};

export const savePost = (draft, recommendations, userID) => dispatch => {
  console.log("this is the draft", draft);
  console.log("these are the recommenations", recommendations);
  console.log("this is the userID", userID);

  dispatch({ type: SAVE_START });
  const delivery = packagePost(draft, recommendations);

  axiosWithAuth()
    .post(`${BASE_URL}posts/${userID}`, delivery)
    .then(res => {
      console.log("response from saving post", res);
      dispatch({ type: SAVE_SUCCESS, payload: res.data });
    })
    .catch(err => {
      console.log("error response from saving post", err);
      dispatch({ type: SAVE_FAIL, payload: err });
    });
};

export const evaluatePost = draft => dispatch => {
  dispatch({ type: EVAL_START });
  const dsDraft = { title: draft.title, post: draft.content };
  console.log("submitting to DS API", dsDraft);
  axios
    .post(DS_API, dsDraft)
    .then(res => {
      console.log("response from DS API", res);
      dispatch({ type: EVAL_SUCCESS, payload: res.data });
    })
    .catch(err => {
      dispatch({ type: EVAL_FAIL, payload: err });
      console.log("Evaluation error", err);
    });
  };

export const editPost = draft => dispatch => {
  dispatch({ type: EDIT_SAVED_POST, payload: draft });
};

export const saveEdit = (draft, recommendations, id) => dispatch => {
  console.log("this is the draft", draft);
  console.log("these are the recommenations", recommendations);
  console.log("this is the id", id);
};
