import cookies from 'js-cookie';

export function getSearchInfo() {
  const lang = cookies.getJSON('language') || [];
  return lang;
}

export function setSearchTerm() {
  const term = cookies.getJSON('language') || [];
  return term;
}

export function setLanguage(lang) {
  const currentLanguage = getSearchInfo();

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

export function addSearchTermCookie(word) {
  const currentTerm = setSearchTerm();

  // If language has not been set, then set it.
  // If language has been set, replace current
  // language with new language.

  const searchTerm = { term: word };

  const newCookie = (currentTerm += searchTerm);

  cookies.set('language', newCookie);

  return newCookie;
}

export function getSearchTerms() {
  const term = cookies.getJSON('search terms') || [];
  return term;
}

export function addSearchTermToRecentSearchList(term) {
  const searchTerms = getSearchTerms();

  let foundInCart = false;

  const newSearchTermList = searchTerms.map((obj) => {
    if (obj.searchTerm === term) {
      foundInCart = true;
    }
    return obj;
  });

  if (!foundInCart) {
    newSearchTermList.push({ term });
  }
  cookies.set('search term', newSearchTermList);

  return newSearchTermList;
}
