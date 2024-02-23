'use strict';
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  $.fn.dataTable.ext.errMode = 'none';
  $('#orderTable').DataTable({
    paging: false,
    ordering: false,
    bLengthChange: false,
    info: true,
    searching: false,
    processing: true,
    searchDelay: 500,
    stateSave: true,
    serverSide: true,
    ajax: {
      url: '/order-history',
      type: 'GET',
      datatype: 'json',
      dataSrc: function (data) {
        return data.data.data;
      },
    },
    columnDefs: [
    {
        targets: 0,
        render: function (data, type, full, meta) {
            if(type === 'display'){
                if (full['images'] != undefined && full['images'] != null && full['images'].length > 0){
                let htmlImage =  "<ul class=\"list-unstyled d-flex align-items-center avatar-group mb-0\">"
                full['images'].forEach(element => {
                   htmlImage = htmlImage + "<li data-bs-toggle=\"tooltip\" data-popup=\"tooltip-custom\" data-bs-placement=\"top\" class=\"avatar avatar-sm pull-up\">"
                   +"<img class=\"rounded-circle\" src=\"/"+element.image+"\" alt=\"Avatar\">"
                   + "</li>"
                });
                 htmlImage = htmlImage +"</ul>"
                 return htmlImage
                }else if (full['ecommercePlus'] != null && full['ecommercePlus'].length > 0){
                    if (full['ecommercePlus'].images != undefined && full['ecommercePlus'].images != null && full['ecommercePlus'].images.length > 0){
                        let htmlImage =  "<ul class=\"list-unstyled d-flex align-items-center avatar-group mb-0\">"
                        full['images'].forEach(element => {
                           htmlImage = htmlImage + "<li data-bs-toggle=\"tooltip\" data-popup=\"tooltip-custom\" data-bs-placement=\"top\" class=\"avatar avatar-sm pull-up\">"
                           +"<img class=\"rounded-circle\" src=\"/"+element+"\" alt=\"Avatar\">"
                           + "</li>"
                        });
                         htmlImage = htmlImage +"</ul>"
                         return htmlImage
                    }
                }
                return "<div class=\"avatar-wrapper\"><div class=\"avatar avatar-sm me-3\"><span class=\"avatar-initial rounded-circle bg-label-dark\">"+full['name'].charAt(0)+"</span></div></div>"
             }
        },
        },
      {
        targets: 1,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return full['name'];
          }
        },
      },
      {
        targets: 2,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            return new Date(full['createdAt']).toLocaleDateString('vi-VN');
          }
        },
      },
      {
        targets: 3,
        render: function (data, type, full, meta) {
          if (type === 'display') {
            switch (full['status']) {
              case "OPEND":
              case "CONFIRMED":
                return "<span class=\"badge bg-label-info\">Chờ xử lý</span>"
              case "COMPLETED":
                return "<span class=\"badge bg-label-success\">Hoạt động</span>"
              case "CANCELLED":
                return "<span class=\"badge bg-label-danger\">Dừng</span>"
              default:
                return full['status'];
            }
          }
        },
      },
    ],
  });
});

