$(document).ready(function () {
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