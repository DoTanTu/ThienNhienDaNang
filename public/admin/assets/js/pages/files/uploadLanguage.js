Dropzone.autoDiscover = false;
function removeImage(e) {
  $.ajax({
    url: '/admin.removeFile',
    method: 'POST',
    data: {
      path: e,
    },
  })
    .done(function (res) {
      res = res || {};
      if (res.success) {
      }
    })
    .fail(function (a, b, msg) {});
}

var appLanguage = new Dropzone('div#appLanguage', {
  url: '/admin.uploadFileApp',
  paramName: 'inputFiles',
  autoDiscover: false,
  addRemoveLinks: true,
  uploadMultiple: true,
  parallelUploads: 50,
  maxFiles: 1,
  timeout: 180000,
  dictDefaultMessage: 'Bạn có thể kéo ảnh hoặc click để chọn',
  dictCancelUpload: 'Cancel',
  dictRemoveFile: 'Remove',

  // The setting up of the dropzone
  init: function () {
    var myDropzone = this;
    this.on('removedfile', function (file) {
      if (file != null && file.upload != undefined) {
        removeImage(file.upload.path);
      } else {
        removeImage(file.path.replace('../', ''));
      }
    });

    myDropzone.on('sending', function (file, xhr, formData) {
      formData.append('folder', $('#folderLanguage').val());
    });

    // Listen to the sendingmultiple event. In this case, it’s the sendingmultiple event instead
    // of the sending event because uploadMultiple is set to true.
    this.on('sendingmultiple', function () {});
    this.on('successmultiple', function (files, response) {
      files[0].upload.path = response.data[0].path;
    });
    this.on('errormultiple', function (files, response) {});
  },
});
