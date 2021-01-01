import cookies from 'js-cookie';

export function getSearchInfo() {
  const lang = cookies.getJSON('language') || [];
  return lang;
}

export function getFullLanguagePair() {
  const languagePair = cookies.getJSON('fullLanguage') || [];
  return languagePair;
}

export function getImageUrl() {
  const imageUrl = cookies.getJSON('userImage') || [];
  return imageUrl;
}

export function searchTerm() {
  const term = cookies.getJSON('searchTerm') || [];
  return term;
}

export function setLanguage(lang) {
  const currentLanguage = getSearchInfo();

  const newLanguage = { language: lang };

  if (currentLanguage === []) {
    cookies.set('language', { language: lang });
  } else if (currentLanguage.length === 1) {
    currentLanguage.splice(0, newLanguage);
  }

  cookies.set('language', newLanguage);

  return newLanguage;
}

export function showDictionaryWithCookieInfo(cookieDictionary) {
  const shortHandLanguage1 = cookieDictionary.slice(0, 2);
  const shortHandLanguage2 = cookieDictionary.slice(3);
  let firstLanguage = '';
  let secondLanguage = '';

  if (shortHandLanguage1 === 'de') {
    firstLanguage = 'German';
  } else if (shortHandLanguage1 === 'en') {
    firstLanguage = 'English';
  } else if (shortHandLanguage1 === 'fr') {
    firstLanguage = 'French';
  } else if (shortHandLanguage1 === 'it') {
    firstLanguage = 'Italian';
  } else if (shortHandLanguage1 === 'ru') {
    firstLanguage = 'Russian';
  }

  if (shortHandLanguage2 === 'de') {
    secondLanguage = 'German';
  } else if (shortHandLanguage2 === 'en') {
    secondLanguage = 'English';
  } else if (shortHandLanguage2 === 'fr') {
    secondLanguage = 'French';
  } else if (shortHandLanguage2 === 'it') {
    secondLanguage = 'Italian';
  } else if (shortHandLanguage2 === 'ru') {
    secondLanguage = 'Russian';
  }

  const fullDictionaryName = `${firstLanguage} - ${secondLanguage}`;
  cookies.set('fullLanguage', fullDictionaryName);

  return fullDictionaryName;
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

export function searchTermCookie(searchTerm) {
  cookies.set('searchTerm', searchTerm);

  return searchTerm;
}
