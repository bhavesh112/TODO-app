import React, {useEffect, Fragment } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Login from  "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from './components/dashboard/Dashboard';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";
import Alert from "./components/Alert";

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Header />
          <Alert></Alert>
        <Switch>
        <Route exact path="/" component={Landing} ></Route>
        <Route exact path="/register" component={Register} ></Route>
        <Route exact path="/login" component={Login} ></Route>
        <Route exact path="/dashboard" component={Dashboard} ></Route>
        </Switch>
          
          <Footer />
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
