import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './App.css';
import './App.scss';
import './_bulma.sass'
import SideNav from './components/sideNav/SideNav'
import Dashboard from "./components/dashboard/Dashboard";
import SignedInNav from "./components/signedInNav/SignedInNav"
import SignedOutNav from "./components/signedOutNav/SignedOutNav"
import Schedule from "./components/schedule/Schedule"
import Employees from "./components/employees/Employees"
import Loading from "./components/loading/Loading"
import Login from "./components/login/Login"
import CreateGame from "./components/schedule/CreateGame"
import Availability from "./components/employees/Availability"
import CreateEmployee from "./components/employees/CreateEmployee"
import TopBar from './topBar/TopBar';

function App() {
  //https://stackoverflow.com/questions/31084779/how-to-restrict-access-to-routes-in-react-router
  // const [isAuthenticated, userHasAuthenticated] = useState(true);

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
      {/* <Nav isLoggedIn={true}/> */}
      <TopBar/>
      <div className="App">
          <SideNav/>
          <Switch>            
            <Route path="/login" exact component={Login}/>
            <Route path="/" exact component={Dashboard} />
            <Route path="/schedule" exact component={Schedule}/>
            <Route path="/employees" exact component={Employees}/>
            <Route path="/createEmployee" component={CreateEmployee}/>
            <Route path="/loading" exact component={Loading} />
            <Route path="/createGame" component={CreateGame} />
            <Route path="/availability" component={Availability}/>
          </Switch>
      </div>
    </Router>
      
      
  );
}

export default App;
