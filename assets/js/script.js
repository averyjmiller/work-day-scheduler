// TODO: Add a listener for click events on the save button. This code should
// use the id in the containing time-block as a key to save the user input in
// local storage. HINT: What does `this` reference in the click listener
// function? How can DOM traversal be used to get the "hour-x" id of the
// time-block containing the button that was clicked? How might the id be
// useful when saving the description in local storage?
//
// TODO: Add code to get any user input that was saved in localStorage and set
// the values of the corresponding textarea elements. HINT: How can the id
// attribute of each time-block be used to do this?

$(document).ready(function () {

  $('.saveBtn').on('click', function () {
    // get nearby values
  });

  function hourUpdater() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      if($(this).attr('id').slice(5) == currentHour) {
        $(this).addClass('present');

        if($(this).hasClass('future')) {
          $(this).removeClass('future');
        }

        if($(this).hasClass('past')) {
          $(this).addClass('past');
        }
      } else if($(this).attr('id').slice(5) < currentHour) {
        $(this).addClass('past');

        if($(this).hasClass('present')) {
          $(this).removeClass('present');
        }

        if($(this).hasClass('future')) {
          $(this).removeClass('future');
        }
      } else {
        $(this).addClass('future');

        if($(this).hasClass('present')) {
          $(this).removeClass('present');
        }

        if($(this).hasClass('past')) {
          $(this).addClass('past');
        }
      }
    });
  }

  hourUpdater();

  setInterval(hourUpdater, 15000);
  // load any saved data from localStorage
  $('#hour-9 .description').val(localStorage.getItem('hour-9'));
  // display current day on page
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});