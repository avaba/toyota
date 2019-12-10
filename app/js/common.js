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

$(".calc__next").click(function() { 
	$(this).parent().next().addClass('active');
	$(this).parent().removeClass('active');
});

// Function Runs On PREVIOUS Button Click
$(".pre_btn").click(function() { 
	$(this).parent().parent().prev().addClass('active');
	$(this).parent().parent().removeClass('active');
});

$('select').styler();

$('#variant-select').on('change', function(){
	var url = $(this).find(':selected').data('price');
	$('#model').addClass('active').attr('src', url);
});

var money = document.getElementById('money');
var time = document.getElementById('time');

noUiSlider.create(money, {
	start: 50,
	connect: 'lower',
	tooltips: true,
	range: {
		'min': 0,
		'max': 100
	},
	format: wNumb({
		decimals: 0,
		suffix: '%'
	})
});

noUiSlider.create(time, {
	start: 12,
	connect: 'lower',
	tooltips: true,
	range: {
		'min': 0,
		'max': 24
	},
	format: wNumb({
		decimals: 0,
		suffix: ' мес.'
	})
});


var inputFormat = document.getElementById('money_bar_input');
var inputFormatTime = document.getElementById('time_bar_input');

money.noUiSlider.on('update', function (values, handle) {
	inputFormat.value = values[handle];
});

time.noUiSlider.on('update', function (values, handle) {
	inputFormatTime.value = values[handle];
});

inputFormat.addEventListener('change', function () {
	money.noUiSlider.set(this.value);
});

inputFormatTime.addEventListener('change', function () {
	time.noUiSlider.set(this.value);
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

ymaps.ready(function () {
	var myMap = new ymaps.Map('map', {
		center: [55.669110, 37.535022],
		zoom: 12,
		controls: [],
	}, {
		searchControlProvider: 'yandex#search'
	}),

	MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
		'<div style="color: #FFFFFF; font-weight: bold;">$[properties.iconContent]</div>'
		),

	myPlacemarkWithContent = new ymaps.Placemark([55.686515, 37.550698], {
		hintContent: 'Москва, Ломоносовский проспект, 298/9',
		balloonContent: 'Ключавто',
	}, {
		iconLayout: 'default#imageWithContent',
		iconImageHref: 'img/map.svg',
		iconImageSize: [50, 66],
		iconImageOffset: [-20, -50],
		iconContentOffset: [15, 15],
		iconContentLayout: MyIconContentLayout
	});

	myMap.geoObjects 
	.add(myPlacemarkWithContent);
	myMap.behaviors.disable('scrollZoom'); 
});