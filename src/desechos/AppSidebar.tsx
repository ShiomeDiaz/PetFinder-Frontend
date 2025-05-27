// import { Home, Plus, Settings, PawPrint } from "lucide-react";
// import { Link, useLocation } from "react-router-dom";
// import React from "react";

// interface AppSidebarProps {
//   collapsed: boolean;
//   mobileOpen: boolean;
//   setMobileOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const menuItems = [
//   { title: "Inicio", url: "/pets", icon: <Home className="w-5 h-5" /> },
//   { title: "Mis Mascotas", url: "/myPets", icon: <PawPrint className="w-5 h-5" /> },
// ];

// const AppSidebar: React.FC<AppSidebarProps> = ({
//   collapsed,
//   mobileOpen,
//   setMobileOpen,
//   setCollapsed,
// }) => {
//   const location = useLocation();

//   // Cierra el sidebar móvil al navegar
//   React.useEffect(() => {
//     setMobileOpen(false);
//   }, [location.pathname, setMobileOpen]);

//   // Cierra el sidebar móvil al redimensionar a escritorio
//   React.useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768) setMobileOpen(false);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, [setMobileOpen]);

//   // Sidebar styles
//   const sidebarWidth = collapsed ? "w-20" : "w-64";

//   return (
//     <>
//       {/* Overlay móvil */}
//       <div
//         className={`fixed inset-0 bg-black/50 z-30 md:hidden transition-opacity duration-300 ${
//           mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setMobileOpen(false)}
//       />

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed md:sticky top-0 left-0 h-screen
//           bg-gradient-to-b from-orange-50/80 to-white/90
//           border-r border-sidebar-border z-40 flex flex-col justify-between
//           shadow-lg shadow-orange-200
//           transition-all duration-300
//           ${sidebarWidth}
//           ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
//           rounded-tr-2xl md:rounded-tr-none
//         `}
//       >
//         <div>
//           <div className={`px-4 pt-8 pb-4 flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
//             <span className={`font-extrabold text-sidebar-primary transition-all duration-300 ${collapsed ? "text-xl" : "text-2xl"}`}>
//               {collapsed ? "🐾" : "LPTracker"}
//             </span>
//           </div>
//           {/* Menú */}
//           <div className="px-2">
//             <div className={`text-xs uppercase text-sidebar-foreground font-semibold mb-2 ${collapsed ? "text-center" : "text-left"}`}>
//               Menú
//             </div>
//             <ul className="flex flex-col gap-1">
//               {menuItems.map((item) => (
//                 <li key={item.title}>
//                   <Link
//                     to={item.url}
//                     className={`
//                       flex items-center ${collapsed ? "justify-center" : "gap-2"} px-3 py-2 rounded-md font-medium transition
//                       ${location.pathname === item.url
//                         ? "bg-sidebar-accent text-sidebar-accent-foreground"
//                         : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"}
//                     `}
//                   >
//                     {item.icon}
//                     {!collapsed && <span>{item.title}</span>}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//             <div className={`text-xs uppercase text-sidebar-foreground font-semibold mt-6 mb-2 ${collapsed ? "text-center" : "text-left"}`}>
//               Acciones
//             </div>
//             <button
//               type="button"
//               className={`
//                 flex items-center ${collapsed ? "justify-center" : "gap-2"} px-3 py-2 rounded-md w-full bg-sidebar-accent text-sidebar-accent-foreground hover:bg-primary hover:text-primary-foreground transition font-medium
//                 shadow shadow-orange-100
//               `}
//               onClick={() => window.dispatchEvent(new CustomEvent("add-pet"))}
//             >
//               <Plus className="w-5 h-5" />
//               {!collapsed && <span>Reportar mascota</span>}
//             </button>
//           </div>
//         </div>
//         <div className="px-2 pb-6">
//           <Link
//             to="/ajustes"
//             className={`
//               flex items-center ${collapsed ? "justify-center" : "gap-2"} px-3 py-2 rounded-md text-sidebar-foreground hover:text-sidebar-primary hover:bg-sidebar-accent transition
//             `}
//           >
//             <Settings className="w-5 h-5" />
//             {!collapsed && <span>Ajustes</span>}
//           </Link>
//         </div>
//       </aside>
//     </>
//   );
// };

// export default AppSidebar;
