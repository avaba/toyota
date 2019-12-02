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
});

function theRotator() {
// Устанавливаем прозрачность всех картинок в 0
$('.slideCar').css({opacity: 0.0});

// Берем первую картинку и показываем ее (по пути включаем полную видимость)
$('.slideCar img:first').css({opacity: 1.0});

// Вызываем функцию rotate для запуска слайдшоу, 5000 = смена картинок происходит раз в 5 секунд
setInterval('rotate()',5000);
}

function theRotator() {
	// Устанавливаем прозрачность всех картинок в 0
	$('div#rotator ul li').css({opacity: 0.0});

	// Берем первую картинку и показываем ее (по пути включаем полную видимость)
	$('div#rotator ul li:first').css({opacity: 1.0});

	// Вызываем функцию rotate для запуска слайдшоу, 5000 = смена картинок происходит раз в 5 секунд
	setInterval('rotate()',5000);
}

function rotate() {	
	// Берем первую картинку
	var current = ($('div#rotator ul li.show')?  $('div#rotator ul li.show') : $('div#rotator ul li:first'));

	// Берем следующую картинку, когда дойдем до последней начинаем с начала
	var next = ((current.next().length) ? ((current.next().hasClass('show')) ? $('div#rotator ul li:first') :current.next()) : $('div#rotator ul li:first'));	

	// Расскомментируйте, чтобы показвать картинки в случайном порядке
	// var sibs = current.siblings();
	// var rndNum = Math.floor(Math.random() * sibs.length );
	// var next = $( sibs[ rndNum ] );

	// Подключаем эффект растворения/затухания для показа картинок, css-класс show имеет больший z-index
	next.css({opacity: 0.0})
	.addClass('show')
	.animate({opacity: 1.0}, 1000);

	// Прячем текущую картинку
	current.animate({opacity: 0.0}, 1000)
	.removeClass('show');
};

$(document).ready(function() {		
	theRotator();
});