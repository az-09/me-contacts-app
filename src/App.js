import React, { Suspense } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import RenderRoute from "./components/routing/RenderRoute";
import routes from "./components/routing/routes";

import { Provider } from "./contexts/Provider";

const App = () => {
  return (
    <div>
      <Provider>
        <BrowserRouter>
          <Suspense fallback={<p>Loading</p>}>
            <Switch>
              {routes.map((route) => (
                <RenderRoute {...route} key={route.title} />
              ))}
            </Switch>
          </Suspense>
        </BrowserRouter>
      </Provider>
    </div>
  );
};

export default App;
