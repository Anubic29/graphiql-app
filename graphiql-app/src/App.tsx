import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useThemeSwitcher } from './contexts';
import Routing from './routing';
import Colors from './theme/colors';
import { createTheme, ThemeProvider } from '@mui/material';

function App() {
  const { isDark } = useThemeSwitcher();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDark ? 'dark' : 'light',
          secondary: {
            main: Colors.SECONDARY_MAIN,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                color: `${isDark ? Colors.SECONDARY_MAIN : Colors.SECONDARY_DARK}`,
              },
            },
          },
          MuiIconButton: {
            styleOverrides: {
              root: {
                color: `${isDark ? Colors.SECONDARY_MAIN : Colors.SECONDARY_DARK}`,
              },
            },
          },
        },
      }),
    [isDark]
  );

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Routing />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
