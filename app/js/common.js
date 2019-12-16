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

	// Узнать цену
	$('.product > div > div > div > div  > .product__item').each(function (e) {
		e +=1;
		var item_name = $(this).find('h3').text();
		$(this).after('\
			<div class="fancybox-hidden">\
			<div id="popup-' + e + '" class="callBack">\
			<img src="img/title_picture.jpg" alt="">\
			<form role="form" class="callBack__inner callForm">\
			<p class="title">Узнать цену <br> ' + item_name + '</p>\
			<input type="text" class="name required" placeholder="Имя">\
			<input type="text" class="phone required" placeholder="Номер телефона" autocomplete="off">\
			<button class="call w100">Позвоните мне</button>\
			<label class="consent">\
			<input type="checkbox" class="required" checked>\
			<p>Я даю согласие на обработку моих <a href="#">персональных данных</a></p>\
			</label>\
			</form>\
			<div class="thanks">\
			<div class="align-items-center row">\
			<div class="col-12">\
			<img src="img/сheck2.png" alt="">\
			</div>\
			<div class="col-12">\
			<h3>Спасибо!</h3>\
			<p>Ваша заявка принята. Мы свяжемся<br> с вами в ближайшее время</p>\
			</div>\
			</div>\
			</div>\
			</div>\
			</div>');
		$(this).find('.product__bot .row').prepend('\
			<div class="col-md-4">\
			<a href="#popup-' + e + '" class="call w100 fancybox">Узнать цену</a>\
			</div>');
	});

	$(".fancybox").fancybox({
		padding: 0,
		closeBtn: false 
	});

	var phones = new Numbered('.phone',{
		mask: '+7 (###) ### - ## - ##',
		empty: '_',
		placeholder: false
	});
	var classPhone = 'phone';
	var phoneRegex = /\+7 \([0-9]{3}\) [0-9]{3} - [0-9]{2}\ - [0-9]{2}/g;
	var phoneInputs = document.getElementsByClassName(classPhone);
	Array.prototype.forEach.call(phoneInputs, function(element) {
		element.addEventListener('change', function(e) {
			var result = e.target.value.match(phoneRegex);
			if (result === null) {
				e.target.value = '';
			}
		});
	});

	$('.name').on('keypress', function() {
		var that = this;
		setTimeout(function() {
			var res = /[^а-яА-Яa-zA-Z ]/g.exec(that.value);
			that.value = that.value.replace(res, '');
		}, 0);
	});

	$('.callForm').submit(function(e) {

		$(this).find('input[type="text"].required').each(function() {
			if(!$(this).val()) {
				$(this).addClass('has-error');
				$(this).attr('placeholder', 'Заполните поле');
			}
			else {
				$(this).removeClass('has-error');
				$(this).attr('placeholder', '');
			}
		});

		$(this).find('input[type="number"].required').each(function() {
			if(!$(this).val()) {
				$(this).addClass('has-error');
				$(this).attr('placeholder', 'Заполните поле');
			}
			else {
				$(this).removeClass('has-error');
				$(this).attr('placeholder', '');
			}
		});

		$(this).find('.consent input[type="checkbox"].required').each(function() {
			if($(this).prop("checked")){
				$(this).removeClass('has-error');
			}
			else {
				$(this).addClass('has-error');
			}
		});

		if($(this).find('.has-error').length)
			e.preventDefault();
		else {
			var th = $(this);
			$.ajax({
				type: "POST",
				url: "mail.php", 
				data: th.serialize()
			}).done(function() {
				th.addClass("active")
				th.parent().find('.thanks').fadeIn("slow")
				setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
			});
			return false;
		}
	});

	$('.hide-lg .head__menu').navScroll({
		scrollSpy: true,
		activeParent: true,
		navHeight: 160,
		activeClassName: 'active'
	});

	$('.menu .head__menu').navScroll({
		scrollSpy: true,
		activeParent: true,
		navHeight: 110,
		activeClassName: 'active'
	});

	$(".bars").click(function() {
		$(".menu").slideToggle();
	});

	$(".menu a").click(function() {
		$(".menu").slideToggle();
	});

	$(".product__bot").on("click",".scroll", function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
		top = $(id).offset().top - 190;
		$('body,html').animate({scrollTop: top}, 1500);
	});

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

$('.modelSelect select').change(function() {
	$(".calc__next").click(function() { 
		if ($(".modelSelect select :selected").val() == '--') {
			$(this).closest('fieldset').addClass("error");
		} else {
			$(this).closest('fieldset').next().addClass('active');
			$(this).closest('fieldset').removeClass('active');
		}
	});
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
		iconImageHref: 'img/map.png',
		iconImageSize: [55, 67],
		iconImageOffset: [-20, -50],
		iconContentOffset: [15, 15],
		iconContentLayout: MyIconContentLayout
	});

	myMap.geoObjects 
	.add(myPlacemarkWithContent);
});