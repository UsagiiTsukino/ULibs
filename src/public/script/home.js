jQuery(document).ready(($) =>{

    initPriceSlider();
	initQuantity();
	initStarRating();
	initFavorite();

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
			max: 50,
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
		if($('.plus').length && $('.minus').length)
		{
			var plus = $('.plus');
			var minus = $('.minus');
			var value = $('#quantity_value');

			plus.on('click', function()
			{
				var x = parseInt(value.text());
				value.text(x + 1);
			});

			minus.on('click', function()
			{
				var x = parseInt(value.text());
				if(x > 1)
				{
					value.text(x - 1);
				}
			});
		}
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

})