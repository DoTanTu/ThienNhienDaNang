
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

