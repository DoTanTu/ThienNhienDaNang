$(document).ready(function () {
    $.ajax({
        type: "GET", 
        url: "/profile", 
        success: function (response) {
          if(response.success == true){
            document.cookie = "isAuthLogined=true; path=/";
            $('#account-user').html(`
            <div class="user-icon active">
                <img src="${response.customer.avatar ? response.customer.avatar : "../public/app/images/person_default.png" }" alt="">
                <div class="top-user-link"> 
                    <span>${response.customer.fullname}</span> 
                    <ul class="top-user-dropdown"> 
                        <li><a href="/ca-nhan">Trang cá nhân</a></li>
                        <li><a href="/logout">Đăng xuất</a></li> 
                    </ul>
                </div>
            </div>
            `
            )
          }else{
            document.cookie = "isAuthLogined=false; path=/";
            $('#account-user').html(`
            <div class="user-icon active">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-lock" viewBox="0 0 16 16">
                    <path
                        d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
                </svg>
                <a href="/dang-nhap" onclick="redirectToLogin()">Đăng nhập</a> 
                / 
                <a href="/dang-ky">Đăng ký</a> 
            </div>
            `)
          }
        },
        error: function (error) {

          
        }
      });
});