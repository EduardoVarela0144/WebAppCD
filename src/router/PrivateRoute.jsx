import { useQuery } from "react-query";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import SimpleLoading from "../components/SimpleLoading";
import { useLocation } from "react-router-dom";
import { ROLES } from "../config";

export default function AuthenticatedRoute({ Component }) {
  const { Auth } = useContext(AuthContext);
  const { isLoading } = useQuery("auth", () => Auth);
  const location = useLocation();
  const currentURL = location.pathname;
  // Loading Auth
  if (isLoading) {
    return <SimpleLoading />;
  } else {
    // If loading is finish and user is autenticated
    if (Auth !== null && Auth !== undefined) {
      // If user is autenticated and try to use login or register
      if (
        currentURL === "/Login" ||
        currentURL === "/Register" ||
        currentURL === "/register"
      ) {
        return <Navigate to="/PinGame" />;
      } // If user autenticated try to use Dashboard
      else if (
        ( currentURL === "/Dashboard" ||
          currentURL === "/Dashboard/Users" ||
          currentURL === "/Dashboard/Users" ||
          currentURL.startsWith("/Dashboard/Requests")

        ) && Auth?.rol?.name !== ROLES.Admin
      ) {
        return <Navigate to="/403" />;
      } else {
        // In other case show component
        return <Component />;
      }
    } else {
      // If user is not autenticated and try to use Login or register
      if (
        currentURL === "/Login" ||
        currentURL === "/Register" ||
        currentURL === "/register"
      ) {
        return <Component />;
      } else {
        // If user is not autenticated and try to use protected routes
        return <Navigate to="/Login" />;
      }
    }
  }
}
