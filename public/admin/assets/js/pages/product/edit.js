'use strict';
var dName;
var dDesShort;
var dDescription;
var dSeoTitle;
var dSeoName;
var dSeoKey;
var dSeoDesc;
var dPrice;
var dUnit;
var dDescriptionPlus;

$(document).ready(function() {
    dName = $('#name').val();
    dDesShort = $('#desShort').val();
    dDescription =$('#description').val()
    dSeoTitle = $('#seo-title').val();
    dSeoName = $('#seo-name').val();
    dSeoKey = $('#seo-key').val();
    dSeoDesc = $('#seo-desc').val();
    dPrice = $('#e-price').val();
    dUnit = $('#e-unit').val();

    var editor = CKEDITOR.instances['editor1'];
    if (editor && $('#description').val()) {
      editor.setData($('#description').val());
    }
   
    let deDesc = decodeURI($('#descriptionPlus').val())
    if (deDesc != 'undefined' && deDesc != null && deDesc != "") {
      dDescriptionPlus = JSON.parse(deDesc)
    }

    var input = document.querySelector('input[name="input-custom-dropdown"]')
    let hashtags = decodeURI($('#hashtag').data("hashtags"))
    let dataHastag = []
    if (hashtags != 'undefined' && hashtags != null && hashtags != "") {
      dataHastag = JSON.parse(hashtags)
    }
    var tagify = new Tagify(input, {
      whitelist: dataHastag,
      maxTags: 10,
      dropdown: {
        maxItems: 20,           // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0,             // <- show suggestions on focus
        closeOnSelect: false    // <- do not hide the suggestions dropdown once an item has been selected
      }
    });

    if (treeCategory) {
      var cateIds = $('#category').val()
      if (cateIds) {
        cateIds = JSON.parse(cateIds)
      }else{
        cateIds = null
      }
      treeCategory.createTree(JSON.parse(decodeURI(categories)), cateIds)
    }

    let imageString = $("#images").val();
    if (imageString) {
      let images = JSON.parse($("#images").val());
      if (myDropzone && images) {
        images.forEach((image, index) => {
          var file = {
            upload: {
              uuid: index,
              progress: 100,
              total: 110000,
              bytesSent: 110000,
              filename: image.name,
              path: image.image,
              alt: image.alt,
              author: image.author,
              year: image.year,
              address: image.address,
            },
            status: "success",
            previewElement: {},
            previewTemplate: {},
            _removeLink: {},
            accepted: true,
            processing: true,
            xhr: {},
            width: 100,
            height: 100
          };
          // var image =  {name : "image" , size : 110000, path : "/"+path}
          file.upload.uuid = index;
          myDropzone.emit("addedfile", file);
          myDropzone.emit("thumbnail", file, "/" + image.image);
          myDropzone.emit("complete", file);
          myDropzone.files.push(file);
          $(".dz-image img").css({ width: "100px", height: "auto" });
        });
      }
    }

    
    var pdfUrl = $("#pdf_file").val();
    if (pdfDropzone && pdfUrl) {
      // Tạo một file giả để hiển thị thông tin PDF trên Dropzone
      var pdfFile = {
        upload: {
          uuid: 0,
          progress: 100,
          total: 1000000, // Thay đổi giá trị này tùy thuộc vào kích thước của PDF
          bytesSent: 1000000,
          filename: "khong ten",
          path: pdfUrl
        },
        status: "success",
        previewElement: {},
        previewTemplate: {},
        _removeLink: {},
        accepted: true,
        processing: true,
        xhr: {},
        width: 100,
        height: 100
      };

      // Thiết lập uuid của tệp PDF
      pdfFile.upload.uuid = 0;

      // Gửi các sự kiện của Dropzone để hiển thị tệp PDF
      pdfDropzone.emit("addedfile", pdfFile);
      pdfDropzone.emit("thumbnail", pdfFile, "../public/admin/assets/img/background_pdf.png");
      pdfDropzone.emit("complete", pdfFile);
      pdfDropzone.files.push(pdfFile);
      $(".dz-image img").css({ width: "100px", height: "auto" });
    }


    $('#formProductData').submit(function () {
      var options = {
          beforeSubmit: showRequest, // pre-submit callback
          success: showResponse // post-submit callback
      };
  
      $(this).ajaxSubmit(options);
      // always return false to prevent standard browser submit and page navigation
      return false;
    });
  
    // pre-submit callback
    function showRequest(formData, jqForm, options) {
      var dataImages = []
      if (myDropzone) {
        try {
          if (myDropzone.files && myDropzone.files.length > 0) {
            myDropzone.files.forEach(x => {
              dataImages.push({
                image: x.upload.path,
                alt : $('#alt_'+x.upload.uuid).val(),
                author : $('#author_'+x.upload.uuid).val(),
                year : $('#time_'+x.upload.uuid).val(),
                address : $('#address_'+x.upload.uuid).val(),
              })
            });
          }
        } catch (error){
        }
      }

      var imagePlus = []
      var altPlus = []
      if (typeof dz != undefined && dz != null) {
        dz.forEach((value, key) =>{
          let _images = value.files.map(x => x.upload.path) 
          imagePlus.push(_images)
          try {
            let _alts = value.files.map(x => $('#alt_'+key+"_"+x.upload.uuid).val())
            altPlus.push(_alts)
          } catch (error){
          }
        })
      }

      var descriptionPlus = []
      if (typeof editorMap != undefined && editorMap != null) {
        editorMap.forEach((value, key) =>{
          let ojb = {
            title : $('#title'+key).val(),
            description : CKEDITOR.instances['editors-'+ key].getData()
          }
          descriptionPlus.push(ojb)
        })
      }

      var nameAuthor = $('select[name="authorId"] option:selected').text();

      formData.forEach(element => {
          if (element.name == 'hashtags') {
            if (tagify.value) {
              element.value = JSON.stringify(tagify.value.map(x=>x.code))
            }
          }

          if (element.name == 'imagePlus') {
            element.value = JSON.stringify(imagePlus)
          }

          if (element.name == 'altPlus') {
            element.value = JSON.stringify(altPlus)
          }
        
          if (element.name == 'images') {
            element.value = JSON.stringify(dataImages)
          }

          if(element.name == 'category'){
            element.value = JSON.stringify(treeCategory.getIdCheckeds())
          }
          if (element.name == 'description') {
            element.value = CKEDITOR.instances['editor1'].getData();
          }
          if (element.name == 'descriptionPlus') {
            element.value = JSON.stringify(descriptionPlus)
          }

          if (element.name == 'authorName') {
            element.value = nameAuthor;
          }
      });
    }
  
    // post-submit callback
    function showResponse(responseText, statusText, xhr, $form) {
        if (responseText.success == true) {
          Toast.fire({
            icon: 'success',
            title: 'Cập nhật thành công!'
          })
          setTimeout(function(){
            location.reload();
          }, 1500); 
       
        }else{
          Toast.fire({
            icon: 'error',
            title: 'Cập nhật không thành công!'
          })
        }
    }

    
});

