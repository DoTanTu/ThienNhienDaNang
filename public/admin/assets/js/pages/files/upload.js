
Dropzone.autoDiscover = false;
if (document.getElementById("myDropzone") != null) {
  var myDropzone = new Dropzone("div#myDropzone", {
    url: "/admin.uploadFile",
    paramName: "inputFiles",
    autoDiscover: false,
    addRemoveLinks: true,
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

      // First change the button to actually tell Dropzone to process the queue.
      // const element = document.getElementById("submit");
      // element.addEventListener("click", function (e) {
      //   // Make sure that the form isn’t actually being sent.
      //   e.preventDefault();
      //   e.stopPropagation();
      //   myDropzone.processQueue();
      // });

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

      this.on("addedfile", function (file) {

        var description = file.upload.alt == undefined ? "" :  file.upload.alt;
        var author = file.upload.author == undefined ? "" :  file.upload.author;
        var time = file.upload.year == undefined ? "" :  file.upload.year;
        var address = file.upload.address == undefined ? "" :  file.upload.address;
        var showTopImage = file.upload.showTopImage == undefined ? false :  file.upload.showTopImage;


        var checkboxHtml =
          "<input type='checkbox' id='showTop_" + file.upload.uuid + "' class='form-check-input d-block'";
          if (showTopImage) {
            checkboxHtml += " checked"; 
          }
          checkboxHtml += "></div>";

        file._descriptionLabel = Dropzone.createElement("<span></span>");
        file._descriptionBox = Dropzone.createElement("<input id='alt_"+file.upload.uuid+"' style='width: 120px;' class='form-control mt-2' type='text' placeholder='Alt' value='"+description+"'>");
        file._timeBox = Dropzone.createElement("<input id='time_"+file.upload.uuid+"' style='width: 120px;' class='form-control mt-2' type='text' placeholder='Thời gian' value='"+time+"'>");
        file._addressBox = Dropzone.createElement("<input id='address_"+file.upload.uuid+"' style='width: 120px;' class='form-control mt-2' type='text' placeholder='Địa điểm' value='"+address+"'>");
        file._showTopImage = Dropzone.createElement("<div class='form-control form-check ps-2 d-flex justify-content-between align-items-center mt-4'><div>showTop</div>" + checkboxHtml);

        file.previewElement.appendChild(file._showTopImage);
        file.previewElement.appendChild(file._descriptionLabel);
        file.previewElement.appendChild(file._descriptionBox);
        file.previewElement.appendChild(file._timeBox);
        file.previewElement.appendChild(file._addressBox);
      });
      this.on("successmultiple", function (files, response) {
        if(files != null && files.length > 0) {
          for (let index = 0; index < files.length; index++) {
            files[index].upload.path = response.data[index].path
          }
        }
      });
      this.on("errormultiple", function (files, response) {
      
      });
    }
  });
}

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

if (document.getElementById("myDropzoneVideo") != null) {
var myDropzoneVideo = new Dropzone("div#myDropzoneVideo", {
  url: "/admin.uploadFile",
  paramName: "inputFiles",
  autoDiscover: false,
  addRemoveLinks: true,
  parallelUploads: 1,
  maxFiles: 1,
  timeout: 180000,
  dictDefaultMessage: "Bạn có thể kéo ảnh hoặc click để chọn",
  dictCancelUpload: "Cancel",
  dictRemoveFile: "Remove",
      
  // The setting up of the dropzone
  init: function () {
    var myDropzone = this;
    this.on("removedfile", function(file){
      removeVideo(file.upload.path)
    });

    myDropzone.on("sending", function(file, xhr, formData) {
      formData.append("page", $('#pageName').val()); 
    });

    this.on("sendingmultiple", function () {
    });
    this.on("successmultiple", function (files, response) {
      files[0].upload.path = response.data[0].path
    });
    this.on("errormultiple", function (files, response) {
    
    });
  }
});
}

function removeVideo(e) {
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