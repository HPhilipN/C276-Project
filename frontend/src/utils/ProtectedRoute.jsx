// ProtectedRoute.jsx
import React, { useContext } from "react";
import { Route, redirect } from "react-router-dom";
import { UserContext } from "./UserContext";

// TODO: use to secure routes without relying on navigate
function ProtectedRoute({ component: Component, ...rest }) {
   const { isModerator } = useContext(UserContext);

   return (
      <Route
         {...rest}
         render={(props) => (isModerator ? <Component {...props} /> : redirect("/"))}
      />
   );
}

export default ProtectedRoute;
