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
import MyTeam from "./screens/MyTeam";
import MyProfile from "./screens/MyProfile";
import MyProject from "./screens/MyProject";
import Files from "./screens/Files";
import Overview from "./screens/Overview";
import Members from "./screens/Members";

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

            <Route path={routes.myTeam} exact>
              {isLoggedInProject ? (
                <Layout>
                  <MyTeam />
                </Layout>
              ) : (
                <Login />
              )}
            </Route>

            <Route path={routes.myProfile} exact>
              {isLoggedInProject ? (
                <Layout>
                  <MyProfile />
                </Layout>
              ) : (
                <Login />
              )}
            </Route>
    {/* ******************************************************************* */}
            <Route path={`/myProject/:teamName`}>
              {isLoggedInProject ? (
                <Layout>
                  <MyProject />
                </Layout>
              ) : (
                <Login />
              )}
            </Route>

            <Route path={routes.overview} exact>
            {/* <Route path={`/myProject/:teamName/:projectId`} > */}
              {isLoggedInProject ? (
                <Layout>
                  <Overview />
                </Layout>
              ) : (
                <Login />
              )}
            </Route>

            <Route path={routes.files} exact>
            {/* <Route path={`/files/:projectId`} exact> */}
              {isLoggedInProject ? (
                <Layout>
                  <Files />
                </Layout>
              ) : (
                <Login />
              )}
            </Route>

            <Route path={routes.members} exact>
            {/* <Route path={`/files/:projectId`} exact> */}
              {isLoggedInProject ? (
                <Layout>
                  <Members />
                </Layout>
              ) : (
                <Login />
              )}
            </Route>

    {/* ******************************************************************* */}
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
