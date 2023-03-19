import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import AllSpots from "./components/AllSpots";
import SingleSpot from "./components/SpotDetails";
import CreateSpot from "./components/CreateSpot";
import CurrentUserSpots from "./components/CurrentUserSpots";
import UpdateSpotForm from "./components/UpdateSpot";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.thunkRestoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <AllSpots />
          </Route>
          <Route path="/spots/new">
            <CreateSpot />
          </Route>
          <Route path="/spots/current">
            <CurrentUserSpots />
          </Route>
          <Route path="/spots/:spotId/edit">
            <UpdateSpotForm />
          </Route>
          <Route path="/spots/:spotId">
            <SingleSpot />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
