$(document).ready(function(){

  $('.search').click(function(e){
    e.preventDefault();
    e.stopPropagation();

    var query = $('.text-field').val();

    if (query === '') {
      $('.text-field').addClass('error');
	$('.error-message').text('You have to search for something!');
	
    } else if (query.indexOf('#') !== -1){
      $('.text-field').addClass('error');
	$('.error-message').text('No hastags allowed!');

    } else {
      $('.text-field').removeClass('error');
	$('.error-message').text('');

    }
  });


});
