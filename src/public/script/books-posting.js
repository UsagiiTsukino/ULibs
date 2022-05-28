jQuery(document).ready(($) =>{
    
    BookPostingPreview()
    function formatPrice(price){
		return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
	}
    function BookPostingPreview() {
        $('#check').on('click', () => {
            let catelogy = $('#catelogy-options').find(':selected').text()
            $('#catelogy').val(catelogy)
            $('.card-title').text($('#bookName').val());
            $('.card-img-top').attr('src',$('#image').val());
            $('.product-price').text(formatPrice($('#price').val()) + 'đ');
            $('.card-preview').css({
                'display': 'block',
                'box-shadow': 'rgb(0 0 0 / 30%) 0px 0px 20px;'
            })
             
            setTimeout(() => {
                $('.form-posting > form > button[type="submit"]').css({
                    'display': 'block',
                })
            }, 1000);        
        })     
    }
})