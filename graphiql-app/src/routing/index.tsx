import React from 'react';
import { useAuth } from '../contexts';
import AuthRouting from './AuthRouting';
import NonAuthRouting from './NonAuthRouting';

function Routing() {
  const authCtx = useAuth();

  return <>{authCtx.isLoggedIn ? <AuthRouting /> : <NonAuthRouting />}</>;
}

export default Routing;
