// const dropzoneMulti = new Dropzone('#dropzone-multi', {
//   previewTemplate: previewTemplate,
//   parallelUploads: 1,
//   maxFilesize: 5,
//   addRemoveLinks: true
// });
Dropzone.autoDiscover = false;
var appImages = new Dropzone("div#appImages", {
  url: "/admin.uploadFileApp",
  paramName: "inputFiles",
  autoDiscover: false,
  addRemoveLinks: true,
  acceptedFiles:'image/*',
  uploadMultiple: true,
  parallelUploads: 50,
  maxFiles: 50,
  timeout: 180000,
  dictDefaultMessage: "Bạn có thể kéo ảnh hoặc click để chọn",
  dictCancelUpload: "Cancel",
  dictRemoveFile: "Remove",
      
  // The setting up of the dropzone
  init: function () {
    var myDropzone = this;

    this.on("removedfile", function(file){
      removeImage(file.upload.path)
    });

    myDropzone.on("sending", function(file, xhr, formData) {
      formData.append("folder", $('#folderImages').val()); 
    });

    // Listen to the sendingmultiple event. In this case, it’s the sendingmultiple event instead
    // of the sending event because uploadMultiple is set to true.
    this.on("sendingmultiple", function () {
    });
    this.on("successmultiple", function (files, response) {
      files[0].upload.path = response.data[0].path
    });
    this.on("errormultiple", function (files, response) {
    
    });
  }
});

function removeImage(e) {
  $.ajax({
    url: "/admin.removeFile",
    method: "POST",
    data: {
      path: e
    }
  }).done(function(res) {
    res = res || {};
    if (res.success) {
    
    }
  }).fail(function(a, b, msg) {
  });
}

var appCss = new Dropzone("div#appCss", {
  url: "/admin.uploadFileApp",
  paramName: "inputFiles",
  autoDiscover: false,
  addRemoveLinks: true,
  acceptedFiles:'.css, .scss',
  uploadMultiple: true,
  parallelUploads: 50,
  maxFiles: 50,
  timeout: 180000,
  dictDefaultMessage: "Bạn có thể kéo file css hoặc click để chọn",
  dictCancelUpload: "Cancel",
  dictRemoveFile: "Remove",
      
  // The setting up of the dropzone
  init: function () {
    var myDropzone = this;

    this.on("removedfile", function(file){
      removeImage(file.upload.path)
    });

    myDropzone.on("sending", function(file, xhr, formData) {
      formData.append("folder", $('#folderCss').val()); 
    });

    // Listen to the sendingmultiple event. In this case, it’s the sendingmultiple event instead
    // of the sending event because uploadMultiple is set to true.
    this.on("sendingmultiple", function () {
    });
    this.on("successmultiple", function (files, response) {
      files[0].upload.path = response.data[0].path
    });
    this.on("errormultiple", function (files, response) {
    
    });
  }
});

var appJs = new Dropzone("div#appJs", {
  url: "/admin.uploadFileApp",
  paramName: "inputFiles",
  autoDiscover: false,
  acceptedFiles:'.js, .json',
  addRemoveLinks: true,
  uploadMultiple: true,
  parallelUploads: 50,
  maxFiles: 50,
  timeout: 180000,
  dictDefaultMessage: "Bạn có thể file js hoặc click để chọn",
  dictCancelUpload: "Cancel",
  dictRemoveFile: "Remove",
      
  // The setting up of the dropzone
  init: function () {
    var myDropzone = this;

    this.on("removedfile", function(file){
      removeImage(file.upload.path)
    });

    myDropzone.on("sending", function(file, xhr, formData) {
      formData.append("folder", $('#folderJs').val()); 
    });

    // Listen to the sendingmultiple event. In this case, it’s the sendingmultiple event instead
    // of the sending event because uploadMultiple is set to true.
    this.on("sendingmultiple", function () {
    });
    this.on("successmultiple", function (files, response) {
      files[0].upload.path = response.data[0].path
    });
    this.on("errormultiple", function (files, response) {
    
    });
  }
});

var appFont = new Dropzone("div#appFont", {
  url: "/admin.uploadFileApp",
  paramName: "inputFiles",
  autoDiscover: false,
  addRemoveLinks: true,
  uploadMultiple: true,
  parallelUploads: 50,
  maxFiles: 50,
  timeout: 180000,
  dictDefaultMessage: "Bạn có thể file js hoặc click để chọn",
  dictCancelUpload: "Cancel",
  dictRemoveFile: "Remove",
      
  // The setting up of the dropzone
  init: function () {
    var myDropzone = this;

    this.on("removedfile", function(file){
      removeImage(file.upload.path)
    });

    myDropzone.on("sending", function(file, xhr, formData) {
      formData.append("folder", $('#folderFont').val()); 
    });

    // Listen to the sendingmultiple event. In this case, it’s the sendingmultiple event instead
    // of the sending event because uploadMultiple is set to true.
    this.on("sendingmultiple", function () {
    });
    this.on("successmultiple", function (files, response) {
      files[0].upload.path = response.data[0].path
    });
    this.on("errormultiple", function (files, response) {
    
    });
  }
});

var appLogo = new Dropzone("div#appLogo", {
  url: "/admin.uploadFileApp",
  paramName: "inputFiles",
  autoDiscover: false,
  addRemoveLinks: true,
  uploadMultiple: true,
  parallelUploads: 50,
  maxFiles: 1, 
  timeout: 180000,
  dictDefaultMessage: "Bạn có thể kéo ảnh hoặc click để chọn",
  dictCancelUpload: "Cancel",
  dictRemoveFile: "Remove",
      
  // The setting up of the dropzone
  init: function () {
    var myDropzone = this;

    this.on("removedfile", function(file){
      removeImage(file.upload.path)
    });

    myDropzone.on("sending", function(file, xhr, formData) {
      formData.append("folder", $('#folderLogo').val()); 
    });

    // Listen to the sendingmultiple event. In this case, it’s the sendingmultiple event instead
    // of the sending event because uploadMultiple is set to true.
    this.on("sendingmultiple", function () {
    });
    this.on("successmultiple", function (files, response) {
      files[0].upload.path = response.data[0].path
    });
    this.on("errormultiple", function (files, response) {
    
    });
  }
});