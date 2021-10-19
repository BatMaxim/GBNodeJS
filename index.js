require('colors')


if(isNaN(process.argv[2]) || isNaN(+process.argv[3])){
    console.log('incorrect start parameters'.red);
    return;
}


console.log('hello'.green);

