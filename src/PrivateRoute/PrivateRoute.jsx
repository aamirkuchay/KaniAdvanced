import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);

  useEffect(() => {
    if (!currentUser) {
      console.log("no user");
      // Optionally, you can log out user from the store or perform any other cleanup if necessary
    }
  }, [currentUser]);

  // Redirect to signin if there's no currentUser
  return currentUser ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;
