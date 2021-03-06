import React from 'react';
import ReactDOM from 'react-dom';
import { syncHistoryWithStore } from 'react-router-redux'
import App from './components/App';
import Home from './containers/Home';
import Login from './containers/Login';
import UserHome from './components/UserHome';
import Inventory from './containers/Inventory';
import ItemDetail from './containers/ItemDetail';
import Locations from './containers/Locations';
import Returns from './containers/Returns';
import ReturnView from './containers/ReturnView';
import RequireAuth from './containers/RequireAuth';
import Adjustments from './containers/Adjustments';
import Receipts from './containers/Receipts';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';


//import style
import './styles/app.css';
import './styles/layout.css';

const store = configureStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="login" component={Login} />
        <Route path="userhome" component={RequireAuth(UserHome)} />
        <Route path="inventory" component={RequireAuth(Inventory)} />
        <Route path="inventory/locations" component={RequireAuth(Locations)} />
        <Route path="inventory/:id" component={RequireAuth(ItemDetail)} />
        <Route path="receipt/:id" component={RequireAuth(Receipts)} />
        <Route path="returns/add" component={RequireAuth(Returns)} />
        <Route path="returns/view" component={RequireAuth(ReturnView)} />
        <Route path="adjustments" component={RequireAuth(Adjustments)} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
