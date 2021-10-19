require('colors')

const leftRest = process.argv[2];
const rightRest = process.argv[3];

if(isNaN(leftRest) || isNaN(rightRest)){
    console.log('incorrect start parameters'.red);
    return;
}

const isPrimeNum = (num) => {
    if (num < 1)
        return false;
    for(let i = 2; i < num; i++)
        if(num % i === 0) return false;
    return true;
}

for (let i = leftRest; i <= rightRest; i++){
    isPrimeNum(i) && console.log(i);
}

