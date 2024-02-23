'use strict';
$(function () {
  var e = document.getElementById('createApp');
  const t = document.querySelector('.app-credit-card-mask'),
    n = document.querySelector('.app-expiry-date-mask'),
    c = document.querySelector('.app-cvv-code-mask');
  let r;
  function l() {
    t &&
      (r = new Cleave(t, {
        creditCard: !0,
        onCreditCardTypeChanged: function (e) {
          document.querySelector('.app-card-type').innerHTML =
            '' != e && 'unknown' != e
              ? '<img src="' +
                assetsPath +
                'img/icons/payments/' +
                e +
                '-cc.png" class="cc-icon-image" height="28"/>'
              : '';
        },
      }));
  }
  n && new Cleave(n, { date: !0, delimiter: '/', datePattern: ['m', 'y'] }),
    c && new Cleave(c, { numeral: !0, numeralPositiveOnly: !0 }),
    e.addEventListener('show.bs.modal', function (e) {
      var t = document.querySelector('#wizard-create-app');
      if (null !== t) {
        var n = [].slice.call(t.querySelectorAll('.btn-next')),
          c = [].slice.call(t.querySelectorAll('.btn-prev')),
          r = t.querySelector('.btn-submit');
        const a = new Stepper(t, { linear: !1 });
        n &&
          n.forEach((e) => {
            e.addEventListener('click', (e) => {
              a.next(), l();
            });
          }),
          c &&
            c.forEach((e) => {
              e.addEventListener('click', (e) => {
                a.previous(), l();
              });
            })
          r &&
            r.addEventListener('click', (e) => {
              $('#formAppData').submit(function () {
                var options = {
                    beforeSubmit: showRequest, // pre-submit callback
                    success: showResponse // post-submit callback
                };
            
                $(this).ajaxSubmit(options);
                // always return false to prevent standard browser submit and page navigation
                return false;
              });
            });
      }
    });
});


// pre-submit callback
function showRequest(formData, jqForm, options) {
  var dataHtml = appHtml.files.map(x => x.upload.path)
  var dataLogo = appLogo.files.map(x => x.upload.path)
 
  formData.forEach(element => {
      if (element.name == 'appHtml') {
        element.value = JSON.stringify(dataHtml)
      }
      if (element.name == 'appLogo') {
        if (dataLogo.length > 0) {
          element.value = dataLogo[0]
        }
      }

      if (element.name == 'hostName') {
          element.value = window.location.host
      }
  });
}

// post-submit callback
function showResponse(responseText, statusText, xhr, $form) {
		if (responseText.success == true) {
			window.location.reload();
		}else{
			Toast.fire({
				icon: 'error',
				title: 'Thêm app không thành công!'
			})
		}
}
