$(document).ready(function () {
	const fields = {
		fullname: $('[name="fullname"]'),
		email: $('[name="email"]'),
		password: $('[name="password"]'),
		confirmPassword: $('[name="confirm-password"]'),
		checkbox: $('[name="terms"]')
	}

	$('#formAuthentication').submit(function (e) {
	  e.preventDefault();
	  let hasError = false;
	  for (const [itemName, item] of Object.entries(fields)){
		if(itemName === 'checkbox' && item.is(":checked") === false){
			errorMessage(item, 'Trường này là bắt buộc');
			hasError = true;
		}
		else if(item.val() === '' && itemName !== 'checkbox'){
			errorMessage(item, 'Trường này là bắt buộc');
			hasError = true;
		}
	  }

		if(fields.confirmPassword.val() !== fields.password.val()){
			errorMessage(fields.confirmPassword, 'Xác nhận mật khẩu không trùng khớp');
			hasError = true;
		}

		if(!fields.email.val().includes('@') && fields.email.val() !== ''){
			errorMessage(fields.email, 'Email không đúng định dạng');
			hasError = true;
		}

		if(!hasError){
			$.ajax({ 
				type: "POST",
				url: "/signup",
				data: $(this).serialize(),
				success: function(response) {
				  if(response.success === true) {
					  Swal.fire({
						  title: "Xác nhận email trước khi đăng nhập nhé!",
						  showClass: {
							popup: `
							  animate__animated
							  animate__fadeInDown
							  animate__faster
							`
						  },
						  hideClass: {
							popup: `
							  animate__animated
							  animate__fadeOutUp
							  animate__faster
							`
						  },
						  willClose: () => {
							  window.location.href = './'
							}
						});
				  }else{
					  Toast.fire({
						  icon: 'error',
						  title: 'Đăng ký không thành công!'
					  })
				  }
				},
				error: function(xhr, status, error) {
				  Toast.fire({
					  icon: 'error',
					  title: 'Đăng ký không thành công!'
				  })
				}
			});
		}
	});

	for( const [itemName,item] of Object.entries(fields)){
        if(itemName !== 'checkbox'){
            item.focus(() => {
                item.removeClass('error');
                const closetForm = item.closest('.form-group');
                closetForm.removeClass('error');
                closetForm.find('.error_message').remove();
            });
        }else{
            item.change(() => {
                if (item.is(":checked")) {
                    item.removeClass('error');
                    const closetForm = item.closest('.form-group');
                    closetForm.removeClass('error');
                    closetForm.find('.error_message').remove();
                }
            });
        }
    }

	//Đưa ra thông báo lỗi
	function errorMessage(current,message){
		const closetForm = current.closest('.form-group');
		closetForm.addClass('error');
		closetForm.find('.error_message').remove();
		closetForm.append($(`<div class="error_message">${message}</div>`));
	}

});