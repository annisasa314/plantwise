import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// Import your pages
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import Calculator from "./pages/Kalkulator/Kalkulator";
import PanduanForm from "./pages/Admin/Panduan/PanduanForm";
import Dashboard from "./pages/Admin/Dashboard/Dashboard";
import UserPage from "./pages/Admin/User/User";
import JadwalAdmin from "./pages/Admin/Jadwal/Jadwal";
import EditJadwal from "./pages/Admin/Jadwal/EditJadwal";
import AddJadwal from "./pages/Admin/Jadwal/TambahJadwal";
import PostPage from "./pages/Admin/Forum/Post";
import CommentPage from "./pages/Admin/Forum/Komentar";
import Jadwal from "./pages/Jadwal/jadwal";
import Home from "./pages/Home/Home";
import Panduan from "./pages/Panduan/Panduan";
import AdminLogin from "./pages/Admin/Login/AdminLogin";
import AdminTutorials from "./pages/Admin/Panduan/Panduan";
import { RequireAuth } from "./middleware/auth.middleware";
import { AdminOnly } from "./middleware/admin.middleware";
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
// import Profile from "./pages/Profile/Profile";
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
import ForumPage from "./pages/Forum/ForumPage";
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
const App = () => (_jsx(QueryClientProvider, { client: queryClient, children: _jsx(IonApp, { children: _jsx(IonReactRouter, { children: _jsxs(IonRouterOutlet, { children: [_jsx(Route, { exact: true, path: "/login", component: Login }), _jsx(Route, { exact: true, path: "/signup", component: SignUp }), _jsx(Route, { exact: true, path: "/home", component: Home }), _jsx(Route, { exact: true, path: "/panduan", children: _jsx(RequireAuth, { children: _jsx(Panduan, {}) }) }), _jsx(Route, { exact: true, path: "/jadwal", children: _jsx(RequireAuth, { children: _jsx(Jadwal, {}) }) }), _jsx(Route, { exact: true, path: "/kalkulator", children: _jsx(RequireAuth, { children: _jsx(Calculator, {}) }) }), _jsx(Route, { exact: true, path: "/forum", children: _jsx(RequireAuth, { children: _jsx(ForumPage, {}) }) }), _jsx(Route, { exact: true, path: "/admin", component: AdminLogin }), _jsx(Route, { exact: true, path: "/admin/panduan/add", children: _jsx(AdminOnly, { children: _jsx(PanduanForm, {}) }) }), _jsx(Route, { exact: true, path: "/admin/dashboard", children: _jsx(AdminOnly, { children: _jsx(Dashboard, {}) }) }), _jsx(Route, { exact: true, path: "/admin/user", children: _jsx(AdminOnly, { children: _jsx(UserPage, {}) }) }), _jsx(Route, { exact: true, path: "/admin/jadwal", children: _jsx(AdminOnly, { children: _jsx(JadwalAdmin, {}) }) }), _jsx(Route, { exact: true, path: "/edit-jadwal/:id", children: _jsx(AdminOnly, { children: _jsx(EditJadwal, {}) }) }), _jsx(Route, { exact: true, path: "/tambah-jadwal", children: _jsx(AdminOnly, { children: _jsx(AddJadwal, {}) }) }), _jsx(Route, { exact: true, path: "/post-admin", children: _jsx(AdminOnly, { children: _jsx(PostPage, {}) }) }), _jsx(Route, { exact: true, path: "/admin/forum/komentar", children: _jsx(AdminOnly, { children: _jsx(CommentPage, {}) }) }), _jsx(Route, { exact: true, path: "/admin/forum/post", children: _jsx(AdminOnly, { children: _jsx(PostPage, {}) }) }), _jsx(Route, { exact: true, path: "/admin/panduan", children: _jsx(AdminOnly, { children: _jsx(AdminTutorials, {}) }) }), _jsx(Route, { path: "/admin/panduan/edit/:id", component: () => _jsx(PanduanForm, { isEditMode: true }) }), _jsx(Route, { exact: true, path: "/", children: _jsx(Redirect, { to: "/home" }) })] }) }) }) }));
export default App;
