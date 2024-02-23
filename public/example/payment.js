
let paymentStripe = JSON.parse(decodeURI($('#paymentStripe').val()))
let shipDatas = JSON.parse(decodeURI($('#dataShips').val()))
var stripe = Stripe(paymentStripe.pKey);
function checkout(e) {
    var products = []
    var oTable = document.getElementById('tableData');
    var rowLength = oTable.rows.length;
    for (i = 0; i < rowLength; i++){
       var oCells = oTable.rows.item(i).cells;
       products.push({
            "productId": oCells.item(0).innerHTML.trim(),
            "categoryId": null,
            "ecommercePlusId": oCells.item(5).innerHTML.trim(),
            "quantity":  oCells.item(3).innerHTML.trim(),
            "price":  oCells.item(4).innerHTML.trim(),
            "adult": "",
            "children": "",
            "timeStart": "",
            "timeEnd": "",
            "size": "",
            "color": "",
            "measures":"",
            "weight":"",
            "height": "",
            "width": ""
       })
    }
    $.ajax({
        url: '/payment',
        method: 'POST',
        data: {
            "customerId" : null,
            "products": JSON.stringify(products),
            "note": "hello",
            "billingAddress": JSON.stringify({
              "fullname": "kietva",
              "address":  "53 tab",
              "phone": "012312341",
              "email": "v.anhkiet91@gmail.com"
            }),
            "shippingAddress": JSON.stringify({
                  "shipCode": "123",
                  "fullname": "kietva",
                  "address":  "53 tab",
                  "phone": "012312341",
                  "email": "v.anhkiet91@gmail.com"
                }),
            "shipId": $('#shipMethod').val(),
            "discount": null,
            "paymendId": paymentStripe._id,
            "subTotal": "20000",
            "total": $('#hiddenTotal').val()
            },
      })
        .done(function (res) {
          res = res || {};
          if (res.success) {
            return stripe.redirectToCheckout({ sessionId: res.id });
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Payment không thành công!',
            });
          }
        })
        .fail(function (a, b, msg) {
          Toast.fire({
            icon: 'error',
            title: 'Payment không thành công!',
          });
        });
  }

  function onChangeShip(e) {
    let ship = shipDatas.find(x=>x._id == e.value)
   document.getElementById("ship").innerHTML = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(ship.price))
   document.getElementById("total").innerHTML = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(parseInt(ship.price)  +20000)
   $('#hiddenTotal').val(parseInt(ship.price)  +20000)
  
  }
  