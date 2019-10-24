import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from './Pages/Home'
import MovieDetails from './Pages/MovieDetails'
import Favorites from './Pages/Favorites'


function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/movie/:id" component={MovieDetails}/>
          <Route path="/favorites" component={Favorites}/>
        </Switch>
    </Router>
  );
}

export default App;
