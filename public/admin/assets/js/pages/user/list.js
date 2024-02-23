'use strict';
$(document).ready(function() {
       $('[data-toggle="tooltip"]').tooltip();
        $.fn.dataTable.ext.errMode = 'none';
       $('#userTable').DataTable({
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
             "url": "/admin/get-users",
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
                 if (full['avatar']){
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
                return full['username']
             }
            },
          },
          {
            "targets": 3,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                return full['email']
             }
            },
          },
          {
            "targets": 4,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                return  full['role']
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
                 +'<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>'
                 +'<div class="dropdown-menu">'
                 + ' <a class="dropdown-item" href="javascript:void(0);"><i class="bx bx-edit-alt me-2"></i> Edit</a>'
                +' <a class="dropdown-item" id="'+full['_id']+'" onclick="confirmDelete(\''+full['_id']+'\')"><i class="bx bx-trash me-2"></i> Delete</a>'
                 + '</div>'
                +' </div>'
                return html
              }
             },
           },
         ],
       });

       $('#formUserData').submit(function () {
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
            $('#userTable').DataTable().draw();
            $('#createUser').offcanvas('hide');
          }else{
            Toast.fire({
              icon: 'error',
              title: 'Thêm User không thành công!'
            })
          }
      }
});

function showCreateView(){
  $('#createUser').offcanvas('show');
};


function confirmDelete(e){
  Swal.fire({
   title: "Bạn muốn xoá User này?",
   type: "info",
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Xoá'
 }).then((result) => {
  if (result.isConfirmed) {
    $.ajax({
      url: "/admin.removeUser",
      method: "POST",
      data: {
        _id: e
      }
    }).done(function(res) {
      res = res || {};
      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: 'User đã được xoá',
        })
        $('#userTable').DataTable().draw();
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
