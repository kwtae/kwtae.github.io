let currentLang = 'ko';
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  renderPostList();
}
function getLang() {
  return localStorage.getItem('lang') || currentLang;
}
