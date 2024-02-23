// const dropzoneMulti = new Dropzone('#dropzone-multi', {
//   previewTemplate: previewTemplate,
//   parallelUploads: 1,
//   maxFilesize: 5,
//   addRemoveLinks: true
// });
Dropzone.autoDiscover = false;
var appImages = new Dropzone('div#appZip', {
  url: '/admin.uploadFileApp',
  paramName: 'inputFiles',
  autoDiscover: false,
  addRemoveLinks: true,
  acceptedFiles: '.zip',
  uploadMultiple: true,
  parallelUploads: 10,
  maxFiles: 10,
  timeout: 180000,
  dictDefaultMessage: 'Bạn có thể file hoặc click để chọn',
  dictCancelUpload: 'Cancel',
  dictRemoveFile: 'Remove',

  // The setting up of the dropzone
  init: function () {
    var myDropzone = this;

    this.on('removedfile', function (file) {
      removeImage(file.upload.path);
    });

    myDropzone.on('sending', function (file, xhr, formData) {
      formData.append('folder', '');
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

var appLogo = new Dropzone('div#appLogo', {
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

    const logo = document.getElementById('logoFile').attributes['src'];
    if (logo && logo.value) {
      var file = {
        upload: {
          uuid: logo.value,
          progress: 100,
          total: 110000,
          bytesSent: 110000,
          filename: logo.value,
          path: logo.value,
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
      myDropzone.emit('thumbnail', file, '/' + logo.value);
      myDropzone.emit('complete', file);
      myDropzone.files.push(file);
      $('.dz-image img').css({ width: '100px', height: 'auto' });
    }

    this.on('removedfile', function (file) {
      if (file != null && file.upload != undefined) {
        removeImage(file.upload.path);
      } else {
        removeImage(file.path.replace('../', ''));
      }
    });

    myDropzone.on('sending', function (file, xhr, formData) {
      formData.append('folder', $('#folderLogo').val());
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
