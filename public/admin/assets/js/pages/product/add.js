'use strict';
$(document).ready(function() {
    if (treeCategory) {
      var cateIds = $('#category').val()
      if (cateIds) {
        cateIds = JSON.parse(cateIds)
      }else{
        cateIds = null
      }
      var categoriesExists = typeof categories !== 'undefined' && categories !== null && categories !== '';
      if (categoriesExists) {
        treeCategory.createTree(JSON.parse(decodeURI(categories)));
      }
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

      var file_pdf;
      if(pdfDropzone){
        try {
          if (pdfDropzone.files[0] && pdfDropzone.files.length > 0){
            file_pdf = pdfDropzone.files[0].upload.path
          }
        }catch(e){
          console.error("Error uploading file: " + e.message);
          return;
        }
      }

      var imagePlus = []
      var altPlus = []
      if (typeof dz != undefined && dz != null) {
        dz.forEach((value, key) =>{
          let _images = value.files.map(x => x.upload.path) 
          imagePlus.push(_images)
          try {
            let _alts = value.files.map(x => $('#alt_'+x.upload.uuid).val())
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

      var IdAuthor = '';
      var nameAuthor = '';
      const typeOfValue = $('select[name="typeof"] option:selected').val();

      if(typeOfValue === 'doc' && typeOfValue === 'video' && typeOfValue === 'book' && typeOfValue === 'lesson'){
        idAuthor = $('select[name="authorId"] option:selected').val();
        nameAuthor = $('select[name="authorId"] option:selected').text();
      }else if( typeOfValue === 'book' && typeOfValue === 'image'){
        idAuthor = $('select[name="authorIdImage"] option:selected').val();
        nameAuthor = $('select[name="authorIdImage"] option:selected').text();
      }


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

          if(element.name == 'pdf_file'){
            element.value = file_pdf;
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

          if (element.name == 'authorId') {
            element.value = idAuthor;
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
            title: 'Thêm thành công!'
          })
          setTimeout(function(){
            location.reload();
          }, 1500); 
       
        }else{
          Toast.fire({
            icon: 'error',
            title: 'Thêm không thành công!'
          })
        }
    }
});
