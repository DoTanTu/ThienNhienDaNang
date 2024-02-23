'use strict';
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $.fn.dataTable.ext.errMode = 'none';
  $('#messageTable').DataTable({
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
      url: '/admin/get-messages',
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
            return full['title'];
          }
        },
      },
      {
        targets: 1,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return full['content'];
          }
        },
      },
      {
        targets: 2,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return full['message'];
          }
        },
      },
      {
        targets: 3,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return full['name'];
          }
        },
      },
      {
        targets: 4,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return full['phone'];
          }
        },
      },
      {
        targets: 5,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return full['address'];
          }
        },
      },
      {
        targets: 6,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return full['email'];
          }
        },
      },
      {
        targets: 4,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return new Date(full['createdAt']).toLocaleDateString('vi-VN');
          }
        },
      },
      {
        targets: 7,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            var html =
              '<div class="dropdown">' +
              '<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>' +
              '<div class="dropdown-menu">' +
              ' <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-2"></i> Đã đọc</a>' +
              ' <a class="dropdown-item" id="' +
              full['_id'] +
              '" onclick="confirmDelete(\'' +
              full['_id'] +
              '\')"><i class="bx bx-trash me-2"></i> Xoá</a>' +
              '</div>' +
              ' </div>';
            return html;
          }
        },
      },
    ],
  });
});

function confirmDelete(e) {
  Swal.fire({
    title: 'Bạn muốn xoá tin nhắn này?',
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xoá',
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/admin.removeMessage',
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
              title: 'tin nhắn đã được xoá',
            });
            $('#messageTable').DataTable().draw();
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
