var currentDay = $('#currentDay')
var timeBlockList = $('#timeBlockList')
var currentTodo = JSON.parse(localStorage.getItem('todo'))||["","","","","","","","",""]

currentDay.text(moment().format('DD[-]MMM[-]YYYY[ ] HH:mm:ss'))
var currentTime = setInterval(function(){
    currentDay.text(moment().format('DD[-]MMM[-]YYYY[ ] HH:mm:ss'))
},1000)

function init(){
    for (var i = 0; i < 9; i++){
        if ((i+9)< 12){
            timeText = (i+9) + 'AM'
        }
        else if ((i+9) === 12){
            timeText = (i+9) + 'PM'
        }
        else{
            timeText= ((i+9)-12) + ' PM'
        }
        var inputGroup = $('<div>').addClass('input-group input-group-lg')
        var label = $('<span>').addClass('input-group-text').text(timeText).attr('style','width:90px;')
        var textArea = $('<textarea>').addClass('form-control userInput').text(currentTodo[i])
        var saveButton = $('<button>').addClass('btn btn-primary saveBtn').text('💾').attr('value',i)
        inputGroup.append(label, textArea, saveButton)
        timeBlockList.append(inputGroup)
    }
}

init()

function handleSave(event){
    var target = $(event.target)
    var value = target.parent().children(".userInput").val()
    currentTodo[parseInt(target.attr("value"))] = value
    localStorage.setItem('todo', JSON.stringify(currentTodo))
}

timeBlockList.on('click','.saveBtn', handleSave)