import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./screens/Login";
import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, isLoggedInProjectVar } from "./apollo";
import { GlobalStyles } from "./styles";
import SignUp from "./screens/SignUp";
import routes from "./routes";
import { HelmetProvider } from "react-helmet-async";
import { useState } from "react";
import Layout from "./components/Layout";
import DashBoard from "./screens/DashBoard";

function App() {
  const isLoggedInProject = useReactiveVar(isLoggedInProjectVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route path={routes.home} exact>
              {isLoggedInProject ? (
                <Layout>
                  <DashBoard />
                </Layout>
              ) : (
                <Login />
              )}
            </Route>

            {!isLoggedInProject ? (
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
