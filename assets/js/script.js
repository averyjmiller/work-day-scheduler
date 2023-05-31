$(document).ready(function () {

  // Events are saved to local storage
  $('.saveBtn').on('click', function () {
    var timeBlock = $(this).parent();
    var event = timeBlock.find('.description').val();

    localStorage.setItem(timeBlock.attr('id'), event);

    $('.save-confirmation').text('✅ Appointment added to storage');
    setInterval(function() {
      $('.save-confirmation').text('');
    }, 10000);
  });

  // Loops through the time blocks and color-codes them based on the current hour of the day
  function hourUpdater() {
    var currentHour = dayjs().hour();

    $('.time-block').each(function () {
      if($(this).attr('id').slice(5) == currentHour) {
        $(this).addClass('present');

        if($(this).hasClass('future')) {
          $(this).removeClass('future');
        }

        if($(this).hasClass('past')) {
          $(this).removeClass('past');
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
          $(this).removeClass('past');
        }
      }
    });
  }

  // Initializes the time blocks
  hourUpdater();

  // Updates the time blocks every 15 seconds
  setInterval(hourUpdater, 15000);

  // Retrieves saved events from local storage and sets it to the text area for the corresponding time block
  $('.time-block').each(function() {
    var storageName = $(this).attr('id');

    $(this).find('.description').val(localStorage.getItem(storageName));
  });
  
  // display the current day on the page
  function dayUpdater() {
    $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
  }

  dayUpdater();

  // Updates the displayed current day on the page every 60 seconds
  setInterval(dayUpdater, 60000);
});