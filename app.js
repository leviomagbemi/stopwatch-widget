// lottie animation object and set its properties
let spinnerContainer = getElement('spinner-container');
let spinnerAnimation = bodymovin.loadAnimation({
  container: spinnerContainer,
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'spinner.json',
});

//ui variables
const resetBtn = getElement('reset-btn');
const startPauseBtn = getElement('startPause-btn');
const timeStampBtn = getElement('timeStamp-btn');
const hours = getElement('hours');
const mins = getElement('mins');
const secs = getElement('secs');
const ms = getElement('ms');

//timer init values
let h = 0;
let m = 0;
let s = 0;
let mss = 0;

// timer rates
let hourRate;
let minsRate;
let secsRate;
let msRate;
let tableTimeRate;

//table counter
let countNo = 1;

//add zero to seconds and milliseconds when the dom loads
document.addEventListener('DOMContentLoaded', () => {
  secs.textContent = s < 10 ? `0${s}` : s;
  ms.textContent = mss < 10 ? `0${mss}` : mss;
});

//load all event listeners
function loadAllEventListeners() {
  //start timer event
  startPauseBtn.addEventListener('click', startTimer);

  //reset timer event
  resetBtn.addEventListener('click', resetTimer);

  //time stamp event
  timeStampBtn.addEventListener('click', getTimeStamp);
}

//start timer
function startTimer() {
  //check if start button class has fa-play and update timer
  startPauseBtn.firstElementChild.classList.contains('fa-play')
    ? //update timer
      (updateMs(),
      updateSecs(),
      updateMins(),
      updateHours(),
      //change play icon to pause icon
      startPauseBtn.firstElementChild.classList.replace('fa-play', 'fa-pause'),
      //display spinner
      getElement('spinner-container').classList.remove('d-none'))
    : //clear interval to pause timer
      (clearInt(hourRate, minsRate, secsRate, msRate),
      //change pause icon to play icon
      startPauseBtn.firstElementChild.classList.replace('fa-pause', 'fa-play'),
      //hide spinner
      getElement('spinner-container').classList.add('d-none'));
}

//reset timer
function resetTimer() {
  //clear interval
  clearInt(hourRate, minsRate, secsRate, msRate);

  //reset timer values back to zero
  h = 0;
  m = 0;
  s = 0;
  mss = 0;

  //set textcontent back to zero
  setTextContent(hours, mins, secs, ms);

  //display table
  getElement('table').classList.add('d-none');

  //change play icon to pause
  startPauseBtn.firstElementChild.classList.replace('fa-pause', 'fa-play');

  // set tbody innerHtml to nothing
  getElement('table-body').innerHTML = '';

  //reset table count
  countNo = 1;

  //display spinner
  getElement('spinner-container').classList.add('d-none');
}

//get time stamp
function getTimeStamp() {
  //stop previous time stamp from counting
  clearInterval(tableTimeRate);

  //call create tbody content func
  tableContent();
}

//update milliseconds
const updateMs = () => {
  //increase milliseconds value
  msRate = setInterval(() => {
    mss++;

    //set milliseconds back to zero if minutes equals to 60
    mss === 90 ? (mss = 0) : mss;

    //set milliseconds textcontent to increasing value
    ms.textContent = mss < 10 ? `0${mss}` : mss;
  });
};

//update seconds
const updateSecs = () => {
  //increase seconds value every 1s
  secsRate = setInterval(() => {
    s++;

    //set seconds back to zero if minutes equals to 60
    s === 60 ? (s = 0) : s;

    //set seconds textcontent to increasing value
    secs.textContent = s < 10 ? `0${s}` : s;
  }, 1000);
};

//update minutes
const updateMins = () => {
  //increase minutes value every 1s
  minsRate = setInterval(() => {
    mins.classList.remove('d-none');
    m++;
    //set minutes back to zero if minutes equals to 60
    m === 60 ? (m = 0) : m;
    //set minutes textcontent to increasing value
    mins.textContent = `${m}:`;
  }, 60000);
};

//update hours
const updateHours = () => {
  //increase hours value every 1hr
  hourRate = setInterval(() => {
    hours.classList.remove('d-none');
    h++;
    //set hours textcontent to increasing value
    hours.textContent = `${h}:`;
  }, 3600000);
};

//createTable content
function tableContent() {
  //create row element
  const row = document.createElement('tr');

  //create count and timestamp
  const count = document.createElement('td');
  const timeStamp = document.createElement('td');

  //set count to count number and increase count number on each click
  count.textContent = countNo++;

  //update time count
  tableTimeRate = setInterval(() => {
    timeStamp.textContent = `${h}:${m}:${s}:${mss}`;
  });

  // put count and timestamp inside row
  row.appendChild(count);
  row.appendChild(timeStamp);

  //insert row to table
  getElement('table-body').insertAdjacentElement('afterbegin', row);

  //display table
  getElement('table').classList.remove('d-none');
}

//reset hour, mins, secs and ms text content
function setTextContent(hour, mins, secs, ms) {
  hour.textContent = '';
  mins.textContent = '';
  secs.textContent = `0${s}`;
  ms.textContent = `0${mss}`;
}

//clear interval
function clearInt(id1, id2, id3, id4) {
  clearInterval(id1);
  clearInterval(id2);
  clearInterval(id3);
  clearInterval(id4);
}

//get elements
function getElement(id) {
  return document.getElementById(id);
}

//call load eventlistener
loadAllEventListeners();
