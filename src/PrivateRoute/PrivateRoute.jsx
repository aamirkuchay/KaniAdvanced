import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct import for jwt-decode v4
import { signoutSuccess } from '../redux/Slice/UserSlice';
 // Assuming you have a logout action

const PrivateRoute = () => {
  const { currentUser } = useSelector((state) => state.persisted.user);
  const dispatch = useDispatch();

  // Function to check if the token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token); // Decode the JWT token
      const currentTime = Date.now() / 1000; // Current time in seconds
      return decoded.exp < currentTime; // If expired, return true
    } catch (error) {
      console.error('Error decoding token', error);
      return true; // If there's an error decoding the token, assume it's expired
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.token) {
      // Check if the token is expired immediately on mount
      if (isTokenExpired(currentUser.token)) {
        console.log('Token expired');
        dispatch(signoutSuccess()); // Log out user if the token is expired
      }
    }
    
    // Optional: Set an interval to check the token expiration periodically (e.g., every 5 seconds)
    const interval = setInterval(() => {
      if (currentUser && currentUser.token && isTokenExpired(currentUser.token)) {
        console.log('Token expired (interval check)');
        dispatch(signoutSuccess()); // Log out user if the token is expired
      }
    }, 5000); // Check every 5 seconds (adjust as necessary)

    // Cleanup the interval on component unmount
    return () => clearInterval(interval);
  }, [currentUser, dispatch]); // Re-run this effect when currentUser changes

  // Redirect to sign-in page if there's no currentUser or if the token is expired
  if (!currentUser || (currentUser.token && isTokenExpired(currentUser.token))) {
    return <Navigate to="/auth/signin" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
