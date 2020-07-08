import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './screens/auth/Login';
import Dashboard from './screens/dashboard/Dashboard';
import BookingScreen from './screens/bookings/BookingScreen';
import UserScreen from './screens/users/UserScreen';
import ReviewScreen from './screens/reviews/ReviewScreen';
import TourScreen2 from './screens/tours/TourScreen2';
import CreateTour from './screens/tours/CreateTour';
import Report from './screens/reports/reports';
function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/" component={Login} />
          <Route exact path="/bookings" component={BookingScreen} />
          <Route exact path="/users" component={UserScreen} />
          <Route exact path="/reviews" component={ReviewScreen} />
          <Route exact path="/tours" component={TourScreen2} />
          <Route exact path="/reports" component={Report} />
          <Route exact path="/tours/create" component={CreateTour} />
          {/* <Route exact path="/edit/:tourId" component={EditTour} /> */}
          {/* <Route exact path="/create2" component={TourCreate} /> */}
          
        </Switch>
      </div>
    </Router>
  );
}

export default App;
