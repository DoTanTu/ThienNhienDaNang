$(document).ready(function () {
	$('#formAuthentication').submit(function (e) {
		e.preventDefault();
		$.ajax({ 
			type: "POST",
			url: "/login",
			data: $(this).serialize(),
			success: function(response) {
				if(response.success === true) {
					window.location.href = "./";
				}else{
					Toast.fire({
						icon: 'error',
						title: 'Đăng nhập không thành công!'
					})
				}
			},
			error: function(xhr, status, error) {
				Toast.fire({
					icon: 'error',
					title: 'Đăng nhập không thành công!'
				})
			}
		});
	});
});