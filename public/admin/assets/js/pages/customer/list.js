'use strict';
$(document).ready(function() {
       $('[data-toggle="tooltip"]').tooltip();
        $.fn.dataTable.ext.errMode = 'none';
       $('#customerTable').DataTable({
           "paging":   true,
           "ordering": false,
           "bLengthChange": false,
           "info":     true,
           "searching": true,
           "processing": true,
           "searchDelay": 500,
           "stateSave": true,
           "serverSide": true,
           "ajax": {
             "url": "/admin/get-customers",
             "type": "GET",
             "datatype": "json",
             "dataSrc": function(data){
               localStorage.setItem('role', data.data.role); 
               return data.data.data;
             }
         },
         "columnDefs": [
           {
             "targets": 0,
             "render": function ( data, type, full, meta ) {
               if(type === 'display'){
                 if (full['avatar'] !== undefined && full['avatar'] != null){
                 let htmlImage =  "<ul class=\"list-unstyled d-flex align-items-center avatar-group mb-0\">"
                    +"<li data-bs-toggle=\"tooltip\" data-popup=\"tooltip-custom\" data-bs-placement=\"top\" class=\"avatar avatar-sm pull-up\">"
                    +"<img class=\"rounded-circle\" src=\"/"+full['avatar']+"\" alt=\"Avatar\">"
                    + "</li></ul>"
                  return htmlImage
                 }
                 return "<div class=\"avatar-wrapper\"><div class=\"avatar avatar-sm me-3\"><span class=\"avatar-initial rounded-circle bg-label-dark\">"+full['fullname'].charAt(0)+"</span></div></div>"
              }
             },
           },
           {
            "targets": 1,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                return full['fullname']
             }
            },
          },
           {
            "targets": 2,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                return full['email']
             }
            },
          },
          {
            "targets": 3,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                return full['phone']
             }
            },
          },
          {
            "targets": 4,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                if(full['isActive'] === true){
                  return '<span class="badge bg-label-success">Active</span>'
                }
                return '<span class="badge bg-label-warning">Pending</span>'
             }
            },
          },
          {
            "targets": 5,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                return new Date(full['createdAt']).toLocaleDateString('vi-VN') 
             }
            },
          },
           {
             "targets": 6,
             "render": function ( data, type, full, meta ) {
               if(type === 'display'){
                 var html = '<div class="dropdown">'
                if ($('#urlProfile').val()) {
                  html = html +'<a href="'+$('#urlProfile').val()+"?cus=" +full['_id']+'" target="blank"  data-bs-toggle="tooltip" class="text-body" data-bs-placement="top" aria-label="View Link" data-bs-original-title="View Link"><i class="bx bx-show mx-1"></i></a>'
                  +'<a  class="text-body" onclick="onCopyToClipboard(\''+$('#urlProfile').val()+"?cus=" +full['_id']+'\')" aria-label="Copy Link" data-bs-original-title="Copy Link"><i class="bx bx-copy mx-1"></i></a>'
                  +'<a href="/public/qr/'+full['_id']+'.png" target="blank"  data-bs-toggle="tooltip" class="text-body" data-bs-placement="top" aria-label="QR Code" data-bs-original-title="QR code"><i class="bx bx-qr mx-1"></i></a>'
                }

                html = html + '<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>'
                 +'<div class="dropdown-menu">'
                 +' <a class="dropdown-item" id="'+full['_id']+'" onclick="activeCustomer(\''+full['_id']+'\')"><i class="bx bx-user-plus me-2"></i> Active</a>'
                 
                 if (full['isBlock'] == true) {
                  html = html +
                    '<a href="#" class="text-danger dropdown-item"  onclick="lockCustomer(\'' + full['_id'] + '\',\'false\')" data-bs-toggle="tooltip"  data-bs-placement="top" aria-label="Lock" data-bs-original-title="Lock"><i class="bx bx-lock me-2"></i> UnLock</a>'
                } else {
                  html = html +
                    '<a href="#" class="text-success dropdown-item" onclick="lockCustomer(\'' + full['_id'] + '\',\'true\')" data-bs-toggle="tooltip" data-bs-placement="top" aria-label="unlock" data-bs-original-title="unlock"><i class="bx bx-lock-open me-2"></i> Lock</a>'
                }
                //  + ' <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-2"></i> Edit</a>'
                html = html +' <a class="dropdown-item" id="'+full['_id']+'" onclick="confirmDelete(\''+full['_id']+'\')"><i class="bx bx-trash me-2"></i> Delete</a>'
                 + '</div>'
                +' </div>'
                return html
              }
             },
           },
         ],
       });

       $('#formCustomerData').submit(function () {
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
          if (element.name == 'host') {
            element.value = window.location.host
          }
        });
      }
    
      // post-submit callback
      function showResponse(responseText, statusText, xhr, $form) {
          if (responseText.success == true) {
            $('#customerTable').DataTable().draw();
            $('#createCustomer').offcanvas('hide');
          }else{
            Toast.fire({
              icon: 'error',
              title: 'Thêm khách hàng không thành công!'
            })
          }
      }
});

function showCreateView(){
  $('#createCustomer').offcanvas('show');
};


function confirmDelete(e){
  Swal.fire({
   title: "Bạn muốn xoá khách hàng này?",
   type: "info",
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Xoá'
 }).then((result) => {
  if (result.isConfirmed) {
    $.ajax({
      url: "/admin.removeCustomer",
      method: "POST",
      data: {
        _id: e
      }
    }).done(function(res) {
      res = res || {};
      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: 'Khách hàng đã được xoá',
        })
        $('#customerTable').DataTable().draw();
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

function activeCustomer(e){
  Swal.fire({
   title: "Bạn muốn cho phép tk này sử dụng?",
   type: "info",
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Cho phép'
 }).then((result) => {
  if (result.isConfirmed) {
    $.ajax({
      url: "/admin.activeCustomer",
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
        $('#customerTable').DataTable().draw();
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

function lockCustomer(e, status){
  var title = ""
  if (status) {
    title = "Bạn muốn cho không phép tk này sử dụng?"
  }else{
    title = "Bạn muốn cho phép tk này sử dụng?"
  }
  Swal.fire({
   title: title,
   type: "info",
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Cho phép'
 }).then((result) => {
  if (result.isConfirmed) {
    $.ajax({
      url: "/admin.lockCustomer",
      method: "POST",
      data: {
        _id: e,
        isLock : status
      }
    }).done(function(res) {
      res = res || {};
      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: 'Thành công',
        })
        $('#customerTable').DataTable().draw();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Không thành công!',
        })
      }
    }).fail(function(a, b, msg) {
      Toast.fire({
        icon: 'error',
        title: 'Không thành công!',
      })
    });
  }
});
};


function onCopyToClipboard(e) {
  navigator.clipboard.writeText(e);
  Toast.fire({
    icon: 'success',
    title: 'Đã copy link',
  })
}
