import * as React from 'react';
import { styled, Switch } from '@mui/material';
import COLORS from '../../../../theme/colors';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 30 30"><text x="4" y="20" fill="white">EN</text></svg>')`,
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? COLORS.SECONDARY_HOVER : '#aab4be',
      },
    },
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#4dc6d6' : COLORS.SECONDARY_DARK,
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="25" width="25" viewBox="0 0 30 30"><text x="3" y="20" fill="white">RU</text></svg>')`,
    },
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
    borderRadius: 20 / 2,
  },
}));

interface ILanguageSwitcher {
  onChangeLanguage: React.ChangeEventHandler;
}

export default function LanguageSwitcher(props: ILanguageSwitcher) {
  const language = localStorage.getItem('language') || 'en';
  return (
    <MaterialUISwitch checked={language === 'en'} sx={{ m: 1 }} onChange={props.onChangeLanguage} />
  );
}
