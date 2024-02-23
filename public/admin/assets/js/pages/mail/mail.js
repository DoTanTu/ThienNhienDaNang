'use strict';
$(document).ready(function() {

  $('#host').val(window.location.host)

  $('#formMailData').submit(function () {
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
   
  }

  // post-submit callback
  function showResponse(responseText, statusText, xhr, $form) {
      if (responseText.success == true) {
        Toast.fire({
          icon: 'success',
          title: 'Lưu thành công!'
        })
      }else{
        Toast.fire({
          icon: 'error',
          title: 'Lưu không thành công!'
        })
      }
  }
});
