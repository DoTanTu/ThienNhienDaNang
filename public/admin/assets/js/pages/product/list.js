'use strict';
$(document).ready(function() {
      $('[data-toggle="tooltip"]').tooltip();
      let pageCurrent = $('#pageCurrent').val();
      let categories = getDataCategory()
      let actionEncode = $('#actions').val();
      var actions
      if (actionEncode) {
        actions =JSON.parse(decodeURI(actionEncode))
      }

      function getStatusClass(status) {
        switch (status) {
            case 'ACTIVE':
                return 'badge bg-label-success';
            case 'PENDING':
                return 'badge bg-label-warning';
            case 'DRAF':
                return 'badge bg-label-danger';
            default:
                return '';
          }
      }

      $.fn.dataTable.ext.errMode = 'none';
      let table = $('#productTable').DataTable({
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
             "url": "/admin."+pageCurrent+"/get-products",
             "type": "GET",
             "data": function ( d ) {
              return $.extend( {}, d, {
                "cateId": $('#selectCategory').val(),
              } )
             },
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
                 if (full['images'] !== undefined && full['images'] != null && full['images'].length > 0){
                 let htmlImage =  "<ul class=\"list-unstyled d-flex align-items-center avatar-group mb-0\">"
                 full['images'].forEach(element => {
                    htmlImage = htmlImage + "<li data-bs-toggle=\"tooltip\" data-popup=\"tooltip-custom\" data-bs-placement=\"top\" class=\"avatar avatar-sm pull-up\">"
                    +"<img class=\"rounded-circle\" src=\"/"+element.image+"\" alt=\"Avatar\">"
                    + "</li>"
                 });
                  htmlImage = htmlImage +"</ul>"
                  return htmlImage
                 }
                 return "<div class=\"avatar-wrapper\"><div class=\"avatar avatar-sm me-3\"><span class=\"avatar-initial rounded-circle bg-label-dark\">"+full['name'].charAt(0)+"</span></div></div>"
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
              let ids = full['categoryIds']
              if(type === 'display' && ids && categories){
                let cate = categories.filter(x => ids.includes(x._id))
                if (cate) {
                  return cate.map(x=>x.name).join('</br>')
                }
                return full['category']
             }
            },
          },
           {
            "targets": 3,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                return '<div class="' + getStatusClass(full['status']) + '">' + full['status'] + '</div>'
             }
            },
          },
           {
            "targets": 4,
            "render": function ( data, type, full, meta ) {
              if(type === 'display'){
                return new Date(full['createdAt']).toLocaleDateString('vi-VN') 
             }
            },
          },
           {
             "targets": 5,
             "render": function ( data, type, full, meta ) {
               if(type === 'display'){
                 var html = '<div class="dropdown">'
                 +'<button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="bx bx-dots-vertical-rounded"></i></button>'
                 +'<div class="dropdown-menu">'
                 + ' <a class="dropdown-item"  href="/admin.'+full['pageId']+'/edit-product?productId='+full['_id']+'"><i class="bx bx-edit-alt me-2"></i> Edit</a>'
                 if (actions != null && actions.some(x=> x == "Delete")) {
                  html = html +' <a class="dropdown-item" id="'+full['_id']+'" onclick="confirmDelete(\''+full['_id']+'\')"><i class="bx bx-trash me-2"></i> Delete</a>'
                 }
                 html = html +'</div> </div>'
                return html
              }
             },
           },
         ],
       });

       document.getElementById("productTable_filter").style.display = 'none';
       $('#searchTable').on('input',function(e){
        let that = table
        if (that.search() !== this.value) {
          that
            .search(this.value)
            .draw();
        }
       });

       $('#selectCategory').on('change', function () {
        table.draw();
      });
       
});

function getDataCategory(){
   try {
    return JSON.parse(decodeURI($('#category-data').data("category")))
  } catch (error) {
    return null
  }
}

function confirmDelete(e){
  Swal.fire({
   title: "Bạn muốn xoá bài viết này?",
   type: "info",
   showCancelButton: true,
   confirmButtonColor: '#3085d6',
   cancelButtonColor: '#d33',
   confirmButtonText: 'Xoá'
 }).then((result) => {
  if (result.isConfirmed) {
    $.ajax({
      url: "/admin.removeProduct",
      method: "POST",
      data: {
        _id: e
      }
    }).done(function(res) {
      res = res || {};
      if (res.success) {
        Toast.fire({
          icon: 'success',
          title: 'Bài viết đã được xoá',
        })
        $('#productTable').DataTable().draw();
      } else {
        Toast.fire({
          icon: 'error',
          title: 'Xoá danh thành công!',
        })
      }
    }).fail(function(a, b, msg) {
      Toast.fire({
        icon: 'error',
        title: 'Xoá danh thành công!',
      })
    });
  }
});
};
