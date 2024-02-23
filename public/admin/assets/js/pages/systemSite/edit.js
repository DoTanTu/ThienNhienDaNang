$(document).ready(function () {

	$('#formSiteData').submit(function () {
		var options = {
				beforeSubmit: showRequest, // pre-submit callback
				success: showResponse // post-submit callback
		};

		$(this).ajaxSubmit(options);
		// always return false to prevent standard browser submit and Site navigation
		return false;
  });

// pre-submit callback
function showRequest(formData, jqForm, options) {
	var dataImages = appImages.files.map(x => x.upload.path)
  var dataCss = appCss.files.map(x => x.upload.path)
  var dataJs = appJs.files.map(x => x.upload.path)
  var dataHtml = appHtml.files.map(x => x.upload.filename)
  var subMenuCustom = []
  if (typeof customSubMenuIds != undefined && customSubMenuIds != null) {
    customSubMenuIds.forEach((value, key) =>{
      let ojb = {
        name : $('#itemName'+key).val(),
        url : $('#itemUrl'+key).val(),
      }
      subMenuCustom.push(ojb)
    })
  }

  formData.forEach(element => {
      if (element.name == 'pathImages') {
        element.value = JSON.stringify(dataImages)
      }
      if (element.name == 'pathHtml') {
        if (dataHtml.length > 0) {
          element.value = dataHtml[0]
        }
      }
      if (element.name == 'pathCss') {
        element.value = JSON.stringify(dataCss)
      }
      if (element.name == 'pathJs') {
        element.value = JSON.stringify(dataJs)
      }
      if (element.name == 'subMenuCustom') {
        element.value = JSON.stringify(subMenuCustom)
      }
  });
}

// post-submit callback
function showResponse(responseText, statusText, xhr, $form) {
		if (responseText.success == true) {
      Toast.fire({
				icon: 'success',
				title: 'Thêm Site thành công!'
			})
      window.setTimeout(window.location.reload(), 3500 );
		}else{
			Toast.fire({
				icon: 'error',
				title: 'Thêm Site không thành công!'
			})
		}
}
});

function onChangeSiteName(e) {
  $("#site-url").val(change_alias(e.value));
}

function change_alias(alias) {
    var str = alias;
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
    str = str.replace(/đ/g,"d");
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    str = str.replace(/ + /g," ");
    str = str.replace(" ","-");
    str = str.trim();
    return str;
}