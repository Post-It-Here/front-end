import React from 'react';
import Signup from './components/Signup'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Login from './components/Login';
import Nav from './components/Nav'
import styled from 'styled-components';
import PrivateRoute from './utils/PrivateRoute';
import SavedPosts from './components/SavedPosts';
import FormikAppPost from './components/Post';
import FormikAppSinglePost from "./components/SinglePost"
import RecommendationList from './components/RecommendationList';

function App() {
  const NewPostWrapper = styled.div`display: flex;`;

  return (
    <Router>
      <div className="App">
      <Route path="/" component={Nav} />
      <Route
					path="/Singlepost"
					render={() => {
						return (
							<NewPostWrapper>
								<FormikAppSinglePost />
								<RecommendationList />
							</NewPostWrapper>
						);
					}}
				/>
        <Route
					exact
					path="/"
					render={() => {
						return (
							<NewPostWrapper>
								<FormikAppPost />
								<RecommendationList />
							</NewPostWrapper>
						);
					}}
				/>
        <Route exact path="/Login" component={Login} />
				<Route exact path="/Signup" component={Signup} />
        <PrivateRoute exact path="/Savedposts" component={SavedPosts} />
      </div>
    </Router>
  )
}



export default App;
