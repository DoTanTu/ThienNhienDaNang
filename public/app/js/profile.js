 
    $.ajax({
        type: "GET",
        url: "/profile",
        success : (response) => {
            if(response.success === true){
                $('#avatar-read').val(response.customer.avatar);
                $('#backgroundImage-read').val(response.customer.backgroundImage);
                $('#user-introduction').html(
                    `
                    <div class="cot-6-lg">
                        <label for="userName" class="form-label">Họ và tên:</label>
                        <input type="text" name="fullname" class="form-control off" id="userName" disabled value="${response.customer.fullname}">
                    </div>
                    <div class="cot-6-lg">
                        <label for="userMail" class="form-label">Địa chỉ mail:</label>
                        <input type="email" name="email" class="form-control off" id="userMail" disabled value="${response.customer.email}">
                    </div>
                    <div class="cot-6-lg">
                        <label for="userPhone" class="form-label">Số điện thoại:</label>
                        <input type="tel" name="phone" class="form-control off" id="userPhone" disabled value="${response.customer.phone}">
                    </div>
                    <div class="cot-6-lg">
                        <label for="userAdr" class="form-label">Địa chỉ:</label>
                        <input type="text" name="address" class="form-control off" id="userAdr" disabled value="${response.customer.address}">
                    </div>
                    <div class="mb-3">
                        <label for="userDes" class="form-label">Về bản thân:</label>
                        <textarea name="description" class="form-control off" id="userDes" rows="3" disabled>${response.customer.description}</textarea>
                    </div>
                    
                    <i class="cot-12 fs-6">(Chúng tôi sẽ chịu trách nhiệm bảo mật thông tin của bạn.)</i>
                    `
                ),
                $('#user-avatar-customer').html(
                    `
                    <img class="userCoverBg" src="${response.customer.backgroundImage !== ('' || null || undefined) ? response.customer.backgroundImage : "https://source.unsplash.com/random/1200x800/?natural" } " id="user-cover-bg" data-src="" alt="ảnh nền user">
                    <div class="userCoverAva">
                        <img src="${response.customer.avatar !== '' ? response.customer.avatar : "../public/app/images/person_default.png" }" id="user-avatar" data-src="" alt="ảnh đại diện">
                        <h4 class="userNameTop br-line-2">${response.customer.fullname}</h4>
                        <p>${response.customer.email}</p>
                    </div>
                    `
                ),
                 customerId = response.customer._id;
            }
        },
        error : (xhr, status , error) =>{
            console.error(error);
        }
    });

    $('#AuthurUpdateProfile').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST', 
            url : '/editProfile',
            data: $(this).serialize(),
            success: (response) => {
                if(response.success === true){
                    Toast.fire({
                        icon: 'success',
                        title: 'Cập nhật thành công'
                    });
                    location.reload();
                }
                else{
                    Toast.fire({
                        icon: 'error',
                        title: 'Cập nhật Thất bại'
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