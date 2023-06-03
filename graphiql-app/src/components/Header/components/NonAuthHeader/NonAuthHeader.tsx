import Header from '../../Header';
import { NavLink } from 'react-router-dom';
import { Home } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { Box, MenuItem } from '@mui/material';
import { useAuth } from '../../../../contexts/Auth.context';

const NonAuthHeader = () => {
  const { signUp } = useAuth();
  const { t } = useTranslation();

  return (
    <Header>
      <Box
        component={'ul'}
        sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <MenuItem>
          <NavLink to="/">
            <Home sx={{ verticalAlign: 'middle' }} />
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/sign-in" onClick={() => signUp(false)}>
            {t('login')}
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/sign-in#" onClick={() => signUp(true)}>
            {t('signup')}
          </NavLink>
        </MenuItem>
      </Box>
    </Header>
  );
};

export default NonAuthHeader;
