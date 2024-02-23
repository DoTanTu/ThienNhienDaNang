'use strict';
$(document).ready(function () {
  $('[data-toggle="tooltip"]').tooltip();
  let pageCurrent = $('#pageCurrent').val();
  $.fn.dataTable.ext.errMode = 'none';

  $('#formAttributeDetailData').submit(function () {
    var options = {
      beforeSubmit: showRequest, // pre-submit callback
      success: showResponse, // post-submit callback
    };

    $(this).ajaxSubmit(options);
    return false;
  });

  // pre-submit callback
  function showRequest(formData, jqForm, options) {
    var dataImages = myDropzone.files.map((x) => x.upload.path);
    formData.forEach((element) => {
      if (element.name == 'images') {
        element.value = JSON.stringify(dataImages);
      }
    });
  }

  // post-submit callback
  function showResponse(responseText, statusText, xhr, $form) {
    if (responseText.success == true) {
      location.reload();
      $('#createOrEditDetailAttribute').offcanvas('hide');
    } else {
      Toast.fire({
        icon: 'error',
        title: 'Thêm thuộc tính không thành công!',
      });
    }
  }
});

function showCreateViewDetail(e) {
  $('#createOrEditDetailAttribute').offcanvas('show');
  let data = JSON.parse(decodeURI($('#attribute-'+ e).data("attribute")))
  $('#detailAttributeId').val(data._id)
  $('#values').val(JSON.stringify(data.values))
  $("#detail-code").removeAttr("disabled");
  $('#detail-code').val("")
  $('#detail-value').val("")
  if (myDropzone) {
    myDropzone.removeAllFiles();
    $('.dz-preview').empty();
  }
}

function onEditValue(e, code, name, image) {
  $('#createOrEditDetailAttribute').offcanvas('show');
  let data = JSON.parse(decodeURI($('#attribute-'+ e).data("attribute")))
  $('#detailAttributeId').val(data._id)
  $('#values').val(JSON.stringify(data.values))
  $('#detail-code').val(code)
  $('#detail-value').val(name)
  var images = JSON.parse(decodeURI(image))
  if (myDropzone && images && images.length > 0) {
    images.forEach((path, index) => {
      var file = {
        upload: {
          uuid: index,
          progress: 100,
          total: 110000,
          bytesSent: 110000,
          filename: path,
          path: path,
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
}

function onRemoveValue(e, c) {
  let data = JSON.parse(decodeURI($('#attribute-'+ e).data("attribute")))

  Swal.fire({
    title: 'Bạn muốn xoá giá trị này?',
    type: 'info',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Xoá',
  }).then((result) => {
    if (result.isConfirmed) {
      $.ajax({
        url: '/admin.removeDetailAttribute',
        method: 'POST',
        data: {
          detailAttributeId: e,
          code : c,
          values : JSON.stringify(data.values)
        },
      })
        .done(function (res) {
          res = res || {};
          if (res.success) {
            Toast.fire({
              icon: 'success',
              title: 'Đã được xoá',
            });
            location.reload();
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
