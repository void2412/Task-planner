var currentDay = $('#currentDay')
var timeBlockList = $('#timeBlockList')

currentDay.text(moment().format('DD[-]MMM[-]YYYY[ ] HH:mm:ss'))
var currentTime = setInterval(function(){
    currentDay.text(moment().format('DD[-]MMM[-]YYYY[ ] HH:mm:ss'))
},1000)

