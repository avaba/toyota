jQuery(document).ready(function(){

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

var count = 0; // To Count Blank Fields
/*------------ Validation Function-----------------*/
$(".submit_btn").click(function(event) {
var radio_check = $('.rad'); // Fetching Radio Button By Class Name
var input_field = $('.text_field'); // Fetching All Inputs With Same Class Name text_field & An HTML Tag textarea
var text_area = $('textarea');
// Validating Radio Button
if (radio_check[0].checked == false && radio_check[1].checked == false) {
	var y = 0;
} else {
	var y = 1;
}
// For Loop To Count Blank Inputs
for (var i = input_field.length; i > count; i--) {
	if (input_field[i - 1].value == '' || text_area.value == '') {
		count = count + 1;
	} else {
		count = 0;
	}
}
// Notifying Validation
if (count != 0 || y == 0) {
	alert("*All Fields are mandatory*");
	event.preventDefault();
} else {
	return true;
}
});

/*---------------------------------------------------------*/

$('fieldset').on('change', 'input[type=checkbox]', function() {
	var checkVal = false;
	$('fieldset').find('input[type=checkbox]').each(function() {
		var test = $(this).prop('checked');
		if (test) {
			checkVal = true;
		}
	});
	if (checkVal) {
		$('.next_btn').removeClass('done');
	} else {
		$('.next_btn').addClass('done');
	}
});

/*---------------------------------------------------------*/

$(".next_btn").click(function() { // Function Runs On NEXT Button Click
	var test = 0;
	$(this).parent().parent('fieldset').find('input[type=checkbox]').each(function(i,e,a){
		test += $(e).prop('checked');
	})
	if (test>0) {
		$(this).parent().parent().next().fadeIn('slow');
		$(this).parent().parent().css({
			'display': 'none'
		});
	}
});
$(".pre_btn").click(function() { // Function Runs On PREVIOUS Button Click
	$(this).parent().prev().fadeIn('slow');
	$(this).parent().css({
		'display': 'none'
	});
});
// Validating All Input And Textarea Fields
$(".submit_btn").click(function(e) {
	if ($('input').val() == "" || $('textarea').val() == "") {
		alert("*All Fields are mandatory*");
		return false;
	} else {
		return true;
	}
});

});