const lang = document.querySelector('.lang img');
if (!document.body.classList.contains('ar')) {
  lang.src = `https://flagcdn.com/48x36/iq.png`;
} else {
  lang.src = `https://flagcdn.com/48x36/us.png`;
}
