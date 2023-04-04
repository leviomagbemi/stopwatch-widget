//UI variables
const clock = document.querySelector('.clock');
const start = document.querySelector('#start');
const reset = document.querySelector('#reset');
const edit = document.querySelector('#edit');
const milliSeconds = document.querySelector('#milliseconds');
const spinner = document.querySelector('.spinner');
const table = document.querySelector('.table');
const count = document.querySelector('.count');
const displayTime = document.querySelector('.time');
const seconds = document.querySelector('#seconds');
const minutes = document.querySelector('#minutes');
const hours = document.querySelector('#hours');

//count number
let countNumber = 1;

//spinner rotation value
let spinnerRotationVal = 1;

//setInterval variable
let timer;

//initial state
init();

//event listeners
function loadEventListeners(){
start.addEventListener('click', startTimer);
reset.addEventListener('click', resetTimer);
edit.addEventListener('click', editState);
}

//set inteval function
function myTimer(){
updateTimer();
}

//start timer
function startTimer(){
//display edit and reset button  
reset.style.display = 'inline';
edit.style.display = 'inline';

//start timer
if(start.className === 'fas fa-play fa-lg')  
{timer = setInterval(myTimer, 11.1);
 start.classList.replace('fa-play', 'fa-pause'); 
}else{
  //stop timer
  stopTimer(timer);
  start.classList.replace('fa-pause', 'fa-play');
}
}

// update timer
function updateTimer(){
  milliSeconds.textContent++

  if(parseInt(milliSeconds.textContent) === 90){
    milliSeconds.textContent = 0;
    seconds.textContent++;
  }else if(parseInt(seconds.textContent) === 60){
    seconds.textContent = 0;
    minutes.textContent++;
    minutes.style.display = 'inline';
  }else if(parseInt(minutes.textContent) === 60){
    minutes.textContent = 0;
    hours.textContent++;
    hours.style.display = 'inline';
  }

  //rotate spinner
  spinner.style.transform = `rotate(${spinnerRotationVal++}deg)`;
}

//reset timer
function resetTimer(){
 //stop timer 
 stopTimer(timer);

 //reset milliseconds,seconds,minutes,hours back to zero
 milliSeconds.textContent = '00';
 seconds.textContent = 0;
 minutes.textContent = 0;
 hours.textContent = 0;
 displayTime.innerHTML = '';
 count.innerHTML = '';

 //reset to initial state
 init();

 //reset start button
 start.classList.replace('fa-pause', 'fa-play');
}

//edit timer
function editState(){  
  //display spinner
  spinner.style.display = 'block';

  //display table
  table.style.display = 'flex';

  //set table values
  count.innerHTML += `<li>#${num++}</li>`;
  displayTime.innerHTML +=`<li>${hours.textContent}:${minutes.textContent}:${seconds.textContent}:${milliSeconds.textContent}</li>`;
}

//initial state
function init(){
  reset.style.display = 'none';
  edit.style.display = 'none';
  table.style.display = 'none';
  spinner.style.display = 'none';
  minutes.style.display = 'none';
  hours.style.display = 'none';
  num = 1;  
}

//stop timer
function stopTimer(stop){
clearInterval(stop);
}

//load event listeners
loadEventListeners();