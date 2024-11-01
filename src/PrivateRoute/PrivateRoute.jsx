import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);
  
  useEffect(() => {
    console.log("heyyyyyyyy");
    if (!currentUser) {
<<<<<<< HEAD
      window.location.reload();
=======
      console.log("No user");
      // Optionally handle cleanup
>>>>>>> fcfa1e12303633f5a7647789fa751010a6ce53d4
    }
  }, []);

  return currentUser ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;
