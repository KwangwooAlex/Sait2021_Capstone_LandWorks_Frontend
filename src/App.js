import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./screens/Login";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { GlobalStyles } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path={routes.home} exact>
              <Login />
            </Route>
            {!isLoggedIn ? (
              <Route path={routes.signUp}>
                <SignUp />
              </Route>
            ) : null}
          </Switch>
        </Router>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
