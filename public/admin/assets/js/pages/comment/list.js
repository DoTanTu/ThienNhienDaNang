'use strict';
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $.fn.dataTable.ext.errMode = 'none';
  $('#commentTable').DataTable({
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
      url: '/admin/get-comments',
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
            return full['products'][0]['name'];
          }
        },
      },
      {
        targets: 1,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return full['text'];
          }
        },
      },
      {
        targets: 2,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return full['users']['username'];;
          }
        },
      },
      {
        targets: 3,
        render: function (data, type, full, meta) {
          if (type === 'display') {
             return new Date(full['createdAt']).toLocaleDateString('vi-VN');
          }
        },
      },
      {
        targets: 4,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            var html =
              '<div class="dropdown">' +
              '<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>' +
              '<div class="dropdown-menu">' +
              ' <a class="dropdown-item" id="'+full['_id']+'" onclick="activeComment(\''+full['_id']+'\')" ><i class="bx bx-check me-2"></i> Chấp thuận</a>' +
              ' <a class="dropdown-item" id="' +
              full['_id'] +
              '" onclick="confirmDelete(\'' +
              full['_id'] +
              '\')"><i class="bx bx-trash me-2"></i> Từ chối</a>' +
              '</div>' +
              ' </div>';
            return html;
          }
        },
      },
    ],
  });
});

function activeComment(e){
  Swal.fire({
   title: "Bạn muốn cho phép bình luận này hiên thị không?",
   type: "info",
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Cho phép'
 }).then((result) => {
  if (result.isConfirmed) {
    $.ajax({
      url: "/admin.activeComment",
      method: "POST",
      data: {
        _id: e
      }
    }).done(function(res) {
      res = res || {};
      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: 'Thành công',
        })
        $('#commentTable').DataTable().draw();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Không thành công!',
        })
      }
    }).fail(function(a, b, msg) {
      Toast.fire({
        icon: 'error',
        title: 'Kkhông thành công!',
      })
    });
  }
});
};

function confirmDelete(e) {
  Swal.fire({
    title: 'Bạn muốn xoá bình luận này ?',
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xoá',
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/admin.removeComment',
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
              title: 'Bình luận đã được xoá',
            });
            $('#commentTable').DataTable().draw();
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
