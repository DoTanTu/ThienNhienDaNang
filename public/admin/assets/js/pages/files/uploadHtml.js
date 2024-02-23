Dropzone.autoDiscover = false;
var appHtml = new Dropzone("div#appHtml", {
  url: "/admin.uploadFileEjs",
  paramName: "inputFiles",
  autoDiscover: false,
  addRemoveLinks: true,
  uploadMultiple: true,
  parallelUploads: 50,
  maxFiles: 50,
  timeout: 180000,
  dictDefaultMessage: "Bạn có thể kéo file hoặc click để chọn",
  dictCancelUpload: "Cancel",
  dictRemoveFile: "Remove",
      
  // The setting up of the dropzone
  init: function () {
    var myDropzone = this;

    this.on("removedfile", function(file){
      removeImage(file.upload.path)
    });

    myDropzone.on("sending", function(file, xhr, formData) {
      formData.append("folder", $('#folderHtml').val()); 
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
