var currentDay = $('#currentDay')
var timeBlockList = $('#timeBlockList')
var saveFeedback = $('#saveFeedback')
var currentTodo = JSON.parse(localStorage.getItem('todo'))||["","","","","","","","",""]

handleCurrentTime()
var currentTime = setInterval(handleCurrentTime ,1000)

function handleCurrentTime(){
    var now = new Date()
    option = {day:'numeric',month: 'short',year:'numeric',hour: 'numeric',minute: 'numeric',second:'numeric', hour12:false}
    var timeText = new Intl.DateTimeFormat('en-AU', option).format(now)
    currentDay.text(timeText)
}

function init(){
    for (var i = 0; i < 9; i++){
        if ((i+9)< 12){
            timeText = (i+9) + 'AM'
        }
        else if ((i+9) === 12){
            timeText = (i+9) + 'PM'
        }
        else{
            timeText= ((i+9)-12) + 'PM'
        }
        var inputGroup = $('<div>').addClass('input-group input-group-lg').attr('value',i)
        var label = $('<span>').addClass('input-group-text').text(timeText).attr('style','width:90px;')
        var textArea = $('<textarea>').addClass('form-control userInput text-light').text(currentTodo[i])
        var saveButton = $('<button>').addClass('btn btn-primary saveBtn').text('💾')
        inputGroup.append(label, textArea, saveButton)
        timeBlockList.append(inputGroup)
    }
}

init()

handleColor()
var colorChecker = setInterval(handleColor,1000)

function handleColor(){
    var now = new Date()
    var currentHour = parseInt(now.getHours())
    var index = currentHour - 9
    for (var i = 0; i < 9; i++){
        var inputGroup = $(".input-group[value=" + i +"]")
        if (i < index){
            inputGroup.children('.userInput').addClass('bg-secondary').removeClass('bg-danger bg-success')
        }
        else if (i === index){
            inputGroup.children('.userInput').addClass('bg-danger').removeClass('bg-success bg-secondary')
        }
        else if (i > index){
            inputGroup.children('.userInput').addClass('bg-success').removeClass('bg-danger bg-secondary')
        }
        if(index <0 || index > 8){
            inputGroup.children('.userInput').addClass('bg-secondary').removeClass('bg-success bg-danger')
        }
    }
}

function handleSave(event){
    var target = $(event.target)
    var value = target.parent().children(".userInput").val()
    currentTodo[parseInt(target.parent().attr("value"))] = value
    localStorage.setItem('todo', JSON.stringify(currentTodo))
    saveFeedback.text("Successfully saved to local Storage")
    var timer = 1
    var feedbackTimer = setInterval(function(){
        timer--
        if (timer == 0){
            clearInterval(feedbackTimer)
            saveFeedback.text("")
        }
        else{
            saveFeedback.text("Successfully saved to local Storage")
        }
    },1000)
}

timeBlockList.on('click','.saveBtn', handleSave)