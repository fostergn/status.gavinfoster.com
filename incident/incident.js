$(function(){
  $('.datepicker').pickadate()
  $('.timepicker').pickatime({editable: true})

  // handle submit
  $('form').submit(function(e){
    e.preventDefault();

    var title = $('#form__input--title').val();
    var rawDate = $('#form__input--date').val();
    var rawTime = $('#form__input--time').val();
    var delay = getMilliSecondsFromNow(rawDate, rawTime);
    var dispatchTime = getDispatchTimestamp(rawDate, rawTime);
    var message = $('#form__input--message').val();
    var code = $('#form__input--code').attr('data-value');

    $.post('http://status.gavinfoster.com/socket', {
      title: title,
      message: message,
      code: code,
      delay: delay,
      dispatchTime: dispatchTime
    }, function(res){
      resetInputs();
      submitSuccessButton();
    })
  });

  // ul select dropdown
  $(".code__list").on("click", ".init", function() {
    $(this).closest(".code__list").children('li:not(.init)').toggle();
  });

  var allOptions = $(".code__list").children('li:not(.init)');
  $(".code__list").on("click", "li:not(.init)", function() {
    allOptions.removeClass('selected');
    $(this).addClass('selected');
    $(".code__list").children('.init').html($(this).html());
    $(".code__list .init").removeClass().addClass('init').addClass($(this).html());
    $(".code__list .init").attr('data-value', $(this).data('value'));
    allOptions.toggle();
  });

  function getMilliSecondsFromNow(date, time){
    return (moment(date + ' ' + time, 'D MMMM, YYYY h:mm A').valueOf() - moment()) > 0 ? moment(date + ' ' + time, 'D MMMM, YYYY h:mm A').valueOf() - moment() : 0;
  }

  function getDispatchTimestamp(date, time){
    return moment(date + ' ' + time, 'D MMMM, YYYY h:mm A').valueOf();
  }

  function submitSuccessButton(){
    var $submit = $('.form__submit');
    $submit.addClass('form__submit--success');
    $submit.val('Incident Submitted');
    setTimeout(function(){
      $submit.removeClass('form__submit--success');
      $submit.val('Submit Incident');
    }, 2000);
  }

  function resetInputs(){
    $('#form__input--title').val('');
    $('#form__input--date').val('');
    $('#form__input--time').val('');
    $('#form__input--message').val('');
    $('#form__input--code').attr('data-value', '');
    $('#form__input--code').removeClass().addClass('init').addClass('unselected').html('Status Code');
  }
})