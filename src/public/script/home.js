jQuery(document).ready(($) =>{

    initPriceSlider();
	initIsotopeFiltering();
    function initPriceSlider()
    {
		"use strict";
		
		$( "#slider-range" ).slider(
		{
			range: true,
			min: 0,
			max: 1000,
			values: [ 0, 580 ],
			slide: function( event, ui )
			{
				$( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
			}
		});
			
		$( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) + " - $" + $( "#slider-range" ).slider( "values", 1 ) );
    }
	// function initIsotopeFiltering()
    // {
    // 	var sortTypes = $('.type_sorting_btn');
    // 	var sortNums = $('.num_sorting_btn');
    // 	var sortTypesSelected = $('.sorting_type .item_sorting_btn is-checked span');
    // 	var filterButton = $('.filter_button');

    // 	if($('.product-grid').length)
    // 	{
    // 		$('.product-grid').isotope({
    // 			itemSelector: '.product-item',
	//             getSortData: {
	//             	price: function(itemElement)
	//             	{
	//             		var priceEle = $(itemElement).find('.product_price').text().replace( '$', '' );
	//             		return parseFloat(priceEle);
	//             	},
	//             	name: '.product_name'
	//             },
	//             animationOptions: {
	//                 duration: 750,
	//                 easing: 'linear',
	//                 queue: false
	//             }
	//         });

    // 		// Short based on the value from the sorting_type dropdown
	//         sortTypes.each(function()
	//         {
	//         	$(this).on('click', function()
	//         	{
	//         		$('.type_sorting_text').text($(this).text());
	//         		var option = $(this).attr('data-isotope-option');
	//         		option = JSON.parse( option );
    // 				$('.product-grid').isotope( option );
	//         	});
	//         });

	//         // Show only a selected number of items
	//         sortNums.each(function()
	//         {
	//         	$(this).on('click', function()
	//         	{
	//         		var numSortingText = $(this).text();
	// 				var numFilter = ':nth-child(-n+' + numSortingText + ')';
	//         		$('.num_sorting_text').text($(this).text());
    // 				$('.product-grid').isotope({filter: numFilter });
	//         	});
	//         });	

	//         // Filter based on the price range slider
	//         filterButton.on('click', function()
	//         {
	//         	$('.product-grid').isotope({
	// 	            filter: function()
	// 	            {
	// 	            	var priceRange = $('#amount').val();
	// 		        	var priceMin = parseFloat(priceRange.split('-')[0].replace('$', ''));
	// 		        	var priceMax = parseFloat(priceRange.split('-')[1].replace('$', ''));
	// 		        	var itemPrice = $(this).find('.product_price').clone().children().remove().end().text().replace( '$', '' );

	// 		        	return (itemPrice > priceMin) && (itemPrice < priceMax);
	// 	            },
	// 	            animationOptions: {
	// 	                duration: 750,
	// 	                easing: 'linear',
	// 	                queue: false
	// 	            }
	// 	        });
	//         });
    // 	}
    // }

})