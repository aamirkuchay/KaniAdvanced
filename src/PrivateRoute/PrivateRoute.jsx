import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);

  useEffect(() => {
    console.log("heyyyyyyyy");
    if (!currentUser) {
      console.log("No user");
      // Optionally handle cleanup
    }
  }, []);

  return currentUser ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;
