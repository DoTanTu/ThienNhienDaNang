
// $(document).ready(function () {
// 	$('#formAuthentication').submit(function (e) {
// 		e.preventDefault();
// 		$.ajax({ 
// 			type: "POST",
// 			url: "/login",
// 			data: $(this).serialize(),
// 			success: function(response) {
// 				const refererUrlCookie = getCookie("referer_url");
// 				if(response.success === true) {
// 					if (refererUrlCookie) {
// 						const decodedUrl = atob(decodeURIComponent(refererUrlCookie));
// 						if(decodedUrl === 'dang-nhap'){
// 							window.location.href = '/'; 
// 						}else{
// 							window.location.href = decodedUrl;
// 							document.cookie = "referer_url=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
// 						}
// 					} else {
// 						window.location.href = '/'; 
// 					}
// 				}else{
// 					$('#errorLogin').html(`<span>Email hoặc Password không đúng!</span>`);
// 				}
// 			},
// 			error: function(xhr, status, error) {
// 				Toast.fire({
// 					icon: 'error',
// 					title: 'Đăng nhập không thành công!'
// 				})
// 			}
// 		});
// 	});
// });