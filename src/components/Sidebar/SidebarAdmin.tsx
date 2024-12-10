import { IonIcon } from "@ionic/react";
import {
  bookOutline,
  calendarOutline,
  chatboxOutline,
  documentTextOutline,
  homeOutline,
  logOutOutline,
} from "ionicons/icons";
import { useState } from "react";

export const AdminSidebar: React.FC<{
  isOpen: boolean;
  toggleSidebar: () => void;
  onLogout?: () => void;
}> = ({ isOpen, toggleSidebar, onLogout }) => {
  const [isForumDropdownOpen, setIsForumDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setActiveMenu("logout");
  };

  return (
    <aside
      className={`bg-[#3e885b] text-white h-full fixed left-0 top-0 bottom-0 z-50 
        transition-all duration-300 shadow-lg
        ${isOpen ? "w-64" : "w-20"} overflow-hidden`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {isOpen && (
            <h2 className="text-xl font-bold text-white">Admin Panel</h2>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded hover:bg-[#2f4b26] transition"
          >
            <IonIcon
              icon={documentTextOutline}
              className="w-6 h-6 text-white"
            />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 py-4">
          <ul>
            {/* Dashboard */}
            <li
              onClick={() => setActiveMenu("dashboard")}
              className={`px-4 py-2 flex items-center cursor-pointer transition 
                ${isOpen ? "justify-start" : "justify-center"}
                ${
                  activeMenu === "dashboard"
                    ? "bg-[#2f4b26]"
                    : "hover:bg-[#2f4b26]"
                }`}
            >
              <IonIcon icon={homeOutline} className="w-6 h-6 mr-3 text-white" />
              {isOpen && <span className="text-white">Dashboard</span>}
            </li>

            {/* Panduan */}
            <li
              onClick={() => setActiveMenu("panduan")}
              className={`px-4 py-2 flex items-center cursor-pointer transition
                ${isOpen ? "justify-start" : "justify-center"}
                ${
                  activeMenu === "panduan"
                    ? "bg-[#2f4b26]"
                    : "hover:bg-[#2f4b26]"
                }`}
            >
              <IonIcon icon={bookOutline} className="w-6 h-6 mr-3 text-white" />
              {isOpen && <span className="text-white">Panduan</span>}
            </li>

            {/* Jadwal */}
            <li
              onClick={() => setActiveMenu("jadwal")}
              className={`px-4 py-2 flex items-center cursor-pointer transition
                ${isOpen ? "justify-start" : "justify-center"}
                ${
                  activeMenu === "jadwal"
                    ? "bg-[#2f4b26]"
                    : "hover:bg-[#2f4b26]"
                }`}
            >
              <IonIcon
                icon={calendarOutline}
                className="w-6 h-6 mr-3 text-white"
              />
              {isOpen && <span className="text-white">Jadwal</span>}
            </li>

            {/* Forum Dropdown */}
            <li>
              <div
                onClick={() => {
                  setIsForumDropdownOpen(!isForumDropdownOpen);
                  setActiveMenu("forum");
                }}
                className={`px-4 py-2 flex items-center cursor-pointer transition
                  ${isOpen ? "justify-start" : "justify-center"}
                  ${
                    activeMenu === "forum"
                      ? "bg-[#3e885b]"
                      : "hover:bg-[#2f4b26]"
                  }`}
              >
                <IonIcon
                  icon={chatboxOutline}
                  className="w-6 h-6 mr-3 text-white"
                />
                {isOpen && (
                  <>
                    <span className="flex-1 text-white">Forum</span>
                    <span
                      className={`transform transition-transform text-white
                      ${isForumDropdownOpen ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </>
                )}
              </div>

              {isOpen && isForumDropdownOpen && (
                <ul className="bg-[#3e885b] py-2">
                  <li
                    onClick={() => setActiveMenu("post")}
                    className={`px-8 py-2 text-white cursor-pointer 
                      ${
                        activeMenu === "post"
                          ? "bg-[#2f4b26]"
                          : "hover:bg-[#2f4b26]"
                      }`}
                  >
                    Post
                  </li>
                  <li
                    onClick={() => setActiveMenu("komentar")}
                    className={`px-8 py-2 text-white cursor-pointer 
                      ${
                        activeMenu === "komentar"
                          ? "bg-[#2f4b26]"
                          : "hover:bg-[#2f4b26]"
                      }`}
                  >
                    Komentar
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>

        {/* Logout Menu */}
        <div className="border-t border-white/20">
          <li
            onClick={handleLogout}
            className={`px-4 py-3 flex items-center cursor-pointer transition 
              ${isOpen ? "justify-start" : "justify-center"}
              ${
                activeMenu === "logout" ? "bg-[#2f4b26]" : "hover:bg-[#2f4b26]"
              }`}
          >
            <IonIcon icon={logOutOutline} className="w-6 h-6 mr-3 text-white" />
            {isOpen && <span className="text-white">Logout</span>}
          </li>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
