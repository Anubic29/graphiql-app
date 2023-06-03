import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  Toolbar,
  Typography,
  Box,
  AppBar,
} from '@mui/material';

import { Menu } from '@mui/icons-material';
import classes from './Header.module.scss';
import COLORS from '../../theme/colors';

import { useThemeSwitcher } from '../../contexts';
import { useTranslation } from 'react-i18next';
import { ThemeSwitcher, LanguageSwitcher } from './components';
interface Props {
  children:
    | string
    | number
    | boolean
    | React.ReactElement<unknown, string | React.JSXElementConstructor<unknown>>
    | React.ReactFragment
    | React.ReactPortal
    | null
    | undefined;
  wind?: () => Window;
}

export default function Header(props: Props) {
  const { wind } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { isDark } = useThemeSwitcher();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };
  const [isSticky, setIsSticky] = useState(false);
  const {
    i18n: { changeLanguage },
  } = useTranslation();

  useEffect(() => {
    function handleScroll() {
      const currentScroll = window && window.pageYOffset;
      if (currentScroll > 60) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    }

    window && window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="30"
          width="30"
          viewBox="0 0 29.999 30"
          pointsAtZ={1000}
          fill={COLORS.SECONDARY_MAIN}
        >
          <path d="M4.08 22.864l-1.1-.636L15.248.98l1.1.636z" />
          <path d="M2.727 20.53h24.538v1.272H2.727z" />
          <path d="M15.486 28.332L3.213 21.246l.636-1.1 12.273 7.086zm10.662-18.47L13.874 2.777l.636-1.1 12.273 7.086z" />
          <path d="M3.852 9.858l-.636-1.1L15.5 1.67l.636 1.1z" />
          <path d="M25.922 22.864l-12.27-21.25 1.1-.636 12.27 21.25zM3.7 7.914h1.272v14.172H3.7zm21.328 0H26.3v14.172h-1.272z" />
          <path d="M15.27 27.793l-.555-.962 10.675-6.163.555.962z" />
          <path d="M27.985 22.5a2.68 2.68 0 0 1-3.654.981 2.68 2.68 0 0 1-.981-3.654 2.68 2.68 0 0 1 3.654-.981c1.287.743 1.724 2.375.98 3.654M6.642 10.174a2.68 2.68 0 0 1-3.654.981A2.68 2.68 0 0 1 2.007 7.5a2.68 2.68 0 0 1 3.654-.981 2.68 2.68 0 0 1 .981 3.654M2.015 22.5a2.68 2.68 0 0 1 .981-3.654 2.68 2.68 0 0 1 3.654.981 2.68 2.68 0 0 1-.981 3.654c-1.287.735-2.92.3-3.654-.98m21.343-12.326a2.68 2.68 0 0 1 .981-3.654 2.68 2.68 0 0 1 3.654.981 2.68 2.68 0 0 1-.981 3.654 2.68 2.68 0 0 1-3.654-.981M15 30a2.674 2.674 0 1 1 2.674-2.673A2.68 2.68 0 0 1 15 30m0-24.652a2.67 2.67 0 0 1-2.674-2.674 2.67 2.67 0 1 1 5.347 0A2.67 2.67 0 0 1 15 5.347" />
        </svg>

        <Typography variant="h6" sx={{ my: 2 }}>
          GraphiQL
        </Typography>
      </Box>
      <Divider />
      <List>
        <nav>{props.children}</nav>
      </List>
    </Box>
  );

  const container = wind !== undefined ? () => wind().document.body : undefined;
  const changeLanguageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLanguage = e.target.checked ? 'en' : 'ru';
    changeLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  return (
    <header className={`${classes.header} ${isSticky ? classes['header__sticky'] : ''}`}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          component="nav"
          style={{
            background: 'inherit',
            color: `${isDark ? COLORS.SECONDARY_MAIN : COLORS.SECONDARY_DARK}`,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}
            >
              <Menu />
            </IconButton>
            <Box sx={{ marginRight: 'auto' }}>
              <Link to="/" style={{ display: 'flex' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="30"
                  width="30"
                  viewBox="0 0 29.999 30"
                  pointsAtZ={1000}
                  fill={COLORS.SECONDARY_MAIN}
                  className={classes.logoIcon}
                >
                  <path d="M4.08 22.864l-1.1-.636L15.248.98l1.1.636z" />
                  <path d="M2.727 20.53h24.538v1.272H2.727z" />
                  <path d="M15.486 28.332L3.213 21.246l.636-1.1 12.273 7.086zm10.662-18.47L13.874 2.777l.636-1.1 12.273 7.086z" />
                  <path d="M3.852 9.858l-.636-1.1L15.5 1.67l.636 1.1z" />
                  <path d="M25.922 22.864l-12.27-21.25 1.1-.636 12.27 21.25zM3.7 7.914h1.272v14.172H3.7zm21.328 0H26.3v14.172h-1.272z" />
                  <path d="M15.27 27.793l-.555-.962 10.675-6.163.555.962z" />
                  <path d="M27.985 22.5a2.68 2.68 0 0 1-3.654.981 2.68 2.68 0 0 1-.981-3.654 2.68 2.68 0 0 1 3.654-.981c1.287.743 1.724 2.375.98 3.654M6.642 10.174a2.68 2.68 0 0 1-3.654.981A2.68 2.68 0 0 1 2.007 7.5a2.68 2.68 0 0 1 3.654-.981 2.68 2.68 0 0 1 .981 3.654M2.015 22.5a2.68 2.68 0 0 1 .981-3.654 2.68 2.68 0 0 1 3.654.981 2.68 2.68 0 0 1-.981 3.654c-1.287.735-2.92.3-3.654-.98m21.343-12.326a2.68 2.68 0 0 1 .981-3.654 2.68 2.68 0 0 1 3.654.981 2.68 2.68 0 0 1-.981 3.654 2.68 2.68 0 0 1-3.654-.981M15 30a2.674 2.674 0 1 1 2.674-2.673A2.68 2.68 0 0 1 15 30m0-24.652a2.67 2.67 0 0 1-2.674-2.674 2.67 2.67 0 1 1 5.347 0A2.67 2.67 0 0 1 15 5.347" />
                </svg>
                <Typography
                  variant="h6"
                  component="span"
                  color={isDark ? COLORS.PRIMARY_CONTR_TEXT : COLORS.SECONDARY_DARK}
                  sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', marginLeft: '5px' } }}
                >
                  GraphiQL
                </Typography>
              </Link>
            </Box>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <nav>{props.children}</nav>
            </Box>
            <LanguageSwitcher onChangeLanguage={changeLanguageHandler} />
            <ThemeSwitcher></ThemeSwitcher>
          </Toolbar>
        </AppBar>
        <Box component="nav">
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
            }}
          >
            {drawer}
          </Drawer>
        </Box>
      </Box>
    </header>
  );
}
