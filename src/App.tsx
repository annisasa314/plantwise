import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import your pages
import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import Signup from "./pages/SignUp/SignUp";

// Ionic CSS
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

// Optional CSS
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import Profile from "./pages/Profile/Profile";

setupIonicReact();

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      // cacheTime: 30 * 60 * 1000, // 30 minutes
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/home" component={Home} />
          {/* <Route exact path="/forum" component={Forum} /> */}
          {/* <Route exact path="/calculator" component={Calculator} /> */}
          <Route exact path="/profile" component={Profile} />

          {/* Default redirect */}
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </QueryClientProvider>
);

export default App;
