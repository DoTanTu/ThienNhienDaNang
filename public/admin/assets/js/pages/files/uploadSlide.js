Dropzone.autoDiscover = false;
if (document.getElementById("slideDropzone") != null) {
var slideDropzone = new Dropzone("div#slideDropzone", {
  url: "/admin.uploadSlide",
  paramName: "slideFile",
  autoDiscover: false,
  addRemoveLinks: true,
  uploadMultiple: true,
  acceptedFiles: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  parallelUploads: 50,
  maxFiles: 2,
  timeout: 180000,
  dictDefaultMessage: "Bạn có thể kéo tệp hoặc click để chọn",
  dictCancelUpload: "Cancel",
  dictRemoveFile: "Remove",

  init: function () {
    var slideDropzone = this;

    this.on("removedfile", function(file){
      if (file != null && file.upload != undefined) {
        removeSlide(file.upload.path)
      }else{
        removeSlide(file.path.replace('../',''))
      }
    });

    slideDropzone.on("sending", function(file, xhr, formData) {
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

function removeSlide(e) {
  $.ajax({
    url: "/admin.removeSlide",
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
