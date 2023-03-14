import React, { useEffect } from 'react';
import { auth } from '../index'
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthState } from "react-firebase-hooks/auth";

export function ProtectedRoute(props) {
  const [user, loading, error] = useAuthState(auth);

  if (!loading)
  {
    return user ? <Outlet /> : <Navigate to="/login" state={props.state}/>;
  } else {
    return <div></div>;
  }
}
