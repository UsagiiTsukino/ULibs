

jQuery(document).ready(($) =>{
	initPreloader();
    initPriceSlider();
	initQuantity();
	initStarRating();
	initFavorite();
	initIsotopeFiltering();
	initToolTip();
	initLazyLoading();
	initTimer();
	initSlider();
	updateTotalPrice();
	updateQuantityProductInCart();
	
	function initLazyLoading() {
		$('.lazy').Lazy({
			
			effect: 'fadeIn',
			duration : 300,
			delay: 5000
		});
	}
                

	function initPreloader() {


		$(window).on('load', function(event) {
			$(document.body).removeClass('preloader');
			$('.preloader').delay(1000).fadeOut('slow');
			$('.loader').delay(1000).fadeOut('slow');

		})
	}

	// if ($('#search').val() === '') {
	// 	$('.btn-search').css('cursor', 'no-drop').on('click', function(event) {
	// 		event.preventDefault();
	// 	})
	// }

	$(':input[type="submit"]').prop('disabled', true);
	$('input[type="text"]').keyup(function() {
	   if($(this).val() != '') {
		  $(':input[type="submit"]').prop('disabled', false).css('cursor', 'pointer');
	   }
	});
	// Animate for Product-Infomation
	$(window).on('scroll', function () {
		if ($(this).scrollTop() > 380) {
		  $('.product-infomation').addClass('animate__animated animate__zoomInDown').css('visibility', 'visible');
		} 
	  });
	  //Animate for Footer
	  $(window).on('scroll', function () {
		if ($(this).scrollTop() > $(document).height() - 1024 ) {
		  $('.footer').addClass('animate__animated animate__fadeInUp').css('visibility', 'visible');
		} 
	  });
	  // Handle file chooser model
	  $('.edit').on('click', () => {
			$('.file-chooser').toggleClass('show').addClass('animate__animated animate__fadeInDown')
	  })
	  // FIx Navbar
	  $('.dropdown-item.infomation-account__navbar').on('click', (e) => {
		e.stopPropagation();
	  });
	//   // Delete token when logout
	//   $.removeCookie('token', { path: '/login' });
	function formatPrice(price){
		return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}
    function initPriceSlider()
    {
		"use strict";
		
		$( "#slider-range" ).slider(
		{
			range: true,
			min: 0,
			max: 25,
			values: [ 0, 0 ],
			
			slide: function( event, ui )
			{
				$( "#amount" ).val( formatPrice((ui.values[ 0 ] * 100000).toString()) + " đ - " + formatPrice((ui.values[ 1 ] * 100000).toString()) +" đ");
			}
		});
			
		$( "#amount" ).val(  $( "#slider-range" ).slider( "values", 0 ) + " đ"+" - " + $( "#slider-range" ).slider( "values", 1 ) + " đ");
    }
	function initQuantity()
	{
		const quantity_selector = $('.quantity_selector')
		quantity_selector.each(function() {
			if($('.plus').length && $('.minus').length)
			{
				var plus = 	$(this).children('.plus');
				var minus =	$(this).children('.minus');
				var value =	$(this).children('#quantity_value');
				var price = $(this).parent().parent().parent().children('td').children().children('span.product__real-prices').text().replace( 'đ', '' ).replaceAll(',', '').replaceAll(' ','');
				var finalPrice = $(this).parent().parent().parent().children('td').children().children('span.product__final-prices')
				price = parseInt(price)
				plus.on('click', function()
				{
					var x = parseInt(value.text());
					 value.text(x + 1);
					var _value = parseInt(value.text());
					let _price = parseInt(price);

					_res = updatePrice(_price, _value);
					finalPrice.text(formatPrice(_res.toString()) + ' đ')
					console.log(_value);
					console.log(_price);
					console.log(_res)
				});

				minus.on('click', function()
				{
					var x = parseInt(value.text());
					if(x > 1)
					{
						value.text(x - 1);
					}
					var _value = parseInt(value.text());
					let _price = parseInt(price);

					_res = updatePrice(_price, _value);
					finalPrice.text(formatPrice(_res.toString()) + ' đ')
					console.log(_value);
					console.log(_price);
					console.log(_res)
				});
			}
		})
	}
	function initStarRating()
	{
		if($('.user_star_rating li').length)
		{
			var stars = $('.user_star_rating li');

			stars.each(function()
			{
				var star = $(this);

				star.on('click', function()
				{
					var i = star.index();

					stars.find('i').each(function()
					{
						$(this).removeClass('fa-star');
						$(this).addClass('fa-star-o');
					});
					for(var x = 0; x <= i; x++)
					{
						$(stars[x]).find('i').removeClass('fa-star-o');
						$(stars[x]).find('i').addClass('fa-star');
					};
				});
			});
		}
	}
	function initFavorite()
	{
		if($('.product_favorite').length)
		{
			var fav = $('.product_favorite');

			fav.on('click', function()
			{	
				// fav.css('transform', 'scale(' +1.2+')');
				fav.toggleClass('active');
				if (fav.hasClass('active')){
					$('.favorite-js-text').text("Đã thích")
				}
				else $('.favorite-js-text').text("Thích")				
			});

		}
	}
	$(function(){
		const navHeight = $('.navigation').innerHeight()
		$('thead tr:nth-child(1) th').css('top', navHeight + 'px');
	})

	// Responsive Header

	$(function(){
		const navWidth = $('.navigation').innerWidth()
		if (navWidth < 400) {
			$('.user-text > text').text('')
			$('.btn-search > text').text('')
			$('.btn-search').css('width', 50 + 'px')
		}
	})

	//Searching Feature
	$(function (){
			var productsList = [];
			localStorage.setItem('productsName', JSON.stringify(productsList))
			$('.card-title').each(function (){
				productsList.push($(this).text())
				// console.log($(this));
				localStorage.setItem('name', JSON.stringify(productsList))
			});
			var productsList = localStorage.getItem('name')
			productsList = JSON.parse(productsList)
			$( "#search" ).autocomplete({
				source: productsList
			});
		});
	
	// Tooltip
	function initToolTip(){
		$('.drawner > item').tooltip()
	}
		/*  Init Timer*/

	function initTimer()
    {
    	if($('.timer').length)
    	{

	    	// comment lines below
	    	var date = new Date();
	    	date.setDate(date.getDate() + 3);
	    	var target_date = date.getTime();
	    	//----------------------------------------
	 
			// variables for time units
			var days, hours, minutes, seconds;

			var d = $('#day');
			var h = $('#hour');
			var m = $('#minute');
			var s = $('#second');

			setInterval(function ()
			{
			    // find the amount of "seconds" between now and target
			    var current_date = new Date().getTime();
			    var seconds_left = (target_date - current_date) / 1000;
			 
			    // do some time calculations
			    days = parseInt(seconds_left / 86400);
			    seconds_left = seconds_left % 86400;
			     
			    hours = parseInt(seconds_left / 3600);
			    seconds_left = seconds_left % 3600;
			     
			    minutes = parseInt(seconds_left / 60);
			    seconds = parseInt(seconds_left % 60);

			    // display result
			    d.text(days);
			    h.text(hours);
			    m.text(minutes);
			    s.text(seconds); 
			 
			}, 1000);
    	}	
    }

	function initIsotopeFiltering()
    {
    	var sortTypes = $('.type_sorting_btn');
    	var sortNums = $('.num_sorting_btn');
    	var sortTypesSelected = $('.sorting_type .item_sorting_btn is-checked span');
    	var filterButton = $('.filter_button');

    	if($('.product-show').length)
    	{
    		$('.product-show').isotope({
    			itemSelector: '.product-item',
	            getSortData: {
	            	price: function(itemElement)
	            	{
	            		var priceEle = $(itemElement).find('.product-price').text().replace( 'đ', '' ).replaceAll(',', '').replaceAll(' ','');
	            		return parseFloat(priceEle);
	            	},
	            	name: '.card-title'
	            },
	            animationOptions: {
	                duration: 750,
	                easing: 'linear',
	                queue: false
	            }
	        });

    		// Short based on the value from the sorting_type dropdown
	        sortTypes.each(function()
	        {
	        	$(this).on('click', function()
	        	{
	        		$('.type_sorting_text').text($(this).text());
	        		var option = $(this).attr('data-isotope-option');
	        		option = JSON.parse( option );
    				$('.product-show').isotope( option );
	        	});
	        });

	        // Show only a selected number of items
	        sortNums.each(function()
	        {
	        	$(this).on('click', function()
	        	{
	        		var numSortingText = $(this).text();
					var numFilter = ':nth-child(-n+' + numSortingText + ')';
	        		$('.num_sorting_text').text($(this).text());
    				$('.product-show').isotope({filter: numFilter });
	        	});
	        });	

	        // Filter based on the price range slider
	        filterButton.on('click', function()
	        {
	        	$('.product-show').isotope({
		            filter: function()
		            {
		            	var priceRange = $('#amount').val();
			        	var priceMin = parseFloat(priceRange.split('-')[0].replace('đ', '').replaceAll(',', '').replaceAll(' ',''));
			        	var priceMax = parseFloat(priceRange.split('-')[1].replace('đ', '').replaceAll(',', '').replaceAll(' ',''));
			        	var itemPrice = $(this).find('.product-price').clone().children().remove().end().text().replace( 'đ', '' ).replaceAll(',', '').replaceAll(' ','');
						// console.log(itemP);
			        	return (itemPrice > priceMin) && (itemPrice < priceMax);
		            },
		            animationOptions: {
		                duration: 750,
		                easing: 'linear',
		                queue: false
		            }
		        });
	        });
    	}
    }
	function updatePrice(price, value) {
		return parseInt(price * value);
	}
	function updateTotalPrice() {
		setInterval(() => {
			var sum = 0;
			$('.product__final-prices').each(function () {
				sum += parseInt($(this).text().replace( 'đ', '' ).replaceAll(',', '').replaceAll(' ',''));
			});
			$('.total-price > .price').text(formatPrice(sum.toString()) + ' đ');
		}, 0);
	}
	function updateQuantityProductInCart(){
		let storage = localStorage.getItem('cart');
        if (storage) {
            cart = JSON.parse(storage);
        }
		$('.add-cart a i span').text(cart.length)
		$('.total-price > .title').text(
            `Tổng thanh toán (${cart.length} Sản phẩm):`
        );
	}
	function initSlider()
    {
    	if($('.product_slider').length)
    	{
    		var slider1 = $('.product_slider');

    		slider1.owlCarousel({
    			loop:false,
    			dots:false,
    			nav:false,
    			responsive:
				{
					0:{items:1},
					480:{items:2},
					768:{items:3},
					991:{items:4},
					1280:{items:5},
					1440:{items:5}
				}
    		});

    		if($('.product_slider_nav_left').length)
    		{
    			$('.product_slider_nav_left').on('click', function()
    			{
    				slider1.trigger('prev.owl.carousel');
    			});
    		}

    		if($('.product_slider_nav_right').length)
    		{
    			$('.product_slider_nav_right').on('click', function()
    			{
    				slider1.trigger('next.owl.carousel');
    			});
    		}
    	}
    }
})