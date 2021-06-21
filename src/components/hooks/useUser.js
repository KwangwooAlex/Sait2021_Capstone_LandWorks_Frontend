import { gql, useQuery, useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInProjectVar, logUserOut } from "../../apollo";

export const ME_QUERY = gql`
  query me {
    me {
      username
      email
      companyName
      phoneNumber
      avatar
      birth
      country
      state
      city
      Street
    }
  }
`;

function useUser() {
  const hasToken = useReactiveVar(isLoggedInProjectVar);
  const { data } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  useEffect(() => {
    if (data?.me === null) {
      logUserOut();
    }
  }, [data]);
  return { data };
}
export default useUser;
