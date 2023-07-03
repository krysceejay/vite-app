import i18n from "i18next"
import Backend from "i18next-http-backend"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

i18n
	.use(Backend)
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		initImmediate: false,
		debug: true,
		lng: "en",
		fallbackLng: 'en',
		interpolation: {
      escapeValue: false
    },
		ns: "translation",
    defaultNS: "translation",
	});

export default i18n