'use strict';
var dz  = new Map();

$(document).ready(function() {
  var data = $('.eco-data')
  var imagePlus 
  if ($('#imagePlus').val()) {
    imagePlus = JSON.parse($('#imagePlus').val())
  }

  for (let index = 0; index < data.length; index++) {
    let drop = new Dropzone("div#myDropzone"+ index, {
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
        this.on("addedfile", function (file) {
          var description = file.upload.alt == undefined ? "" :  file.upload.alt;
          file._descriptionLabel = Dropzone.createElement("<span></span>")
          file._descriptionBox = Dropzone.createElement("<input id='alt_"+index+"_"+file.upload.uuid+"' style='width: 120px;' class='form-control mt-2' type='text' placeholder='Alt'  value="+description+" >");
          file.previewElement.appendChild(file._descriptionLabel);
          file.previewElement.appendChild(file._descriptionBox);
        });
    
        this.on("sendingmultiple", function () {
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

    if (imagePlus && imagePlus[index]) {
      let pathImages = imagePlus[index]
      pathImages.images.forEach((image, index) => {
        var alt = ""
        try {
          alt = pathImages.alts[index]
        } catch (error) {
          
        }
        var file = {
          "upload": {
              "uuid": index,
              "progress": 100,
              "total": 110000,
              "bytesSent": 110000,
              "filename": image,
              "path": image,
              "alt" :alt
          },
          "status": "success",
          "previewElement": {},
          "previewTemplate": {},
          "_removeLink": {},
          "accepted": true,
          "processing": true,
          "xhr": {},
          "width": 100,
          "height": 100
      }
      drop.emit("addedfile", file);
      drop.emit("thumbnail", file, "/"+image);
      drop.emit("complete", file);
      drop.files.push(file);
      });
    }
    
    $('.dz-image img').css({ width: '100px', height: 'auto' });
    dz.set(index,drop)
  }
});

function onAddItemEcomerce(){
  let dAttributes = JSON.parse($('#d-attributes').val())
  let id = $('.eco-data').length + 1
  var myvar = '<div class="row m-1 p-1 border mt-2 eco-data" id="view'+id+'">'+
  '         <div class="offcanvas-header mb-3">'+
  '           <h5 class="offcanvas-title"></h5>'+
  '           <button type="button" class="btn-close text-reset m-1" onclick="onRemoveItemEcomerce('+id+')" ></button>'+
  '         </div>'+
  '<div class="mb-3 col-12"> <div id="myDropzone'+id+'" class="dropzone"></div></div>'+
  '        <div class="mb-3 col-lg-4 col-6">'+
  '          <label class="form-label" for="e-price">Giá</label>'+
  '           <input type="text" class="form-control" id="d-price" value="" hidden  name="dprice">'+
  '          <input type="number" class="form-control" id="e-price" value=""  name="price" placeholder="">'+
  '        </div>'+
  '        <div class="mb-3 col-lg-4 col-6">'+
  '          <label class="form-label" for="e-priceSale">Giá Sale</label>'+
  '          <input type="number" class="form-control" id="e-priceSale" value=""  name="priceSale" placeholder="">'+
  '        </div>'+
  '  '+
  '        <div class="mb-3 col-lg-4 col-6">'+
  '          <label class="form-label" for="e-discount">Giá Sale</label>'+
  '          <input type="number" class="form-control" id="e-discount" value=""  name="discount" placeholder="">'+
  '        </div>'+
  '  '+
  '        <div class="mb-3 col-lg-6 col-6">'+
  '          <label class="form-label" for="e-quantity">Số Lượng</label>'+
  '          <input type="number" class="form-control" id="e-quantity" value=""  name="quantity" placeholder="">'+
  '        </div>'+
  '        <div class="mb-3 col-lg-6 col-6">'+
  '          <label class="form-label" for="e-discount">Đơn vị tính</label>'+
  '          <input type="text" class="form-control" id="d-unit" value="" hidden  name="dunit">'+
  '          <input type="text" class="form-control" id="e-unit" value=""  name="unit" placeholder="Lần / Phút / Cái / Kg ....">'+
  '        </div>'
          if (dAttributes != undefined && dAttributes != null) {
            dAttributes.forEach(function(item){
              if(item.tag != "Hashtag"){ 
  myvar = myvar +'<div class="mb-3 col-lg-6 col-6">'+
  '                <label class="form-label" for="e-discount">'+ item.name +'</label>'+
  '                  <select class="form-control " name="attribute_'+ item._id +'">'+
                    '<option value=""></option>'
                         item.values.forEach(function(x){ 
  myvar = myvar +'<option value="'+x.code+'">'+x.value+'</option>'
                          }); 
  myvar = myvar +'</select></div>'
             }});
           }
  myvar = myvar +'</div>';
  
  $("#ecommerce-content").append(myvar);  

  let drop = new Dropzone("div#myDropzone"+ id, {
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
  
      this.on("addedfile", function (file) {
        var description = file.upload.alt == undefined ? "" :  file.upload.alt;
        file._descriptionLabel = Dropzone.createElement("<span></span>")
        file._descriptionBox = Dropzone.createElement("<input id='alt_"+id+"_"+file.upload.uuid+"' style='width: 120px;' class='form-control mt-2' type='text' placeholder='Alt'  value="+description+" >");
        file.previewElement.appendChild(file._descriptionLabel);
        file.previewElement.appendChild(file._descriptionBox);
      });
  
      this.on("sendingmultiple", function () {
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
  dz.set(id,drop)
}

function onRemoveItemEcomerce(id) {
  if ($('.eco-data').length <= 1) {
    return
  }
  dz.delete(parseInt(id))
  $('#view'+id).remove()
}

