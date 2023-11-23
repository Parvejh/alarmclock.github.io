const timeDisplay = document.querySelector("#time-d");
const hourSelect = document.getElementById("hourSelector");
const minuteSelect = document.getElementById("minuteSelector");
const ampmSelect = document.getElementById("ampmSelector");
const setAlarmButton = document.getElementById("setAlarm");
const message = document.getElementById("alarm");
const content = document.getElementById("set-alarm-container");

let alarmTime;
let currTime;
let isAlarmSet = false ;

let alarmTone = new Audio("./files/808alarm.mp3");

function currentTime() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let ampm = "AM";

        if(hours >= 12){
            if(hours>12){
                hours = hours - 12;
            }
            ampm = "PM"
        }else if(hours == 0){
            ampm = "AM"
        }

        hours = (hours < 10)?
            "0" + hours :
            hours
        minutes = (minutes < 10)?
            "0" + minutes :
            minutes
        seconds = (seconds < 10)?
            "0" + seconds :
            seconds

        currTime = `${hours}:${minutes} ${ampm}`
        dispTime = `${hours} : ${minutes} : ${seconds} ${ampm}`
        timeDisplay.textContent = dispTime 

        //If Current time matches the Alarm Time
        if(alarmTime == currTime){
            alarmTone.play();
            alarmTone.loop = true;
        }else{
            alarmTone.pause();

        }
}
function displayTime(){
    setInterval(currentTime , 1000)
}

function generateOption(){
    //Generate all the options for hour selector
    for(let i = 0 ; i <= 12 ; i++){
        if(i<10){
            let temp = '0'+i
            hourSelect.options[i] = new Option(temp, i)
        }else{
            hourSelect.options[i] = new Option(i, i)
        }
    }

    //Generate all the options for Minute selector
    for(let i = 0 ; i < 60 ; i++){
        if(i<10){
            let temp = '0'+i
            minuteSelect.options[i] = new Option(temp, i)
        }else{
            minuteSelect.options[i] = new Option(i, i)
        }
    }
}

function setAlarm(){

    if(isAlarmSet){
        alarmTime =""
        alarmTone.pause()

        setAlarmButton.innerHTML = "Set Alarm";
        setAlarmButton.classList.remove("cancel-button")
        setAlarmButton.classList.add("set-button")
        content.classList.remove('disable')

        message.style.visibility = "hidden"
        return isAlarmSet = false
    }

    isAlarmSet = true;
    //if the selected parameters are correct
    if(hourSelect.selectedIndex >=0 && minuteSelect.selectedIndex >=0 && ampmSelect.selectedIndex !=0 ){
        let time
        if(hourSelect.value<10){
            if(minuteSelect.value<10){
                time = `0${hourSelect.value}:0${minuteSelect.value} ${ampmSelect.value}`
            }
            else{
                time = `0${hourSelect.value}:${minuteSelect.value} ${ampmSelect.value}`
            }
        }else{
            if(minuteSelect.value<10){
                time = `${hourSelect.value}:0${minuteSelect.value} ${ampmSelect.value}`
            }
            else{
                time = `${hourSelect.value}:${minuteSelect.value} ${ampmSelect.value}`
            }
        }
        
        // console.log(time)

        content.classList.add('disable') //disable the section to add the alarm

        //Set Alarm button is updated to cancel Alarm button
        setAlarmButton.innerHTML = "Cancel Alarm";
        setAlarmButton.classList.remove("set-button")
        setAlarmButton.classList.add("cancel-button")
        alarmTime = time;
        message.innerHTML = `The Alarm is Set for ${alarmTime}`
        message.style.visibility = "visible"
    }else{
        message.innerHTML = "Invalid Parameters."
        message.style.visibility = "visible"
    }
}



setAlarmButton.addEventListener('click', setAlarm);


generateOption();
displayTime();