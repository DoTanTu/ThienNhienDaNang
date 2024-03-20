
    $('#AuthurUpdateProfile').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST', 
            url : '/editProfile',
            data: $(this).serialize(),
            success: (response) => {
                if(response.success === true){
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        width : 450,
                        title: "Cập nhật thành công",
                        showConfirmButton: false,
                        backdrop: `
                        rgb(192,192,192, 0.4)
                        no-repeat
                        `,
                        timer: 3000
                    });
                    location.reload();
                }
                else{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Cập nhật thất bại",
                        showConfirmButton: false,
                        backdrop: `
                        rgb(192,192,192, 0.4)
                        no-repeat
                        `,
                        timer: 3000
                    });
                }
            },
            error: (e) => {
                Toast.fire({
                    icon: 'error',
                    title: 'Cập nhật Thất bại'
                });
                console.log(e);
            }
        })
    })

    const formSubmit = $('#ResetPasswordForm');
    const passwordOld = $('#userPassOld');
    const passwordNew = $('#userPassNew');
    const confirmPasswordNew = $('#userPassNew2');

    function changePassword(e){
     
        let hasError = false;

        if(passwordOld.val() === ''){
			errorMessage(passwordOld, 'Trường này là bắt buộc');
			hasError = true;
		}
        if(passwordNew.val() === ''){
			errorMessage(passwordNew, 'Trường này là bắt buộc');
			hasError = true;
		}
        if(confirmPasswordNew.val() === ''){
			errorMessage(confirmPasswordNew, 'Trường này là bắt buộc');
			hasError = true;
		}
        if(confirmPasswordNew.val() !== passwordNew.val()){
			errorMessage(confirmPasswordNew, 'Xác nhận mật khẩu không khớp');
			hasError = true;
		}

        if(!hasError){
            $.ajax({
                type: 'POST',
                url: '/changePassword',
                data: formSubmit.serialize(), 
                success: function(response) {
                    if(response.success === true) {
                        Toast.fire({
                            icon: 'success',
                            title: 'Cập nhật mật khẩu thành công'
                        });
                        location.reload();
                    }
                    else{
                        errorMessage(passwordOld, 'Mật khẩu nhập không đúng');
			            hasError = true;
                    }
                  
                },
                error: function(error) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Cập nhật mật khẩu thất bại'
                    });
                }
            });
        }
    }
   
    passwordOld.focus(() => {
        removeErrorMessage(passwordOld);
    });

    passwordNew.focus(() => {
        removeErrorMessage(passwordNew);
    });

    confirmPasswordNew.focus(() => {
        removeErrorMessage(confirmPasswordNew);
    });

    //create div message error
    function errorMessage(current,message){
		const closetForm = current.closest('.form-group-reset');
		closetForm.addClass('error');
		closetForm.find('.error_message').remove();
		closetForm.append($(`<div class="error_message">${message}</div>`));
	}

    //clear div message error
    function removeErrorMessage(current){
        current.removeClass('error');
        const closetForm = current.closest('.form-group-reset');
        closetForm.removeClass('error');
        closetForm.find('.error_message').remove();
    }