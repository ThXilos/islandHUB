import React,{useEffect} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom"; 
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-form/CreateProfile";
import EditProfile from "./components/profile-form/EditProfile";
import AddExperience from "./components/profile-form/AddExperience";
import PrivateRoute from "./components/routing/PrivateRoute";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import {Container} from "@material-ui/core";
import './css/App.css';
//Redux
import {Provider} from "react-redux";
import store from "./store";
import Alerts from "./components/layout/Alerts";
import setAuthToken from "./utils/setAuthToken";
import {loadUser} from "./actions/auth";


if (localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () => {
useEffect(()=>{
store.dispatch(loadUser());
},[]);

  return (
    <Provider store={store}>
    <Router>
    <Container disableGutters>
      <Navbar/>
      <Route exact path="/" component={Profiles} />
      <section>
        <Alerts />
        <Switch>
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/profiles" component={Profiles} />
          <Route exact path="/profile/:id" component={Profile} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/create-profile" component={CreateProfile} />
          <PrivateRoute exact path="/edit-profile" component={EditProfile} />
          <PrivateRoute exact path="/add-experience" component={AddExperience} />
        </Switch> 
      </section>
    </Container>
    </Router>
    </Provider>
  
  
  );
}

export default App;
