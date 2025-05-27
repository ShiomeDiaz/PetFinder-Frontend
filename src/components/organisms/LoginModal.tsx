// // src/components/organisms/LoginModal.tsx
// import React from "react";
// import { X } from "lucide-react";
// import { useAuthModal } from "../context/AuthModalContext";
// import { useAuth } from "../context/AuthContext";

// const LoginModal: React.FC = () => {
//   const { showLoginModal, closeLoginModal } = useAuthModal();
//   const { login } = useAuth();

//   const handleGoogleLogin = () => {
//     login();
//   };

//   if (!showLoginModal) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-white rounded-2xl shadow-2xl border-t-4 border-orange-400 w-full max-w-md p-8 relative">
//         <button
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl"
//           onClick={closeLoginModal}
//           aria-label="Cerrar"
//           type="button"
//         >
//           <X />
//         </button>
//         <h2 className="text-2xl font-extrabold text-center mb-1">Iniciar sesión</h2>
//         <p className="text-sm text-muted-foreground text-center mb-6">
//           Accede a tu cuenta para gestionar tus mascotas
//         </p>
//         <button
//           onClick={handleGoogleLogin}
//           className="
//             flex items-center justify-center gap-3 w-full border-2 border-gray-300 rounded-lg
//             py-2 mb-4 font-semibold text-gray-700 hover:bg-gray-100 transition
//             text-base
//           "
//         >
//           <img
//             src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
//             alt="Google"
//             className="w-6 h-6"
//           />
//           Continuar con Google
//         </button>
//       </div>
//     </div>
//   );
// };

// export default LoginModal;
