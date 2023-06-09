import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en';
import vi from './locales/vi';

i18n.use(initReactI18next).init({
	compatibilityJSON: 'v3',
	lng: 'vi',
	fallbackLng: 'en',
	resources: {
		'en': en,
		'vi': vi,
	},
	interpolation: {
		escapeValue: false, // react already safes from xss
	},
});

export default i18n;
