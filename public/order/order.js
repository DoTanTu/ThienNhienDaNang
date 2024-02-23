function checkout(e) {
    var products = []
    var dataProductsLocal = []
    dataProductsLocal.forEach(element => {
        products.push({
            "productId": "6419486e1abfd119e14df082",
            "categoryId": "63e1189c51c0fe8f5115a7b2",
            "quantity": "1",
            "price": "10000",
    
            "adult": "",
            "children": "",
            "timeStart": "",
            "timeEnd": "",
            "size": "M",
            "color": "DEN",
            "measures":"",
            "weight":"",
            "height": "",
            "width": ""
          })
    });
    $.ajax({
        url: '/order',
        method: 'POST',
        data: {
            "customerId" : null,
            "products": products,
            "note": "hello",
            "billingAddress": {
                  "fullname": "nguyen van b",
                  "address":  "53 tab",
                  "phone": "012312341",
                  "email": "abc@gmail.com"
                },
            "shippingAddress": {
                  "shipCode": "123",
                  "fullname": "nguyen van a",
                  "address":  "53 tab",
                  "phone": "012312341",
                  "email": "abc@gmail.com"
                },
            "shipId": null,
            "discount": null,
            "paymendId": "vRoub-RxK",
            "subTotal": "10000",
            "total": "15000"
            },
      })
        .done(function (res) {
          res = res || {};
          if (res.success) {
            Toast.fire({
              icon: 'success',
              title: 'Đã được xoá',
            });
            $('#orderTable').DataTable().draw();
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Xoá không thành công!',
            });
          }
        })
        .fail(function (a, b, msg) {
          Toast.fire({
            icon: 'error',
            title: 'Xoá không thành công!',
          });
        });
  }
  