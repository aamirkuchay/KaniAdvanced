import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);
  
  useEffect(() => {
    if (!currentUser) {
      window.location.reload();
    }
  }, [currentUser]);

  return currentUser ? <Outlet /> : <Navigate to="/auth/signin" />;
};

export default PrivateRoute;
