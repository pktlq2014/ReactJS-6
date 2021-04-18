import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home/index";
import Signin from "./containers/Signin/index";
import Products from './containers/Products/products';
import Notification from './containers/Notification/Notification';
import Category from './containers/Category/category';
import Orders from './containers/Orders/orders';
import Signup from "./containers/Signup/index";
import Test from './components/Test/Test';
import Layout from "./components/Layout/index";
import PrivateRoute from './components/Admin/PrivateRoute';
function App() {
  return (
    <div className="App">
      <Router>
        <Test/>
        <Layout />
        <Switch>
          {/* <Route path="/" exact component={Home} /> */}
          <PrivateRoute path="/" exact component={Home}/>
          <PrivateRoute path="/notification" component={Notification}/>
          <PrivateRoute path="/products" component={Products}/>
          <PrivateRoute path="/orders" component={Orders}/>
          <PrivateRoute path="/category" component={Category}/>
          <Route path="/signin" component={Signin} />
          <Route path="/signup" component={Signup} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
