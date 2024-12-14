import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import AdminSidebar from "../components/Sidebar/SidebarAdmin";
export const AdminLayout = ({ children, }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    return (_jsxs("div", { className: "flex h-screen", children: [_jsx(AdminSidebar, { isOpen: isSidebarOpen, toggleSidebar: () => setIsSidebarOpen(!isSidebarOpen) }), _jsx("main", { className: `flex-1 overflow-y-auto transition-all duration-300 ${isSidebarOpen ? "ml-64" : "ml-20"}`, children: children })] }));
};
export default AdminLayout;
