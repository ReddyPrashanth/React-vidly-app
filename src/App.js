import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Movies from './components/Movies';
import MovieForm from './components/MovieForm';
import Customers from './components/Customers';
import Rentals from './components/Rentals';
import NotFound from './components/NotFound';
import Navbar from './components/common/Navbar';

class App extends Component {
  state = {  }
  render() { 
    return (
      <React.Fragment>
        <Navbar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm} />
            <Route path="/movies" component={Movies} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect exact to="/movies" from="/" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
     );
  }
}
 
export default App;