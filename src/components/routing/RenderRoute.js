import React from "react";
import { Route, useHistory } from "react-router-dom";
import { isAuthenticated } from "../../utils/helpers/appHelpers";

const RenderRoute = (route) => {
  const { needsAuth, path, component, title } = route;

  document.title = title || "ME Contacts";

  const history = useHistory();

  if (needsAuth && !isAuthenticated()) {
    // only if not authenticated but needs auth, authenticated = token exists
    history.push("/auth/login");
  }

  return <Route path={path} exact component={component} />;
};

export default RenderRoute;