function onChangeLanguage(e) {
  if (typeof e.value === undefined || e.value === '') {
    $('#name').val(dName);
    $('#desShort').val(dDesShort);
    $('#description').val(dDescription)
    $('#seo-title').val(dSeoTitle);
    $('#seo-name').val(dSeoName);
    $('#seo-key').val(dSeoKey);
    $('#seo-desc').val(dSeoDesc);
    $('#e-price').val(dPrice);
    $('#e-unit').val(dUnit);
    if (dDescriptionPlus) {
      dDescriptionPlus.forEach(function(item, index){
        $('#title'+index).val(item.title)
        $('#description'+index).val(item.description)
        if(editorMap){
          let editor = editorMap.get(index)
          if (editor != undefined){
            editor.setData(item.description)
          }
        }
      })
    }
  
    if (CKEDITOR.instances['editor1']) {
      CKEDITOR.instances['editor1'].setData(dDescription);
    }
    

    return;
  }
  let dataLangaugeJson = $('#languages').val();
  if (dataLangaugeJson) {
    let languages = JSON.parse(dataLangaugeJson);
    if (languages && languages.length > 0) {
      languages.forEach((item) => {
        if (item.code == e.value) {
          $('#name').val(item.name);
          $('#desShort').val(item.desShort);
          $('#description').val(item.description)
          if (CKEDITOR.instances['editor1']) {
            CKEDITOR.instances['editor1'].setData(item.description);
          }
          $('#seo-title').val(item.seoTitle);
          $('#seo-name').val(item.seoName);
          $('#seo-key').val(item.seoKeyWord);
          $('#seo-desc').val(item.seoDesc);

          $('#e-price').val(item.price);
          $('#e-unit').val(item.unit);

          if (item.descriptionPlus) {
            item.descriptionPlus.forEach(function(desc, index){
              $('#title'+index).val(desc.title)
              $('#description'+index).val(desc.description)
              if(editorMap){
                let editor = editorMap.get(index)
                if (editor != undefined){
                  editor.setData(desc.description);
                }
              }
            })
          }
          return;
        }
      });
    }
  }
}
