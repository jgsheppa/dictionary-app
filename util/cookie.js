import cookies from 'js-cookie';

export function getLanguageFromCookie() {
  const lang = cookies.getJSON('language') || [];
  return lang;
}

export function setLanguage(lang) {
  const currentLanguage = getLanguageFromCookie();

  // If language has not been set, then set it.
  // If language has been set, replace current
  // language with new language.

  const newLanguage = { language: lang };

  if (currentLanguage === []) {
    cookies.set('language', { language: lang });
  } else if (currentLanguage.length === 1) {
    currentLanguage.splice(0, newLanguage);
  }

  cookies.set('language', newLanguage);

  return newLanguage;
}
