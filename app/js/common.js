jQuery(document).ready(function(){
	$('.hamburger').click(function(){
		$(this).toggleClass('is-active');
	});

	$('.hamburger').click(function(){
		$('.nav').toggleClass('-visible');
		$('.nav-slideout').toggleClass('-visible');
	});

	$('.nav-slideout, .nav a').click(function(){
		$('.nav').toggleClass('-visible');
		$('.nav-slideout').toggleClass('-visible');
		$('.hamburger').toggleClass('is-active');
	});

	if (window.screen.width >= 992 && window.screen.height >= 650){
		$("#fullpage").pagepiling({
			menu: '#menu',
			anchors: ['page1', 'page2'],
			navigation: false,
			scrollOverflow: true
		});
		setTimeout(function(){
			$('.hamburger').addClass('white')
		},5000); 
		jQuery(document).mousemove(function(e) {
			var x = (e.pageX * -1 / 50), y = (e.pageY * -1 / 50);
			jQuery('.parralax').css('right', x + 'px');
			jQuery('.parralax').css('top', y + 'px');
		});
	}

	if (window.screen.width <= 992 || window.screen.height <= 650){
		$(".b-titr__start").on("click", function (event) {
			event.preventDefault();
			var id  = $(this).attr('href'),
			top = $(id).offset().top - 0;
			$('body,html').animate({scrollTop: top}, 1000);
		});

		$("#menu").on("click","a", function (event) {
			event.preventDefault();
			var id  = $(this).attr('href'),
			top = $(id).offset().top - 0;
			$('body,html').animate({scrollTop: top}, 1000);
		});
	}

	var love_bar = document.getElementById('love_bar');

	noUiSlider.create(love_bar, {
		start: 50,
		connect: 'lower',
		tooltips: true,
		range: {
			'min': 0,
			'max': 100
		},
		format: wNumb({
			decimals: 0,
			prefix: 'на все ',
			suffix: ' %'
		})
	});

	var inputFormat = document.getElementById('love_bar_input');

	love_bar.noUiSlider.on('update', function (values, handle) {
		inputFormat.value = values[handle];
	});

	inputFormat.addEventListener('change', function () {
		love_bar.noUiSlider.set(this.value);
	});

	var time_bar = document.getElementById('time_bar');

	noUiSlider.create(time_bar, {
		start: [2, 30],
		behaviour: 'drag',
		connect: true,
		range: {
			'min': 2,
			'max': 60
		},
		format: wNumb({
			decimals: 0
		})
	});

	var time_barValueElement = document.getElementById('time_bar_input_value');

	time_bar.noUiSlider.on('update', function (values) {
		time_barValueElement.innerHTML = values.join(' - ');
	});

	var marginMin = document.getElementById('time_bar_min'),
	marginMax = document.getElementById('time_bar_max');

	time_bar.noUiSlider.on('update', function (values, handle) {
		if (handle) {
			marginMax.value = values[handle];
		} else {
			marginMin.value = values[handle];
		}
	});

	$(".phone").mask("+7 (999) 999-99-99");

});