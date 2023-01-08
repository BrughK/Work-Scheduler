// Display the date
var currentDate = dayjs().format('dddd, MMM D[th]');
$("#currentDay").html(currentDate);

$(function () {
  init();
  // Save button event listener
  $('.saveBtn').on('click', saveStorage);

  function init() {
    // color time sections respectively
    colorTime();
    // load saved
    loadStorage();
  }

  // Color the times
  // .each iterate over jQuery obj and execute function for each match of element
  function colorTime() {
    let timeBlock = $('.time-block');
    $.each(timeBlock, (i) => {
      let time = $(timeBlock[i]).attr('id').split('-')[1];
      $(timeBlock[i]).addClass(checkTime(time))
    })
  }

  // Check the time
  function checkTime(time) {
    let currentTime = dayjs().hour();
    if (time < currentTime) {
      return "past"
    }
    else if (time > currentTime) {
      return "future"
    }
    else {
      return "present"
    }
  }
  // load any notes
  function loadStorage() {
    let timeBlock = $('.time-block');
    $.each(timeBlock, (i) => {
      let id = $(timeBlock[i]).attr('id');
      let storedVal = localStorage.getItem(id);
      if (storedVal !== null) {
        let timeSlot = $(timeBlock[i]);
        let textArea = $(timeSlot.children()[1]);
        textArea.val(storedVal);
      };
    })
  }
  // save to local storage
  function saveStorage(event) {
    let button = $(event.target);
    // 
    if (button.parent().attr('id') === undefined) button = button.parent();
    let id = button.parent().attr('id');
    // Take input text and set the value
    let text = $(button.siblings()[1]).val();
    localStorage.setItem(id, text);
  }
});
