

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
            $('#number-download').text(response.total)
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
    