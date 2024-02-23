'use strict';
$(document).ready(function() {
       $('[data-toggle="tooltip"]').tooltip();

       $('#formPaymentMethodData').submit(function () {
        var options = {
            beforeSubmit: showRequest, // pre-submit callback
            success: showResponse // post-submit callback
        };
    
        $(this).ajaxSubmit(options);
        // always return false to prevent standard browser submit and page navigation
        return false;
      });
    
      // pre-submit callback
      function showRequest(formData, jqForm, options) {
        formData.forEach(element => {
          if (element.name == 'image') {
            if (myDropzone.files.length > 0 &&  myDropzone.files[0].upload) {
              element.value = myDropzone.files[0].upload.path
            }
          }
        });
      }
    
      // post-submit callback
      function showResponse(responseText, statusText, xhr, $form) {
          if (responseText.success == true) {
            window.location.reload();
          }else{
            Toast.fire({
              icon: 'error',
              title: 'Thêm khách hàng không thành công!'
            })
          }
      }

      $('#paymentMethod').on('change', function() {
        switch(this.value) {
          case "COD":
            document.getElementById('view-bank').style.display = 'none';
            break;
          default:
            document.getElementById('view-bank').style.display = 'block';
            break;
        }
      });
});

function showCreateView(){
  $('#createPaymentMethod').offcanvas('show');

  $('#_id').val('');
  $('#paymentMethod').val('');
  $('#accountName').val('');
  $('#accountNumber').val('');
  $('#bankName').val('');
};

function showEditView(item){
  $('#createPaymentMethod').offcanvas('show');
  var item = JSON.parse(decodeURI(item))

  $('#_id').val(item._id);
  $('#paymentMethod').val(item.paymentMethod);
  $('#accountName').val(item.accountName);
  $('#accountNumber').val(item.accountNumber);
  $('#bankName').val(item.bankName);
};


function confirmDelete(e){
  Swal.fire({
   title: "Bạn muốn xoá dịch vụ này?",
   type: "info",
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Xoá'
 }).then((result) => {
  if (result.isConfirmed) {
    $.ajax({
      url: "/admin.removePaymentMethod",
      method: "POST",
      data: {
        _id: e
      }
    }).done(function(res) {
      res = res || {};
      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: 'Dịch vụ đã được xoá',
        })
        window.location.reload();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Xoá không thành công!',
        })
      }
    }).fail(function(a, b, msg) {
      Toast.fire({
        icon: 'error',
        title: 'Xoá không thành công!',
      })
    });
  }
});
};
