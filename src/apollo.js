import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  makeVar,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";

const TOKEN = "TOKEN_CAPSTONE";

export const isLoggedInProjectVar = makeVar(
  Boolean(localStorage.getItem(TOKEN))
);

export const logUserIn = (token) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInProjectVar(true);
};

export const logUserOut = () => {
  localStorage.removeItem(TOKEN);
  window.location.reload();
};

const uploadHttpLink = createUploadLink({
  uri:
    process.env.NODE_ENV === "production"
      ? "https://capstone-sait-kwangwoo.herokuapp.com/graphql"
      : "http://localhost:4001/graphql",

  // uri: "http://localhost:4001/graphql",
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(uploadHttpLink),
  cache: new InMemoryCache({
    typePolicies: {},
  }),
});
