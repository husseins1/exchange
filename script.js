'use strict';
emailjs.init('user_rQOrUeUcEpkbEZRR2ts2d');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////
// Button scrolling
btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// 1. Add event listener to common parent element
// 2. Determine what element originated the event

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // Matching strategy
  if (
    e.target.classList.contains('nav__link') &&
    !e.target.classList.contains('nav__link--btn')
  ) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////////
// Tabbed component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if (!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  // Activate tab
  clicked.classList.add('operations__tab--active');

  // Activate content area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    
  }
};

// Passing "argument" into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation: Intersection Observer API

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Currency converter

let country_list = {
  AED: 'AE',
  AFN: 'AF',
  XCD: 'AG',
  ALL: 'AL',
  AMD: 'AM',
  ANG: 'AN',
  AOA: 'AO',
  AQD: 'AQ',
  ARS: 'AR',
  AUD: 'AU',
  AZN: 'AZ',
  BAM: 'BA',
  BBD: 'BB',
  BDT: 'BD',
  XOF: 'BE',
  BGN: 'BG',
  BHD: 'BH',
  BIF: 'BI',
  BMD: 'BM',
  BND: 'BN',
  BOB: 'BO',
  BRL: 'BR',
  BSD: 'BS',
  NOK: 'BV',
  BWP: 'BW',
  BYR: 'BY',
  BZD: 'BZ',
  CAD: 'CA',
  CDF: 'CD',
  XAF: 'CF',
  CHF: 'CH',
  CLP: 'CL',
  CNY: 'CN',
  COP: 'CO',
  CRC: 'CR',
  CUP: 'CU',
  CVE: 'CV',
  CYP: 'CY',
  CZK: 'CZ',
  DJF: 'DJ',
  DKK: 'DK',
  DOP: 'DO',
  DZD: 'DZ',
  ECS: 'EC',
  EEK: 'EE',
  EGP: 'EG',
  ETB: 'ET',
  EUR: 'FR',
  FJD: 'FJ',
  FKP: 'FK',
  GBP: 'GB',
  GEL: 'GE',
  GGP: 'GG',
  GHS: 'GH',
  GIP: 'GI',
  GMD: 'GM',
  GNF: 'GN',
  GTQ: 'GT',
  GYD: 'GY',
  HKD: 'HK',
  HNL: 'HN',
  HRK: 'HR',
  HTG: 'HT',
  HUF: 'HU',
  IDR: 'ID',
  ILS: 'IL',
  INR: 'IN',
  IQD: 'IQ',
  IRR: 'IR',
  ISK: 'IS',
  JMD: 'JM',
  JOD: 'JO',
  JPY: 'JP',
  KES: 'KE',
  KGS: 'KG',
  KHR: 'KH',
  KMF: 'KM',
  KPW: 'KP',
  KRW: 'KR',
  KWD: 'KW',
  KYD: 'KY',
  KZT: 'KZ',
  LAK: 'LA',
  LBP: 'LB',
  LKR: 'LK',
  LRD: 'LR',
  LSL: 'LS',
  LTL: 'LT',
  LVL: 'LV',
  LYD: 'LY',
  MAD: 'MA',
  MDL: 'MD',
  MGA: 'MG',
  MKD: 'MK',
  MMK: 'MM',
  MNT: 'MN',
  MOP: 'MO',
  MRO: 'MR',
  MTL: 'MT',
  MUR: 'MU',
  MVR: 'MV',
  MWK: 'MW',
  MXN: 'MX',
  MYR: 'MY',
  MZN: 'MZ',
  NAD: 'NA',
  XPF: 'NC',
  NGN: 'NG',
  NIO: 'NI',
  NPR: 'NP',
  NZD: 'NZ',
  OMR: 'OM',
  PAB: 'PA',
  PEN: 'PE',
  PGK: 'PG',
  PHP: 'PH',
  PKR: 'PK',
  PLN: 'PL',
  PYG: 'PY',
  QAR: 'QA',
  RON: 'RO',
  RSD: 'RS',
  RUB: 'RU',
  RWF: 'RW',
  SAR: 'SA',
  SBD: 'SB',
  SCR: 'SC',
  SDG: 'SD',
  SEK: 'SE',
  SGD: 'SG',
  SKK: 'SK',
  SLL: 'SL',
  SOS: 'SO',
  SRD: 'SR',
  STD: 'ST',
  SVC: 'SV',
  SYP: 'SY',
  SZL: 'SZ',
  THB: 'TH',
  TJS: 'TJ',
  TMT: 'TM',
  TND: 'TN',
  TOP: 'TO',
  TRY: 'TR',
  TTD: 'TT',
  TWD: 'TW',
  TZS: 'TZ',
  UAH: 'UA',
  UGX: 'UG',
  USD: 'US',
  UYU: 'UY',
  UZS: 'UZ',
  VEF: 'VE',
  VND: 'VN',
  VUV: 'VU',
  YER: 'YE',
  ZAR: 'ZA',
  ZMK: 'ZM',
  ZWD: 'ZW',
};
const dropList = document.querySelectorAll('form select'),
  fromCurrency = document.querySelector('.from select'),
  toCurrency = document.querySelector('.to select'),
  getButton = document.querySelector('form button');
