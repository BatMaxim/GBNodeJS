const EventEmitter = require('events');

const emitter = new EventEmitter();
const timers = process.argv.slice(2); // timer format hh-mm-DD-MM-YYYY

class Timer{
    constructor(date) {
        this.date = date;
        this.index;
    }
    setIndex(index){
        this.index = index;
    }
    getDifDate(){
        return this.date - Date.now();
    }
    isTimerOver(){
        if(this.date <= Date.now()){
            emitter.emit('stop', this);
            return true;
        }
           return false;
    }
}

const printDifTime = (time, timer) => {
    var seconds = parseInt((time/1000)%60);
    var minutes = parseInt((time/(1000*60))%60);
    var hours = parseInt((time/(1000*60*60))%24);
    var days = parseInt(time/(1000*60*60*24));
    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;
    console.log(`Timer ${timer} will stop after : ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`);
}

class Handlers {
    static sartTimer(payload) {
        const timerIndex = setInterval(()=>{
            if(!payload.isTimerOver())
                printDifTime(payload.getDifDate(), payload.date);
        }, 1000);
        payload.setIndex(timerIndex);
    }
    static stopTimer(payload) {
        console.log(`Timer ${payload.date} STOPPED`);
        clearInterval(payload.index);
    }
}


const parceTimer = (timer) => {
    [hours, mins, day, month, year] = timer.split("-");
    const date = new Date(year,month-1,day,hours,mins);
    return new Timer(date);
}

const startTimers = () => {
  timers.forEach(timer => {
      emitter.emit('start', parceTimer(timer));
  })
}

emitter.on('start', Handlers.sartTimer);
emitter.on('stop', Handlers.stopTimer);

startTimers();