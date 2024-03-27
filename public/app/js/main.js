const e = require("express");

    $(document).ready(function() {
        let shareButton = $('#shareFacebook');
        let copyLinkButton = $('#copyLinkPost');
        let buttonShare = $('.list_method_shared');
        copyLinkButton.attr('data-src-copy', decodeURIComponent(window.location.href));
        shareButton.attr( 'href', 'https://www.facebook.com/sharer/sharer.php?u=' + window.location.href);

        buttonShare.click(function(){
            $(this).toggleClass('active');
        })

        copyLinkButton.click(function(event) {
            event.preventDefault();
            var linkToCopy = $(this).data("src-copy");
            navigator.clipboard.writeText(linkToCopy)
                .then(function() {
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Đã sao chép",
                        showConfirmButton: false,
                        backdrop: `
                        rgb(192,192,192, 0.4)
                        no-repeat
                        `,
                        timer: 3000
                    });
                })
                .catch(function(err) {
                    console.error("Lỗi khi sao chép đường dẫn: ", err);
                });
        });
    });

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
                        Swal.fire({
                            position: "center",
                            icon: "error",
                            title: "Bình luận không thành công!",
                            showConfirmButton: false,
                            backdrop: `
                            rgb(192,192,192, 0.4)
                            no-repeat
                            `,
                            timer: 3000
                        });
                    }
                },
                error: function(xhr, status, error) {
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Bình luận không thành công",
                        showConfirmButton: false,
                        backdrop: `
                        rgb(192,192,192, 0.4)
                        no-repeat
                        `,
                        timer: 3000
                    });
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
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Xảy ra lỗi khi cập nhật ảnh!",
                        showConfirmButton: false,
                        backdrop: `
                        rgb(192,192,192, 0.4)
                        no-repeat
                        `,
                        timer: 3000
                    });
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
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: "Xảy ra lỗi khi cập nhật ảnh!",
                        showConfirmButton: false,
                        backdrop: `
                        rgb(192,192,192, 0.4)
                        no-repeat
                        `,
                        timer: 3000
                    });
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
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Xảy ra lỗi khi tải xuống",
                showConfirmButton: false,
                backdrop: `
                rgb(192,192,192, 0.4)
                no-repeat
                `,
                timer: 3000
            });
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
            Swal.fire({
                position: "center",
                icon: "error",
                title: "Vui lòng chọn file trước khi gửi!",
                showConfirmButton: false,
                backdrop: `
                rgb(192,192,192, 0.4)
                no-repeat
                `,
                timer: 3000
            });
        }
    }

    function uploadResponse(data){
        $('.uploadItem').each(function(index) {
            const uploadItem = $(this);
            uploadItem.find('.uploadFile img').attr('data-src', data[index].path);
        });
    }

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
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Đăng nhập không thành công",
                    showConfirmButton: false,
                    backdrop: `
                    rgb(192,192,192, 0.4)
                    no-repeat
                    `,
                    timer: 3000
                });
            }
        });
    });

    $('#registerFromModal').on('click', function (e){
        e.preventDefault();
        const urlCurrent = window.location.href;
    
        if (!getCookie("referer_url")) {
            const base64Url = btoa(urlCurrent);
            document.cookie = `referer_url=${encodeURIComponent(base64Url)}; path=/`;
        }

        window.location.href = '/dang-ky';
    })
