import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import 'antd/dist/antd.css';
import Home from "./pages/Home";

import UserList from "./pages/Users/list";
import UserShow from "./pages/Users/edit";
import UserCreate from "./pages/Users/create";

function Routes() {
  return (
    <Router>
        <Home>
            <Switch>
                <Route exact path={'/'} component={UserList}/>
                <Route exact path={'/users/create'} component={UserCreate}/>
                <Route exact path={'/users/:id'} component={UserShow}/>
            </Switch>
        </Home>
    </Router>
  );
}

export default Routes;
