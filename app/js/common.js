jQuery(document).ready(function(){

	$.fn.extend({ 

		addTemporaryClass: function(className, duration) {
			var elements = this;
			setTimeout(function() {
				elements.removeClass(className);
			}, duration);

			return this.each(function() {
				$(this).addClass(className);
			});
		}
	});

	$('#quiz').quiz({
		questions: [
		{
			'q': 'A smaple question?',
			'options': [
			'Answer 1',
			'Answer 2',
			'Answer 3',
			'Answer 4'
			],
			'correctIndex': 1,
			'correctResponse': 'Custom correct response.',
			'incorrectResponse': 'Custom incorrect response.'
		}
		]
	});

	$(".phone").mask("+7 (999) 999-99-99");

// Function Runs On NEXT Button Click
$(".next_btn").click(function() { 
	var test = 0;
	$(this).parent().parent('fieldset').find('input').each(function(i,e,a){
		test += $(e).prop('checked');
	})
	if (test>0) {
		$(this).parent().parent().next().addClass('active');
		$(this).parent().parent().removeClass('active');
	} else {
		$(this).parent().parent().find('label').addTemporaryClass("error", 1000);
	}
});
// Function Runs On PREVIOUS Button Click
$(".pre_btn").click(function() { 
	$(this).parent().parent().prev().addClass('active');
	$(this).parent().parent().removeClass('active');
});
// Validating step



});