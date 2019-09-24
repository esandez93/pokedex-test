import React from "react";
import styles from "./App.styles.scss";
import { Route, Switch } from 'react-router';

import {
  Pokedex,
  PokeDetail
} from 'pages';

const App = (props) => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Pokedex} />
        <Route exact path="/:id" component={PokeDetail} />
      </Switch>
    </div>
  );
}

export default App;