for (let i = 0; i < dropList.length; i++) {
  for (let currency_code in country_list) {
    let selected =
      i == 0
        ? currency_code == 'USD'
          ? 'selected'
          : ''
        : currency_code == 'IQD'
        ? 'selected'
        : '';
    let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
    dropList[i].insertAdjacentHTML('beforeend', optionTag);
  }
  dropList[i].addEventListener('change', e => {
    loadFlag(e.target);
    
  });
}
function loadFlag(element) {
  for (let code in country_list) {
    if (code == element.value) {
      let imgTag = element.parentElement.querySelector('img');
      imgTag.src = `https://flagcdn.com/48x36/${country_list[
        code
      ].toLowerCase()}.png`;
    }
  }
}
window.addEventListener('load', () => {
  getExchangeRate();
});
getButton.addEventListener('click', e => {
  e.preventDefault();
  getExchangeRate();
});
const exchangeIcon = document.querySelector('form .icon');
exchangeIcon.addEventListener('click', () => {
  let tempCode = fromCurrency.value;
  fromCurrency.value = toCurrency.value;
  toCurrency.value = tempCode;
  
  loadFlag(fromCurrency);
  loadFlag(toCurrency);
  getExchangeRate();
});
function getExchangeRate() {
  const amount = document.querySelector('form input');
  const exchangeRateTxt = document.querySelector('form .exchange-rate');
  let amountVal = amount.value;
  if (amountVal == '' || amountVal == '0') {
    amount.value = '1';
    amountVal = 1;
  }
  exchangeRateTxt.innerText = 'Getting exchange rate...';
  let url = `https://v6.exchangerate-api.com/v6/d4c94a940d02ff048dd082bd/latest/${fromCurrency.value}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      let exchangeRate = result.conversion_rates[toCurrency.value];
      let totalExRate = (amountVal * exchangeRate).toFixed(2);
      exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    })
    .catch(() => {
      exchangeRateTxt.innerText = 'Something went wrong';
    });
}

const lang = document.querySelector(".lang img");
if(!document.body.classList.contains("ar")){
  lang.src = `https://flagcdn.com/48x36/iq.png`;
}else{
  lang.src = `https://flagcdn.com/48x36/us.png`;
}

// clocks

const sec = document.querySelectorAll('.sec');
const min = document.querySelectorAll('.min');
const hr = document.querySelectorAll('.hr');
setInterval(function () {
  let time = new Date();
  const dates = [
    new Date(),
    new Date(time.toLocaleString('en-US', { timeZone: 'America/New_York' })),
    new Date(time.toLocaleString('en-US', { timeZone: 'Europe/London' })),
    new Date(time.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' })),
    new Date(time.toLocaleString('en-US', { timeZone: 'Australia/Sydney' })),
  ];
  for (let index = 0; index < dates.length; index++) {
    
    let secs = dates[index].getSeconds() * 6;
    let mins = dates[index].getMinutes() * 6;
    let hrs = dates[index].getHours() * 30;
    sec[index].style.transform = `rotateZ(${secs}deg)`;
    min[index].style.transform = `rotateZ(${mins}deg)`;
    hr[index].style.transform = `rotateZ(${hrs + mins / 12}deg)`;
    
  }
  
},1000);

// email js 

const form = document.querySelector('.modal__form');
const nameInput = document.querySelector('#name');
const email = document.querySelector('#email');
const textarea = document.querySelector('#textarea');

form.addEventListener('submit', e => {
  e.preventDefault();
  const template = {
    name: nameInput.value,
    email: email.value,
    textarea: textarea.value,
  
  };
  emailjs.send('service_hjnojzh', 'template_pgo9hcl', template).then(
    function (response) {
      console.log('SUCCESS!', response.status, response.text);
      alert('SUCCESS');
    },
    function (error) {
      console.log('FAILED...', error);
    }
  );
  nameInput.value = '';
  textarea.value = '';
  email.value = '';
});