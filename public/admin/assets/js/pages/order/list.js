'use strict';
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $.fn.dataTable.ext.errMode = 'none';
  $('#orderTable').DataTable({
    paging: true,
    ordering: false,
    bLengthChange: false,
    info: true,
    searching: true,
    processing: true,
    searchDelay: 500,
    stateSave: true,
    serverSide: true,
    ajax: {
      url: '/admin/get-orders',
      type: 'GET',
      datatype: 'json',
      dataSrc: function (data) {
        localStorage.setItem('role', data.data.role);
        return data.data.data;
      },
    },
    columnDefs: [
      {
        targets: 0,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return '<a href="/admin/view-order?orderId='+ full['_id'] +'">#'+full['_id']+'</a>'
          }
        },
      },
      {
        targets: 1,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            if (full['customerId']) {
              return "<a href=\"\">#"+full['customerId']+"</a>"
            }
            if (full['billingAddress']) {
              return '<a class="text-body text-truncate fw-semibold">'+full['billingAddress'].fullname+'</a>';
            }
            return '';
          }
        },
      },
      {
        targets: 2,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return new Date(full['createdAt']).toLocaleDateString('vi-VN');
          }
        },
      },
      {
        targets: 3,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            let products = full['products']
            var total = 0
            if (products && full['productList']) {
              /*products.forEach(function (item) {
                let product = full['productList'].find(x=>x._id === item.productId)
                if (product) {
                  if (product.ecommerce && product.ecommerce != null) {
                    if (product.ecommerce.priceSale) {
                      total = total + item.quantity * product.ecommerce.priceSale
                    }else{
                      total = total + item.quantity * product.ecommerce.price
                    }
                  }else if (product.ecommercePlus && product.ecommercePlus != null){
                    var ecommercePlus = product.ecommercePlus.find(x=>x.atribute.some(s=>s.code == item.color))
                    if (!ecommercePlus && product.ecommercePlus.length > 0) {
                      ecommercePlus = product.ecommercePlus[0]
                    }
                    total = total + item.quantity * ecommercePlus.price
                  }
                }
              });
              */
            }

            // if (full['discount'] && full['discount'].discount) {
            //   total = total - full['discount'].discount
            // }
            return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(full['total']);
          }
        },
      },
      {
        targets: 4,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            var methodHtml = ""
            let method = full['paymend']
            if (method) {
              methodHtml = "<p class=\"mb-0 w-px-100 text-primary\">"+method.paymentMethod+"</p>"
            }
            switch (full['paymentStatus']) {
              case "PENDING":
                return "<p class=\"mb-0 w-px-120 text-warning\"><i class=\"bx bxs-circle fs-tiny me-2\"></i>Đang chờ</p>" + methodHtml
              case "PAID":
                return "<p class=\"mb-0 w-px-120 text-success\"><i class=\"bx bxs-circle fs-tiny me-2\"></i>Thành công</p>" + methodHtml
              case "FAILED":
                return "<p class=\"mb-0 w-px-120 text-danger\"><i class=\"bx bxs-circle fs-tiny me-2\"></i>Lỗi</p>" + methodHtml
              default:
                return "<p class=\"mb-0 w-px-120 text-warning\"><i class=\"bx bxs-circle fs-tiny me-2\"></i>Đang chờ</p>" + methodHtml
            }
          }
        },
      },
      {
        targets: 5,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            switch (full['status']) {
              case "OPEND":
                return  "<span class=\"badge bg-label-warning\">Chờ Xử Lý</span>"
              case "CONFIRMED":
                return "<span class=\"badge bg-label-info\">Đang Xử Lý</span>"
              case "PAYMENTED":
                  return "<span class=\"badge bg-label-success\">Đã thanh toán</span>"
              case "COMPLETED":
                return "<span class=\"badge bg-label-primary\">Hoàn Thành</span>"
              case "CANCELLED":
                return "<span class=\"badge bg-label-danger\">Huỷ</span>"
              default:
                return full['status'];
            }
          }
        },
      },
      {
        targets: 6,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            var html = '<div class="d-flex align-items-center">'+
// '              <a href="javascript:;" data-bs-toggle="tooltip" class="text-body" data-bs-placement="top" aria-label="Send Mail" data-bs-original-title="Send Mail"><i class="bx bx-send mx-1"></i></a>'+
'              <a href="/admin/view-order?orderId='+ full['_id'] +'" data-bs-toggle="tooltip" class="text-body" data-bs-placement="top" aria-label="Preview Invoice" data-bs-original-title="Xem đơn hàng"><i class="bx bx-show mx-1"></i></a>'+
'              <div class="dropdown">'+
'                <a href="javascript:;" class="btn dropdown-toggle hide-arrow text-body p-0" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></a>'+
'                <div class="dropdown-menu dropdown-menu-end">'+
'                  <a href="" class="dropdown-item"'
+'onclick="updateStatusOrder(\'' + full['_id'] +'\',\'CONFIRMED\')"'
+'>Đang xử lý</a>'+
'                  <a href="" class="dropdown-item"'
+'onclick="updateStatusOrder(\'' + full['_id'] +'\',\'COMPLETED\')"'
+'>Hoàn thành</a>'+
'                  <a href="" class="dropdown-item"'
+'onclick="updateStatusOrder(\'' + full['_id'] +'\',\'CANCELLED\')"'
+'>Huỷ</a>'+
'                <div class="dropdown-divider"></div>'+
'                <a class="dropdown-item delete-record text-danger"'
+'onclick="confirmDelete(\'' + full['_id'] +'\')"'
+'>Xoá</a>'+
'                </div> </div> </div>';
            return html;
          }
        },
      },
    ],
  });
});

function updateStatusOrder(id, status) {
  $.ajax({
    url: '/admin.updateStatusOrder',
    method: 'POST',
    data: {
      _id: id,
      status : status
    },
  })
    .done(function (res) {
      res = res || {};
      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: 'Đã cập nhật trạng thái',
        });
        $('#orderTable').DataTable().draw();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Cập nhật không thành công!',
        });
      }
    })
    .fail(function (a, b, msg) {
      Toast.fire({
        icon: 'error',
        title: 'Cập nhật không thành công!',
      });
    });
}

function confirmDelete(e) {
  Swal.fire({
    title: 'Bạn muốn xoá tin đơn hàng này?',
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xoá',
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/admin.removeOrder',
        method: 'POST',
        data: {
          _id: e,
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
  });
}
