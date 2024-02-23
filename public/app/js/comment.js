$(document).ready(function () {
	$.ajax({ 
		type: "GET",
		url: "/profile",
		success: function(response) {
			if (response.success === true) {
				$('#formComment').addClass('active');
				$('#login-required').removeClass('active');
				$('#id_account').val(response.customer.id);
				$('#id-user').val(response.customer.id);
				$('#image_account').attr('src', response.customer.avatar);
				$('#avatar_account').val(response.customer.avatar);
				$('#fullname_account').val(response.customer.fullname);
				$('#fullname_account_comment').text(response.customer.fullname);
			} else {
				$('#login-required').addClass('active');
				$('#formComment').removeClass('active');
			}
			
		},
		error: function(xhr, status, error) {
			Toast.fire({
				icon: 'error',
				title: 'Đăng ký không thành công!'
			})
		}
	});

	
		$('#formComment').submit(function (e) {
			e.preventDefault();
			$.ajax({ 
				type: "POST",
				url: "/addComment",
				data: $(this).serialize(),
				success: function(response) {
					if(response.success === true) {
						$('.message-comment').html(`
						<span class="mt-4">Cảm ơn bạn đã để lại bình luận. Bình luận sẽ được xem xét trước khi hiển thị.</span>
						`);
					}else{
						Toast.fire({
							icon: 'error',
							title: 'Bình luận không thành công!'
						})
					}
					$('#comment').val("");
				},
				error: function(xhr, status, error) {
					Toast.fire({
						icon: 'error',
						title: 'Bình luận không thành công!'
					})
				}
			});
		});
	
});