'use strict';
$(document).ready(function() {
       $('[data-toggle="tooltip"]').tooltip();
        $.fn.dataTable.ext.errMode = 'none';
       $('#languageTable').DataTable({
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
             "url": "/admin/get-languages",
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
                return full['_id']
             }
            },
          },
           {
            "targets": 1,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                return full['name']
             }
            },
          },
          {
            "targets": 2,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                return new Date(full['createdAt']).toLocaleDateString('vi-VN') 
             }
            },
          },
           {
             "targets": 3,
             "render": function ( data, type, full, meta ) {
               if(type === 'display'){
                var html = '<div class="dropdown">'
                +'<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>'
                +'<div class="dropdown-menu">'
               +' <a class="dropdown-item" id="'+full['_id']+'" onclick="confirmDelete(\''+full['_id']+'\')"><i class="bx bx-trash me-2"></i> Delete</a>'
                + '</div>'
               +' </div>'
               return html
              }
             },
           },
         ],
       });

       $('#formLanguageData').submit(function () {
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
      }
    
      // post-submit callback
      function showResponse(responseText, statusText, xhr, $form) {
          if (responseText.success == true) {
            $('#languageTable').DataTable().draw();
            $('#createLanguage').offcanvas('hide');
          }else{
            Toast.fire({
              icon: 'error',
              title: 'Thêm Ngôn ngữ không thành công!'
            })
          }
      }
});

function showCreateView(){
  $('#createLanguage').offcanvas('show');
};


function confirmDelete(e){
  Swal.fire({
   title: "Bạn muốn xoá Ngôn ngữ này?",
   type: "info",
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Xoá'
 }).then((result) => {
  if (result.isConfirmed) {
    $.ajax({
      url: "/admin.removeLanguage",
      method: "POST",
      data: {
        _id: e
      }
    }).done(function(res) {
      res = res || {};
      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: 'Ngôn ngữ đã được xoá',
        })
        $('#LanguageTable').DataTable().draw();
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
