    function formatPrice(price){
        return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    cartItem = JSON.parse(localStorage.getItem('cart'))
     
    if (cartItem){
        let totalPrice = 0
        cartItem.map(item => {
                totalPrice += parseInt(item.product.price)
                console.log(totalPrice);
                let list = document.querySelector('.package-item-list')
                if(list){
                list.innerHTML += `
                <div>
                    <div class="package-item">
                        <div class="item-icon">
                            <img src="${item.product.img}"
                                alt="" height="48px" width="48px">
                        </div>
                        <div class="item-info">
                            <div class="item-info__first-line"><span class="item-info__product-name"
                                    title="${item.product.name}">${item.product.name}</span></div>
                            <div class="item-info__second-line">
                                <div class="item-info__qty">SL: ${item.quantity}</div>
                                <div class="item-info__price">${formatPrice(item.product.price)} đ</div>
                            </div>
                        </div>
                </div>
            </div>
                `
        }
            document.getElementById('quatity-total-payment').innerHTML = `${cartItem.length} sản phẩm`
            document.getElementById('temp-total--payment').innerHTML = `${formatPrice(totalPrice.toString())} đ`
            document.querySelector('.order-total__total').innerText = `${formatPrice((totalPrice - 7000).toString())} đ`
    })
}
    
