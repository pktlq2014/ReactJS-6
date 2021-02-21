import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home/index";
import Signin from "./containers/Signin/index";
import Signup from "./containers/Signup/index";
import Layout from "./components/Layout/index";
import PrivateRoute from './components/Admin/PrivateRoute';
function App() {
  return (
    <div className="App">
      <Router>
        <Layout />
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <PrivateRoute path="/" exact component={Home}/>
          <Route path="/signin" exact component={Signin} />
          <Route path="/signup" exact component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
