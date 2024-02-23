'use strict';
var editorMap  = new Map();

$(document).ready(function() {
  var i = $('.desc-data').length
  if (i > 0) {
    for (var j = 0; j < i; j++) {
      let fullEditor = ck.initEditor(j);
      if (fullEditor) {
        fullEditor.setData($('#description'+j).val())
        editorMap.set(j,fullEditor)
      }
    }
  }
});

function onAddItemDescription(){
  let id = $('.desc-data').length 
  var myvar = '<div class="row m-1 p-1 border mt-1 desc-data" id="desc-view'+id+'">'+
  '         <div class="offcanvas-header">'+
  '           <h5 class="offcanvas-title"></h5>'+
  '           <button type="button" class="btn-close text-reset m-1" onclick="onRemoveItemDescription('+id+')" ></button>'+
  '         </div>'+
 
  '        <div class="mb-3">'+
  '           <label class="form-label" for="editor1">Tiêu đề</label>'+
  '           <input type="text" class="form-control" id="title'+id+'" value="" name="title">'+
  '        </div>'+

  '        <div class="mb-3">'+
  '           <label class="form-label" for="editor1">Mô tả</label>'+
  '           <input type="text" class="form-control" hidden id="description'+id+'" value="" >'+
  '          <textarea id="editors-'+id+'" style="visibility: hidden; display: none;"></textarea>'+
  '        </div>'+

  '        </div>'


  $("#description-content").append(myvar);  

  // const fullEditor = new Quill('#full-editor-'+id, {
  //   bounds: '#full-editor-'+id,
  //   placeholder: 'Type Something...',
  //   modules: {
  //     formula: true,
  //     toolbar: fullToolbar
  //   },
  //   theme: 'snow'
  // });
  let fullEditor = ck.initEditor(id);
  editorMap.set(id,fullEditor)

}

function onRemoveItemDescription(id) {
  if ($('.desc-data').length <= 1) {
    return
  }
  editorMap.delete(parseInt(id))
  $('#desc-view'+id).remove()
}

