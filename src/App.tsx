import React from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Import your pages
import Login from "./pages/Login/Login";

import SignUp from "./pages/SignUp/SignUp";
import Calculator from "./pages/Kalkulator/Kalkulator";
import Navbar from "./components/Navbar/Navbar";

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
import PanduanForm from "./pages/Admin/PanduanForm";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import UserPage from "./pages/Admin/User/User";
import JadwalAdmin from "./pages/Admin/Jadwal/Jadwal";
import EditJadwal from "./pages/Admin/Jadwal/EditJadwal";
import AddJadwal from "./pages/Admin/Jadwal/TambahJadwal";
import PostPage from "./pages/Admin/Forum/Post";

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
// import "@ionic/react/css/palettes/dark.system.css";

/* Theme variables */
import "./theme/variables.css";
import Jadwal from "./pages/Jadwal/jadwal";
import Home from "./pages/Home/Home";
import Panduan from "./pages/Panduan/Panduan";


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
      <Navbar />
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/panduan" component={Panduan} />
          <Route exact path="/jadwal" component={Jadwal} />
          <Route exact path="/kalkulator" component={Calculator} />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/add-panduan" component={PanduanForm} />

          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/user" component={UserPage} />
          <Route exact path="/jadwal-admin" component={JadwalAdmin} />
          <Route exact path="/edit-jadwal/:id" component={EditJadwal} />
          <Route exact path="/tambah-jadwal" component={AddJadwal} />
          <Route exact path="/post-admin" component={PostPage} />


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
