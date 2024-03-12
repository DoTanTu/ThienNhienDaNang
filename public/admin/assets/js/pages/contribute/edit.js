'use strict';
function confirmDelete(e) {
    Swal.fire({
      title: 'Bạn muốn xoá "Đóng góp" này của người dùng',
      type: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Xoá',
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
          url: '/admin.removeContribute',
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
                title: 'Xóa thành công',
              });
              window.location.href= '/admin/contributes';
            } else {
              Toast.fire({
                icon: 'error',
                title: 'Xóa không thành công',
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
  