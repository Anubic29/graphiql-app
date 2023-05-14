import React from 'react';
import { NavLink } from 'react-router-dom';

import { useAuth } from '../../../../contexts';
import Header from '../../Header';
import * as Icons from '@mui/icons-material';
import { MenuItem, Box, Typography } from '@mui/material';

const AuthHeader = () => {
  const authCtx = useAuth();

  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <Header>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <MenuItem>
          <NavLink to="/">
            <Typography sx={{ verticalAlign: 'middle' }} component={'span'}>
              Home
            </Typography>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/graphiql">
            <Typography sx={{ verticalAlign: 'middle' }} component={'span'}>
              Main
            </Typography>
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/sign-in" onClick={logoutHandler}>
            <Icons.Logout sx={{ verticalAlign: 'middle' }} />
          </NavLink>
        </MenuItem>
      </Box>
    </Header>
  );
};

export default AuthHeader;
