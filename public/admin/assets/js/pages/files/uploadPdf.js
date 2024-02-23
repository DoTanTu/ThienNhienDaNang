// const dropzoneMulti = new Dropzone('#dropzone-multi', {
//   previewTemplate: previewTemplate,
//   parallelUploads: 1,
//   maxFilesize: 5,
//   addRemoveLinks: true
// });
Dropzone.autoDiscover = false;
var pdfDropzone = new Dropzone("div#pdfDropzone", {
  url: "/uploadABC",
  paramName: "inputFiles",
  autoDiscover: false,
  addRemoveLinks: true,
  acceptedFiles:'application/pdf',
  uploadMultiple: true,
  parallelUploads: 50,
  maxFiles: 1,
  timeout: 180000,
  dictDefaultMessage: "Bạn có thể kéo tệp hoặc click để chọn",
  dictCancelUpload: "Cancel",
  dictRemoveFile: "Remove",
      
  // The setting up of the dropzone
  init: function () {
    var pdfDropzone = this;

    this.on("removedfile", function(file){
      if (file != null && file.upload != undefined) {
        removeImage(file.upload.path)
      }else{
        removeImage(file.path.replace('../',''))
      }
    });

    pdfDropzone.on("sending", function(file, xhr, formData) {
       
    });

    // Listen to the sendingmultiple event. In this case, it’s the sendingmultiple event instead
    // of the sending event because uploadMultiple is set to true.
    this.on("sendingmultiple", function () {
     
    });
    this.on("successmultiple", function (files, response) {
      if($('#avatarCustomer') != undefined){
        $('#avatarCustomer').val(response.data[0].path)
      }
      files[0].upload.path = response.data[0].path
    });
    this.on("errormultiple", function (files, response) {
    
    });
  }
});

function removeImage(e) {
  $.ajax({
    url: "/removePdf",
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
