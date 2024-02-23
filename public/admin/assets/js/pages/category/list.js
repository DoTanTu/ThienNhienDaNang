'use strict';
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();

  let actionEncode = $('#actions').val();
  var actions
  if (actionEncode) {
    actions =JSON.parse(decodeURI(actionEncode))
  }

  let pageCurrent = $('#pageCurrent').val();
  $.fn.dataTable.ext.errMode = 'none';
  let table = $('#categoryTable').DataTable({
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
      url: '/admin.' + pageCurrent + '/get-categories',
      type: 'GET',
      data: function (d) {
        return $.extend({}, d, {
          hl: $('#selectLanguage').val(),
        });
      },
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
            if (
              full['images'] !== undefined &&
              full['images'] != null &&
              full['images'].length > 0
            ) {
              let htmlImage =
                '<ul class="list-unstyled d-flex align-items-center avatar-group mb-0">';
              full['images'].forEach((element) => {
                htmlImage =
                  htmlImage +
                  '<li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" class="avatar avatar-sm pull-up">' +
                  '<img class="rounded-circle" src="/' +
                  element +
                  '" alt="Avatar">' +
                  '</li>';
              });
              htmlImage = htmlImage + '</ul>';
              return htmlImage;
            }
            return (
              '<div class="avatar-wrapper"><div class="avatar avatar-sm me-3"><span class="avatar-initial rounded-circle bg-label-dark">' +
              full['name'].charAt(0) +
              '</span></div></div>'
            );
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
            switch (full['level']) {
              case '':
              case '0':
                return '<span class="badge  bg-label-primary m-1">Menu Gốc</span>'
              case '1':
              return '<span class="badge  bg-label-success m-1">Menu Bậc : ' +
                full['level'] +
                '</span>'
              case '2':
                return (
                  '<span class="badge  bg-label-info m-1">Menu Bậc : ' +
                  full['level'] +
                  '</span>'
                );
              case '3':
                return '<span class="badge  bg-label-warning m-1">Menu Bậc : ' +
                  full['level'] +
                  '</span>'
              default:
                return '<span class="badge  bg-label-danger m-1">Menu Bậc : ' +
                full['level'] +
                '</span>'
            }
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
              '<input type="text" class="form-control" id="data-' +
              full['_id'] +
              '" hidden value="\'' +
              encodeURI(JSON.stringify(full)) +
              '\'">' +
              '<a class="dropdown-item" onclick="showEditView(\'' +
              full['_id'] +
              '\')"><i class="bx bx-edit-alt me-2"></i> Edit</a>'
             if (actions != null && actions.some(x=> x == "Delete")) {
              html = html +  ' <a class="dropdown-item" id="' +
              full['_id'] +
              '" onclick="confirmDelete(\'' +
              full['_id'] +
              '\')"><i class="bx bx-trash me-2"></i> Delete</a>' 
             }
             html = html +  '</div></div>';
            return html;
          }
        },
      },
    ],
  });

  document.getElementById('categoryTable_filter').style.display = 'none';
  $('#searchTable').on('input', function (e) {
    let that = table;
    if (that.search() !== this.value) {
      that.search(this.value).draw();
    }
  });

  $('#selectLanguage').on('change', function () {
    table.draw();
  });

  $('#formCategoryData').submit(function () {
    var options = {
      beforeSubmit: showRequest, // pre-submit callback
      success: showResponse, // post-submit callback
    };

    $(this).ajaxSubmit(options);
    // always return false to prevent standard browser submit and page navigation
    return false;
  });

  // pre-submit callback
  function showRequest(formData, jqForm, options) {
    var dataImages = myDropzone.files.map((x) => x.upload.path);
    var dataAlts = [];
    try {
      dataAlts = myDropzone.files.map(x => $('#alt_'+x.upload.uuid).val())
    } catch (error){
    }
    formData.forEach((element) => {
      if (element.name == 'images') {
        element.value = JSON.stringify(dataImages);
      }
      if (element.name == 'alts') {
        element.value = JSON.stringify(dataAlts)
      }
      if (element.name == 'parents') {
        element.value = treeCategory.getIdChecked();
      }
      if (element.name == 'level' && treeCategory.getLevel() != '-1') {
        element.value = treeCategory.getLevel();
      }
    });
  }

  // post-submit callback
  function showResponse(responseText, statusText, xhr, $form) {
    if (responseText.success == true) {
      location.reload()
      $('#CreateOrEditCategory').offcanvas('hide');
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Thêm danh mục không thành công!',
      });
    }
  }
});

