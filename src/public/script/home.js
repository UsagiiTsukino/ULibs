jQuery(document).ready(($) =>{

    initPriceSlider();
	initQuantity();
	initStarRating();
	initFavorite();
	initIsotopeFiltering();
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

})