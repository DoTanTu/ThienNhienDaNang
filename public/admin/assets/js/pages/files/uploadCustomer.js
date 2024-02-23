// const dropzoneMulti = new Dropzone('#dropzone-multi', {
//   previewTemplate: previewTemplate,
//   parallelUploads: 1,
//   maxFilesize: 5,
//   addRemoveLinks: true
// });
Dropzone.autoDiscover = false;
var myDropzone = new Dropzone("div#myDropzone", {
  url: "/uploadAvatar",
  paramName: "inputFiles",
  autoDiscover: false,
  addRemoveLinks: true,
  acceptedFiles:'image/*',
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
      if (file != null && file.upload != undefined) {
        removeImage(file.upload.path)
      }else{
        removeImage(file.path.replace('../',''))
      }
    });

    myDropzone.on("sending", function(file, xhr, formData) {
      formData.append("page", $('#pageName').val()); 
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
    url: "/removeAvatar",
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