function showCreateView() {
  $('#CreateOrEditCategory').offcanvas('show');
  let categories = JSON.parse(decodeURI($('#dataCategory').val()));
  if (categories != null && categories.length > 0) {
    $('#treeCategoryView').empty();
    treeCategory.createTreeCategory(categories);
  }
  resetView();
  document.getElementById('view-language').style.display = 'none';
}

function showEditView(id) {
  document.getElementById('view-language').style.display = 'block';
  resetView();
  if (!id) {
    return;
  }
  let data = JSON.parse(decodeURI($('#data-' + id).val()).replaceAll("'", ''));//JSON.parse(dataString.replaceAll('\\', '"').replaceAll("'", ''));
  $('#CreateOrEditCategory').offcanvas('show');
  let categories = JSON.parse(decodeURI($('#dataCategory').val()));
  if (categories != null && categories.length > 0) {
    $('#treeCategoryView').empty();
    treeCategory.createTreeCategory(categories, data['_id'], data['parents']);
  }
  $('#cateId').val(data['_id']);
  $('#level').val(data['level']);
  $('#name').val(data['name']);
  $('#languages').val(JSON.stringify(data['languages']));
  $('#cbShowTop').prop('checked', data['showTop'] == true);
  $('#desc').val(data['desc']);

  let alts = data['alts'];

  if (myDropzone && data['images'] && data['images'].length > 0) {
    data['images'].forEach((path, index) => {
      var alt = "";
      try {
        alt = alts[index]
      } catch (error) {
        
      }
      var file = {
        upload: {
          uuid: index,
          progress: 100,
          total: 110000,
          bytesSent: 110000,
          filename: path,
          path: path,
          alt : alt
        },
        status: 'success',
        previewElement: {},
        previewTemplate: {},
        _removeLink: {},
        accepted: true,
        processing: true,
        xhr: {},
        width: 100,
        height: 100,
      };

      // var image =  {name : "image" , size : 110000, path : "/"+path}
      myDropzone.emit('addedfile', file);
      myDropzone.emit('thumbnail', file, '/' + path);
      myDropzone.emit('complete', file);
      myDropzone.files.push(file);
    });
  }

  $('#seo-title').val(data['seoTitle']);
  $('#seo-name').val(data['seoName']);
  $('#seo-key').val(data['seoKeyWord']);
  $('#seo-desc').val(data['seoDesc']);
}

function resetView() {
  if (myDropzone) {
    myDropzone.removeAllFiles();
    $('.dz-preview').empty();
  }
  $('#cateId').val('');
  $('#name').val('');
  $('#level').val('');
  $('#cbShowTop').prop('checked', false);
  $('#desc').val('');
  $('#seo-title').val('');
  $('#seo-name').val('');
  $('#seo-key').val('');
  $('#seo-desc').val('');
}

function onChangeLanguage(e) {
  if (e.value === undefined || e.value === '') {
    let dataString = $('#data-' + $('#cateId').val()).val();
    let data = JSON.parse(dataString.replaceAll('\\', '"').replaceAll("'", ''));
    $('#name').val(data['name']);
    $('#desc').val(data['desc']);
    $('#seo-title').val(data['seoTitle']);
    $('#seo-name').val(data['seoName']);
    $('#seo-key').val(data['seoKeyWord']);
    $('#seo-desc').val(data['seoDesc']);
    return;
  }
  let dataLangaugeJson = $('#languages').val();
  if (dataLangaugeJson) {
    let languages = JSON.parse(dataLangaugeJson);
    if (languages && languages.length > 0) {
      languages.forEach((item) => {
        if (item.code == e.value) {
          $('#name').val(item.name);
          $('#desc').val(item.desc);
          $('#seo-title').val(item.seoTitle);
          $('#seo-name').val(item.seoName);
          $('#seo-key').val(item.seoKeyWord);
          $('#seo-desc').val(item.seoDesc);
          return;
        }
      });
    }
  }
}

function confirmDelete(e) {
  Swal.fire({
    title: 'Bạn muốn xoá danh mục này?',
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xoá',
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/admin.removeCategory',
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
              title: 'Danh mục đã được xoá',
            });
            $('#categoryTable').DataTable().draw();
          } else {
            Toast.fire({
              icon: 'error',
              title: 'Xoá danh mục không thành công!',
            });
          }
        })
        .fail(function (a, b, msg) {
          Toast.fire({
            icon: 'error',
            title: 'Xoá danh mục không thành công!',
          });
        });
    }
  });
}
