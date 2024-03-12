'use strict';
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $.fn.dataTable.ext.errMode = 'none';
  $('#contributeTable').DataTable({
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
      url: '/admin/get-contributes',
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
            return new Date(full['createdAt']).toLocaleString('vi-VN').replace(/ /g,  ' ||  ');
          }
        },
      },
      {
        targets: 1,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            if(full['type'] === 'image'){
              return 'Hình ảnh';
            }else if (full['type'] === 'video'){
              return 'Video';
            }else{
              return 'Tài liệu';
            }
          }
        },
      },
      {
        targets: 2,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return full.files.length;
          }
        },
      },
      {
        targets: 3,
        render: function (data, type, full, meta) {
          if (type === 'display') {
             return full['customer']['fullname'];
          }
        },
      },
      {
        targets: 4,
        render: function (data, type, full, meta) {
          if (type === 'display') {
             return full['customer']['phone'];
          }
        },
      },
      {
        targets: 5,
        render: function (data, type, full, meta) {
          if (type === 'display') {
             return full['customer']['email'];
          }
        },
      },
      {
        targets: 6,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            var html =
              '<div class="dropdown">' +
              '<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>' +
              '<div class="dropdown-menu">' +
              ' <a class="dropdown-item" id="'+full['_id']+'" href="/admin.contribute/edit-contribute?contributeId='+full['_id']+'"><i class="bx bx-check me-2"></i> Xem</a>' +
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
            $('#contributeTable').DataTable().draw();
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
