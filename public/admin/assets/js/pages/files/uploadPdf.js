//Upload file PDF and just upload a file
Dropzone.autoDiscover = false;
if (document.getElementById("pdfDropzone") != null) {
var pdfDropzone = new Dropzone("div#pdfDropzone", {
  url: "/admin.uploadPDF",
  paramName: "pdfFile",
  autoDiscover: false,
  addRemoveLinks: true,
  uploadMultiple: true,
  acceptedFiles:'application/pdf',
  parallelUploads: 50,
  maxFiles: 2,
  timeout: 180000,
  dictDefaultMessage: "Bạn có thể kéo tệp hoặc click để chọn",
  dictCancelUpload: "Cancel",
  dictRemoveFile: "Remove",
      
  // The setting up of the dropzone
  init: function () {
    var pdfDropzone = this;

    this.on("removedfile", function(file){
      if (file != null && file.upload != undefined) {
        removePdf(file.upload.path)
      }else{
        removePdf(file.path.replace('../',''))
      }
    });

    pdfDropzone.on("sending", function(file, xhr, formData) {
      formData.append("page", $('#pageNames').val()); 
    });

    this.on("sendingmultiple", function () {
    });

    this.on("addedfile", function (file) {
    });
    this.on("successmultiple", function (files, response) {

      files[0].upload.path = response.data[0].path
    });
    this.on("errormultiple", function (files, response) {
    });
  }
});
}

function removePdf(e) {
  $.ajax({
    url: "/admin.removePdf",
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