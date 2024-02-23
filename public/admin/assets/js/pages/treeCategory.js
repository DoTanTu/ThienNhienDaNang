var treeCategory = (function() {
  var levelCurrent = "-1"
  function selectOnlyThis(id,level) {
    let currentCheck = document.getElementById("ckb_"+id)
    $('input.chk').not(currentCheck).prop('checked', false);
    if (currentCheck.checked == true) {
      levelCurrent = level;
    }else{
      levelCurrent = "";
    }
  }

  function getLevel(){
    return levelCurrent
  }

  function getIdChecked(){
    var dataCheck = ""
     $('#treeCategoryView :checkbox:checked').each(function(i){
      dataCheck = $(this).val();
     });
     return dataCheck
  }

  function getIdCheckeds(){
    let dataCheck = []
     $('#treeCategoryView :checkbox:checked').each(function(i){
      dataCheck.push( $(this).val())
     });
    return dataCheck
  }
  
  function createTreeCategory(categories, cateId, parentId){
    if (categories != null && categories.length > 0) {
      categories = sortList(categories)
      for (var i = 0; i<categories.length; i++){
        if (categories[i]._id != cateId){
          if (categories[i].parents == null || categories[i].parents == "") {
            //check children exist
            if(categories.some(e => e._id != categories[i]._id && e.parents == categories[i]._id)){
              $("#treeCategoryView").append(drawItemParrent(categories[i], 0, parentId, 1));
            }else{
              $("#treeCategoryView").append(getItemCheckBox(categories[i], 2, parentId, 1))
            }
          }else{
            var level = 1
            if (categories[i].level == "" || categories[i].level == null || categories[i].level == "0") {
              levelParent = 1
            }else{
              levelParent = parseInt(categories[i].level)
            }
            level = levelParent + 1
            if(categories.some(e => e._id != categories[i]._id && e.parents == categories[i]._id)){
              $("#parrent_"+categories[i].parents).append(drawItemParrent(categories[i], 3, parentId, level));
            }else{
              $("#parrent_"+categories[i].parents).append(getItemCheckBox(categories[i], 4, parentId, level))
            }
          }
        }
      }
    }
  };

  function createTree(categories, cateIds){
    if (categories != null && categories.length > 0) {
      categories = sortList(categories)
      for (var i = 0; i<categories.length; i++){
        //field cate edit
        var cateId = null
        if(cateIds && cateIds.length > 0 && cateIds.includes(categories[i]._id)){
          cateId = categories[i]._id
        }

        if (categories[i].parents == null || categories[i].parents == "") {
          //check children exist
          if(categories.some(e => e._id != categories[i]._id && e.parents === categories[i]._id)){
            $("#treeCategoryView").append(drawItemParrentCategory(categories[i], 0,cateId));
          }else{
            $("#treeCategoryView").append(getItemCheckBoxAllowMutiple(categories[i], 2, cateId))
          }
        }else{
          if(categories.some(e => e._id != categories[i]._id && e.parents === categories[i]._id)){
            $("#parrent_"+categories[i].parents).append(drawItemParrentCategory(categories[i], 3, cateId));
          }else{
            $("#parrent_"+categories[i].parents).append(getItemCheckBoxAllowMutiple(categories[i], 4, cateId))
          }
        }
      }
    }
  };
  
  function getItemCheckBox(item, margin, cateId, level){
   var chbHtml = "<div class=\"mb-1 mt-2 ms-"+margin+"\">"
   +"<label class=\"list-group-item border border-white\">"
   +"  <input class=\"form-check-input me-1 chk\" type=\"checkbox\" id=\"ckb_"+item._id+"\" " 
    if(cateId == item._id){
      chbHtml = chbHtml +  " checked "
    }
   chbHtml =  chbHtml +"value=\""+item._id+"\" onclick=\"treeCategory.selectOnlyThis('"+item._id+"','"+level+"')\">"
   + item.name
   +"</label>"
   +"</div>"
   return chbHtml
  }

  function drawItemParrent(item, margin, cateId, level){
    var itemParrent = "<div class=\" accordion-item ms-"+margin+"\">"
   +"<h2 class=\"accordion-header\" id=\"label_"+item._id+"\">"
   + "  <button type=\"button\" class=\"list-group-item accordion-button p-0\" data-bs-toggle=\"collapse\" data-bs-target=\"#parrent_"+item._id+"\""
   + "    aria-expanded=\"false\" aria-controls=\"parrent_"+item._id+"\">"
   +    "<label class=\"list-group-item\">"
   +"  <input class=\"form-check-input me-1 chk\" type=\"checkbox\" id=\"ckb_"+item._id+"\""
   if(cateId == item._id){
    itemParrent = itemParrent +  " checked "
   }
   itemParrent = itemParrent+" value=\""+item._id+"\" onclick=\"treeCategory.selectOnlyThis('"+item._id+"','"+level+"')\">"
   + item.name
   +"</label>"
   + "  </button>"
   + "</h2>"
   + "<div id=\"parrent_"+item._id+"\" class=\"accordion collapse show\" aria-labelledby=\"label_"+item._id+"\""
   + "  data-bs-parent=\"#parrent_"+item._id+"\">"
   + "  <div class=\"accordion-body\" id=\"parrent_"+item._id+"\">"
   + "  </div>"
   + "</div>"
   + "</div>"
   return itemParrent
  }

  function getItemCheckBoxAllowMutiple(item, margin, cateId){
    var itemCheckBox = "<div class=\"mb-1 ms-"+margin+"\">"
    +"<label class=\"list-group-item border border-white\">"
    +"  <input class=\"form-check-input me-1 chk\" type=\"checkbox\" id=\"ckb_"+item._id+"\""
    if(cateId == item._id){
      itemCheckBox = itemCheckBox +  " checked "
     }
    itemCheckBox = itemCheckBox+"value=\""+item._id+"\">"
    + item.name
    +"</label>"
    +"</div>"
    return itemCheckBox
   }

  function drawItemParrentCategory(item, margin,cateId){
    var itemParrent = "<div class=\"  accordion-item ms-"+margin+"\">"
   +"<h2 class=\"accordion-header\" id=\"label_"+item._id+"\">"
   + "  <button type=\"button\" class=\"accordion-button collapsed\" data-bs-toggle=\"collapse\" data-bs-target=\"#parrent_"+item._id+"\""
   + "    aria-expanded=\"false\" aria-controls=\"parrent_"+item._id+"\">"
   +    "<label class=\"list-group-item\">"
   +"  <input class=\"form-check-input me-1 chk\" type=\"checkbox\" id=\"ckb_"+item._id+"\""
   if(cateId == item._id){
    itemParrent = itemParrent +  " checked "
   }
   itemParrent = itemParrent+" value=\""+item._id+"\">"
   + item.name
   +"</label>"
   + "  </button>"
   + "</h2>"
   + "<div id=\"parrent_"+item._id+"\" class=\"accordion collapse\" aria-labelledby=\"label_"+item._id+"\""
   + "  data-bs-parent=\"#parrent_"+item._id+"\">"
   + "  <div class=\"accordion-body\" id=\"parrent_"+item._id+"\">"
   + "  </div>"
   + "</div>"
   + "</div>"
   return itemParrent
  }

  function sortList(categories){
   return categories.sort((a, b) => {
      if (a.parents < b.parents)
        return -1;
      if (a.parents > b.parents)
        return 1;
      return 0;
    });
  }

  return {
    createTreeCategory: createTreeCategory,
    createTree : createTree,
    selectOnlyThis : selectOnlyThis,
    getIdChecked : getIdChecked,
    getIdCheckeds : getIdCheckeds,
    getLevel : getLevel,
  };
})();

