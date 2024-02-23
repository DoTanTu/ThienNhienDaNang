'use strict';
$(document).ready(function() {
       $('[data-toggle="tooltip"]').tooltip();

       $('#formPaymentMethodOnline').submit(function () {
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
            window.location.reload();
          }else{
            Toast.fire({
              icon: 'error',
              title: 'Không thành công!'
            })
          }
      }
});

function onActivateStripe(){
  $("#sSK").removeAttr('disabled');
  $("#sPK").removeAttr('disabled');
  $("#summit").removeAttr('disabled');
};
