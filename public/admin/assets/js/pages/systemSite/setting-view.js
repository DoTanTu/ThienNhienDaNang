var customSubMenuIds  = new Map();

$(document).ready(function () {
  $('#cbSiteCategoryDetail').click(function(){
    if($(this).is(':checked')){
       $('#cbSiteProductDetail').prop('checked', false);
    } 
  });

  $('#cbSiteProductDetail').click(function(){
    if($(this).is(':checked')){
       $('#cbSiteCategoryDetail').prop('checked', false);
    } 
  });

  $('#page-data').change(function () {
    if (this.value) {
      document.getElementById('cbGetCategory').disabled = false;
      document.getElementById('cbGetProduct').disabled = false;
    }else{
      document.getElementById('cbGetCategory').disabled = true;
      document.getElementById('cbGetProduct').disabled = true;
    }
  });

  $('#page-other1').change(function () {
    if (this.value) {
      document.getElementById('cbGetCategory1').disabled = false;
      document.getElementById('cbGetProduct1').disabled = false;
    }else{
      document.getElementById('cbGetCategory1').disabled = true;
      document.getElementById('cbGetProduct1').disabled = true;
    }
  });

  $('#page-other2').change(function () {
    if (this.value) {
      document.getElementById('cbGetCategory2').disabled = false;
      document.getElementById('cbGetProduct2').disabled = false;
    }else{
      document.getElementById('cbGetCategory2').disabled = true;
      document.getElementById('cbGetProduct2').disabled = true;
    }
  });

  $('#page-other3').change(function () {
    if (this.value) {
      document.getElementById('cbGetCategory3').disabled = false;
      document.getElementById('cbGetProduct3').disabled = false;
    }else{
      document.getElementById('cbGetCategory3').disabled = true;
      document.getElementById('cbGetProduct3').disabled = true;
    }
  });

  $('#page-other4').change(function () {
    if (this.value) {
      document.getElementById('cbGetCategory4').disabled = false;
      document.getElementById('cbGetProduct4').disabled = false;
    }else{
      document.getElementById('cbGetCategory4').disabled = true;
      document.getElementById('cbGetProduct4').disabled = true;
    }
  });

  var size = $('.custom-sub-data').length
  if (size > 0) {
    for (var j = 0; j < size; j++) {
      customSubMenuIds.set(j,j)
    }
  }

});


function onAddItemSubMenu(){
  let id = $('.custom-sub-data').length 
  var myvar = '<div class="row m-1 p-1 border mt-1 custom-sub-data" id="customSubMenu'+id+'">'+
  '    <button type="button" class="btn-close text-reset m-1" onclick="onRemoveItemCustomSubMenu(\''+id+'\')"></button>'+
  '    <div class="mb-1 mt-2">'+
  '        <label class="form-label" for="seo-title">Item Name</label>'+
  '        <input type="text" class="form-control" id="itemName'+id+'"placeholder="name" value="">'+
  '      </div>'+
  '    <div class="mb-1">'+
  '    <label class="form-label" for="seo-title">Item URL</label>'+
  '    <input type="text" class="form-control" id="itemUrl'+id+'"  placeholder="url" value="">'+
  '    </div>'+
  '</div>';
    
  $("#viewSubMenuCustom").append(myvar);  
  customSubMenuIds.set(id,id)
}

function onRemoveItemCustomSubMenu(id) {
  customSubMenuIds.delete(parseInt(id))
  $('#customSubMenu'+id).remove()
}
