//-----------------Код из старой версии этого контрольного задания---------------------------------------------
let burger = $('')
document.getElementById('burger').onclick = function () {
    document.getElementById('menu').classList.add('open');
}

document.querySelectorAll('#menu *').forEach((item) => {
    item.onclick = () => {
        document.getElementById('menu').classList.remove('open');
    }
})

//-------------------------------------------------------------------------------------------------------------

let loader = $('.loader');
$('#submit').click(function () {
    let product = $('#choose_input');
    let name = $('#name_input');
    let phone = $('#phone_input');

    let hasError = false;

    $('.error-input').hide();
    $('.same-input').css('border', '1px solid rgb(130, 19, 40)');
    if (!product.val()) {
        product.next().show();
        product.css('border', '2px solid red')
        hasError = true;
    }
    if (!name.val()) {
        name.next().show();
        name.css('border', '2px solid red')
        hasError = true;
    }
    if (!phone.val()) {
        phone.next().show();
        phone.css('border', '2px solid red')
        hasError = true;
    }


    if (!hasError) {
        loader.css('display', 'flex');
        $.ajax({
            method: "POST",
            url: "https://testologia.site/checkout",
            data: {product: product.val(), name: name.val(), phone: phone.val()}
        })

            .done(function (msg) {
                loader.hide();
                if (msg.success) {
                    let orderForm = $('.order-form');
                    orderForm.html('<div>Спасибо за Ваш заказ. Мы скоро свяжемся с Вами!</div>');
                    orderForm
                        .css('font-size', '17px')
                        .css('display', 'flex')
                        .css('align-items', 'center')
                        .css('justify-content', 'center')
                        .css('font-family', ' GilroyBold, sans-serif')
                        .css('color', ' rgb(118, 12, 34)');
                } else {
                    alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ!');
                }
            })
    }

})