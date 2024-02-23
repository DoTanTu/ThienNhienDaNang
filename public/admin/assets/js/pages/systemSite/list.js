'use strict';
$(document).ready(function() {
       $('[data-toggle="tooltip"]').tooltip();
        $.fn.dataTable.ext.errMode = 'none';
       $('#siteTable').DataTable({
           "paging":   true,
           "ordering": false,
           "bLengthChange": false,
           "info":     true,
           "searching": false,
           "processing": true,
           "searchDelay": 500,
           "stateSave": true,
           "serverSide": true,
           "ajax": {
             "url": "/admin/get-sites",
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
                 return full['name']
              }
             },
           },
           {
            "targets": 1,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                return new Date(full['createdAt']).toLocaleDateString('vi-VN') 
             }
            },
          },
           {
             "targets": 2,
             "render": function ( data, type, full, meta ) {
               if(type === 'display'){
                 var html = '<div class="dropdown">'
                 +'<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>'
                 +'<div class="dropdown-menu">'
                 + ' <a class="dropdown-item" href="/admin/site-edit?siteId='+full['_id']+'"><i class="bx bx-edit-alt me-2"></i> Edit</a>'
                 +' <a class="dropdown-item" id="'+full['_id']+'" onclick="confirmDelete(\''+full['_id']+'\')"><i class="bx bx-trash me-2"></i> Delete</a>'
                 + '</div>'
                 +' </div>'
                return html
              }
             },
           },
         ],
       });

      //  $('#jpro-add-use-cluster').submit(function () {
      //   var options = {
      //       beforeSubmit: showRequestAddUserCluster, // pre-submit callback
      //       success: showResponseAddUserCluster// post-submit callback
      //   };
    
      //   $(this).ajaxSubmit(options);
      //   return false;
      // });

    //  var checkbox = document.getElementById("ckb-rotate");
    //  checkbox.addEventListener('change', e => {
    //       var inputRotate = document.getElementById("rotate");
    //       if(e.target.checked){
    //         inputRotate.style.display = 'block';
    //       }else{
    //         inputRotate.style.display = 'none';
    //       }
    //   });

    //  var checkbox = document.getElementById("ckb-limit-capcity");
    //  checkbox.addEventListener('change', e => {
    //       var inputRotate = document.getElementById("limitCapcity");
    //       if(e.target.checked){
    //         inputRotate.style.display = 'block';
    //       }else{
    //         inputRotate.style.display = 'none';
    //       }
    //   });
});

function confirmDelete(e){
  Swal.fire({
   title: "Bạn muốn xoá site này?",
   type: "info",
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Xoá'
 }).then((result) => {
  if (result.isConfirmed) {
    $.ajax({
      url: "/admin.removeSite",
      method: "POST",
      data: {
        _id: e
      }
    }).done(function(res) {
      res = res || {};
      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: 'site data đã được xoá',
        })
        $('#siteTable').DataTable().draw();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Xoá site không thành công!',
        })
      }
    }).fail(function(a, b, msg) {
      Toast.fire({
        icon: 'error',
        title: 'Xoá site không thành công!',
      })
    });
  }
});
};