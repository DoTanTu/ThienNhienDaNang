

   function toggleReplyForm(commentId, productId) {
        const recommentItem = document.getElementById(`recomment${commentId}`);
        if (!recommentItem.querySelector('.reply-form')) {
            const id_account = document.getElementById(`id_account`).value;
            const avatar_account = document.getElementById(`avatar_account`).value;
            const fullname_account = document.getElementById(`fullname_account`).value;
            const replyFormHtml = `
                <div class="replay_comment w-100 tintuc-detail-comment-box border">
                    <div class="comment-box-img">
                        <img src="${avatar_account !== "" ? avatar_account : "https://images.pexels.com/photos/1009904/pexels-photo-1009904.jpeg?auto=compress&cs=tinysrgb&w=300"}"
                            alt="">
                    </div>
                    <div class="comment-box-text flex-grow-1 mb-3">
                        <h5>${fullname_account}</h5>
                        <div class="form_replay" id="parentForm${commentId}">
                            <form action="" id="replyForm${commentId}">
                                <input type="hidden" name="productId" value="${productId}"> 
                                <input type="hidden" name="userId" value="${id_account}">
                                <input type="hidden" name="parentId" value="${commentId}">
                                <textarea class="form-control" id="replay-comment" name="comment" rows="4" placeholder="Nhập bình luận của bạn"></textarea>
                                <div class="action-btn pb-2">
                                    <button class="btn_cancel" onclick="cancelReplyForm('${commentId}')">Hủy</button>
                                    <button type="submit" class="submit_comment" onclick="submitReplyForm('${commentId}')">Bình luận</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            `;
            recommentItem.innerHTML = replyFormHtml;
        } else {
            recommentItem.querySelector('.reply-form').classList.toggle('hidden');
        }
    }

    function submitReplyForm(commentId) {
        const form = document.getElementById(`replyForm${commentId}`);
        event.preventDefault();

        $.ajax({ 
                type: "POST",
                url: "/addComment",
                data: $(form).serialize(),
                success: function(response) {
                    if(response.success === true) {
                        const recommentItem = document.getElementById(`parentForm${commentId}`);
                            recommentItem.innerHTML = ``;
                            recommentItem.innerHTML = `
                            <div class="message-comment">
                                <span>Cảm ơn bạn đã để lại bình luận. Bình luận sẽ được xem xét trước khi hiển thị.</span>
                            </div>
                        `;
                    }else{
                        Toast.fire({
                            icon: 'error',
                            title: 'Bình luận không thành công!'
                        })
                    }
                },
                error: function(xhr, status, error) {
                    Toast.fire({
                        icon: 'error',
                        title: 'Bình luận không thành công!'
                    })
                }
            });
    }

    function cancelReplyForm(commentId) {
        const recommentItem = document.getElementById(`recomment${commentId}`);
        recommentItem.innerHTML = '';
    }

    function handleFileUpload(){
        const fileInput = document.getElementById('userAvaUpload');
        const previewImage = document.getElementById('user-avatar');
        const oldPath = previewImage.getAttribute('src');
        const newPath = $('#avatar-read');
        const file = fileInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('page', 'customer');
            formData.append('avatarCustomer', file);
            $.ajax({
                type: 'POST',
                url : '/uploadAvatar',
                data : formData,
                contentType: false,
                processData: false,
                success: (response) => {
                    previewImage.src = response.data[0].path;
                    newPath.val(response.data[0].path);
                },
                error: (e) => {
                    previewImage.src = oldPath;
                    alert('Upload ảnh không thành công');
                }
            });
        }
    }

    function handleBackgroundUpload(){
        const fileInput = document.getElementById('userCoverUpload');
        const previewImage = document.getElementById('user-cover-bg');
        const oldPath = previewImage.getAttribute('src');
        const newPath = $('#backgroundImage-read');
        const file = fileInput.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('page', 'customer');
            formData.append('avatarCustomer', file);
            $.ajax({
                type: 'POST',
                url : '/uploadAvatar',
                data : formData,
                contentType: false,
                processData: false,
                success: (response) => {
                    previewImage.src = response.data[0].path;
                    newPath.val(response.data[0].path);
                },
                error: (e) => {
                    previewImage.src = oldPath;
                    alert('Upload ảnh không thành công');
                }
            });
        }
    }

    function deleteFile(oldPath) {
        const fileInput = document.getElementById('userAvaUpload');
        fileInput.value = null;
        document.getElementById('user-avatar').src = oldPath;
        document.querySelector('#customer-avatar .cancle-avatar').innerHTML = '';
    }

    function downloadDocument(productId) {
        $.ajax({
          type: "POST", 
          url: "/increase-download",  
          data: { productId: productId },
          success: function(response) {
            $('#number-download').text(response.total);
          },
          error: function(error) {
            console.error("Download request failed:", error);
          }
        });
    }

    function redirectToLogin() {
        const urlCurrent = window.location.href;
    
        // Kiểm tra nếu cookie "referer_url" không tồn tại
        if (!getCookie("referer_url")) {
            const base64Url = btoa(urlCurrent);
            document.cookie = `referer_url=${encodeURIComponent(base64Url)}; path=/`;
        }
    }
    
    function getCookie(cookieName) {
        const name = cookieName + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(";");
    
        for (let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === " ") {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
                return cookie.substring(name.length, cookie.length);
            }
        }
        return "";
    }
    

    function submitSendFile(){
        var fileInput = null;
        const radioButtonSelected = isRadioButtonSelected();
        if(radioButtonSelected === 'image'){
            fileInput = document.getElementById('inputGroupFile02');
        }else if(radioButtonSelected  === 'video'){
            fileInput = document.getElementById('inputGroupFile03');
        }else {
            fileInput = document.getElementById('inputGroupFile04');
        }
        
        const files = fileInput.files;
        console.log(files);
        if (files && files.length > 0) {
            const formData = new FormData();
            formData.append('page', 'contribute');
            for (let i = 0; i < files.length; i++) {
                formData.append('contributeCustomer', files[i]);
            }
            $.ajax({
                type: 'POST',
                url : '/uploadFileContribute',
                data : formData,
                contentType: false,
                processData: false,
                success: (response) => {
                    uploadResponse(response.data);
                },
                error: (e) => {
                    console.log(e);
                }
            });
            $('#uploadModal').modal('hide');
        }else{
            alert('Bạn chưa chọn được sản phẩm');
        }
    }

    function uploadResponse(data){
        $('.uploadItem').each(function(index) {
            const uploadItem = $(this);
            uploadItem.find('.uploadFile img').attr('data-src', data[index].path);
        });
    }

    // $('#dongGopForm').on('submit', function(){
    //     event.preventDefault();

    //     const customer = {
    //         customerId:  $('input[name="customerId"]').val(),
    //         fullname:  $('input[name="fullname"]').val(),
    //         copyright:  $('input[name="copyright"]').val(),
    //         phone: $('input[name="phone"]').val(),
    //         address:  $('input[name="address"]').val(),
    //         email:  $('input[name="email"]').val(),
    //     }

    //     const filesInput = [];
    //     $('.uploadItem').each(function(index) {
    //         filesInput.push({
    //             name: $(this).find('span .name-image').text(),
    //             title: $(this).find('input[name="title"]').val(),
    //             file: $(this).find('img').data('src'),
    //             content: $(this).find('textarea[name="note"]').val(),
    //             date: $(this).find('input[name="date"]').val(),
    //             address: $(this).find('input[name="address"]').val(),
    //         })
    //     });
        
    //     const data = {
    //         title: $('input[name="titleGeneral"]').val(),
    //         customer: customer,
    //         type: isRadioButtonSelected(),
    //         content:$('textarea[name="noteGeneral"]').val(),
    //         date: $('input[name="dateGeneral"]').val(),
    //         address: $('input[name="addressGeneral"]').val(),
    //         files: filesInput
    //     };

    //     $.ajax({
    //         url: 'addContribute',
    //         type: 'POST',
    //         contentType: 'application/json',
    //         data: JSON.stringify(data),
    //         success: function(response) {
    //             console.log( response);
    //         },
    //         error: function(error) {
    //             console.error( error);
    //         }
    //     });
    // });

    // var isRadioButtonSelected = function () {
    //     let selectedType = null;
    //     $('input[name="dongGopFile"]').each(function() {
    //         const isChecked = $(this);
    //         if (isChecked.prop('checked')) {
    //             const selectedRadioId = isChecked.attr('id');
    //             if (selectedRadioId === 'dongGopImg') {
    //                 selectedType = 'image';
    //             } else if (selectedRadioId === 'dongGopVid') {
    //                 selectedType = 'video';
    //             } else if (selectedRadioId === 'dongGopDoc') {
    //                 selectedType = 'document';
    //             }
    //         }
    //     });
    //     return selectedType;
    // };

    $('#formHandleLogin').submit(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/login',
            data : $(this).serialize(),
            success: function (response) {
                if(response.success === true) {
                    window.location.reload();
                }else{
                    $('.error-message-popup').css('display', 'block');
                }
            },
            error: function (e){
                Toast.fire({
					icon: 'error',
					title: 'Lỗi trong quá trình đăng nhập!'
				})
            }
        });
    });

    
