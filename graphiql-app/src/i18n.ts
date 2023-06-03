import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enJSON from './locale/en.json';
import ruJSON from './locale/ru.json';

i18n.use(initReactI18next).init({
  fallbackLng: 'en',
  lng: localStorage.getItem('language') || 'en',
  resources: {
    en: { ...enJSON },
    ru: { ...ruJSON },
  },
  ns: ['translations'],
  defaultNS: 'translations',
});

i18n.languages = ['en', 'ru'];
