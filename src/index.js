import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Home from './containers/Home';
import Login from './containers/Login';
import UserHome from './components/UserHome';
import Inventory from './containers/Inventory';
import InventoryDetails from './components/InventoryDetails';
import Locations from './containers/Locations';
import Returns from './containers/Returns';
import ReturnView from './containers/ReturnView';
import RequireAuth from './containers/RequireAuth';
import Adjustments from './containers/Adjustments';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';


//import style
import './styles/app.css';
import './styles/layout.css';

const store = configureStore();


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="userhome" component={RequireAuth(UserHome)} />
        <Route path="inventory" component={RequireAuth(Inventory)} />
        <Route path="inventory/locations" component={RequireAuth(Locations)} />
        <Route path="inventory/:id" component={RequireAuth(InventoryDetails)} />
        <Route path="returns/add" component={RequireAuth(Returns)} />
        <Route path="returns/view" component={RequireAuth(ReturnView)} />
        <Route path="adjustments" component={RequireAuth(Adjustments)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
