$(document).ready(function () {

  $('.saveBtn').on('click', function () {
    var timeBlock = $(this).parent();
    var event = timeBlock.find('.description').val();

    localStorage.setItem(timeBlock.attr('id'), event);
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
  $('.time-block').each(function() {
    var storageName = $(this).attr('id');

    $(this).find('.description').val(localStorage.getItem(storageName));
  });
  
  // display current day on page
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));
});