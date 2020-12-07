import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import './App.css';
import './App.sass';
import Dashboard from "./client/components/dashboard/Dashboard";
import SignedInNav from "./client/components/signedInNav/SignedInNav"
import SignedOutNav from "./client/components/signedOutNav/SignedOutNav"
import Schedule from "./client/components/schedule/Schedule"
import Employees from "./client/components/employees/Employees"
import Loading from "./client/components/loading/Loading"
import Login from "./client/components/login/Login"

function App() {
  //https://stackoverflow.com/questions/31084779/how-to-restrict-access-to-routes-in-react-router
  const [isAuthenticated, userHasAuthenticated] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad(){
    try{
      //await google authentication
      userHasAuthenticated(true)
    }
    catch(e){
      alert(e);
      console.log("error logging in: " + e);
    }
  }

  //const isLoggedIn = false; //TODO: change this based on weather the user is authenticated

  function Nav(props){
    let {isLoggedIn} = props;
    if(isLoggedIn === true){
      return <SignedInNav/>
    }
    else{
      return <SignedOutNav/>
    }
  }

  return (
      <Router>
        <div className="App">
          <Nav isLoggedIn={true}/>
          <Switch>
            <Route path="/login" exact component={Login} appProps={{isAuthenticated}}/>
            <Route path="/" exact component={Dashboard} appProps={{isAuthenticated}}/>
            <Route path="/schedule" exact component={Schedule} appProps={{isAuthenticated}}/>
            <Route path="/employees" exact component={Employees} appProps={{isAuthenticated}}/>
              <Route path="/loading" exact component={Loading} />
          </Switch>

        </div>
      </Router>
  );
}

export default App;
