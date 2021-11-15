import ProductList from './Component/ProductList'
import Home from './Component/Home';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './Component/PrivateRoute'
import OrderList from './Component/OrderList';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <PrivateRoute path='/productlist' component={ProductList} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/orderlist' component={OrderList} />
      </Switch>
    </Router>
  );
}

export default App;
