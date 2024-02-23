'use strict';
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $('#formAttributeData').submit(function () {
    var options = {
      beforeSubmit: showRequest, // pre-submit callback
      success: showResponse, // post-submit callback
    };

    $(this).ajaxSubmit(options);
    // always return false to prevent standard browser submit and page navigation
    return false;
  });

  // pre-submit callback
  function showRequest(formData, jqForm, options) {
  }

  // post-submit callback
  function showResponse(responseText, statusText, xhr, $form) {
    if (responseText.success == true) {
      $('#createOrEditAttribute').offcanvas('hide');
      location.reload();
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Thêm thuộc tính không thành công!',
      });
    }
  }
});

function showCreateView() {
  $('#createOrEditAttribute').offcanvas('show');
  resetView();
}

function showEditView(id) {
  resetView();
  if (!id) {
    return;
  }
 
}

function resetView() {
  $('#AttributeId').val('');
  $('#name').val('');
}

function onChangeAttribute(e) {
  $('#name').val(e.value);
}

function confirmDelete(e) {
  Swal.fire({
    title: 'Bạn muốn xoá thuộc tính này?',
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xoá',
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/admin.removeAttribute',
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
              title: 'thuộc tính đã được xoá',
            });
            location.reload();
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Xoá thuộc tính không thành công!',
            });
          }
        })
        .fail(function (a, b, msg) {
          Toast.fire({
            icon: 'error',
            title: 'Xoá thuộc tính không thành công!',
          });
        });
    }
  });
}
