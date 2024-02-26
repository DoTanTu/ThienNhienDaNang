$(document).ready(function (){
    $.ajax({
        type: "GET",
        url: "/profile",
        success : (response) => {
            if(response.success === true){
                $('#user-introduction').html(
                    `
                    <div class="cot-6-lg">
                        <label for="userName" class="form-label">Họ và tên:</label>
                        <input type="text" class="form-control off" id="userName" disabled placeholder="${response.customer.fullname}">
                    </div>
                    <div class="cot-6-lg">
                        <label for="userMail" class="form-label">Địa chỉ mail:</label>
                        <input type="email" class="form-control off" id="userMail" disabled placeholder="${response.customer.email}">
                    </div>
                    <div class="cot-6-lg">
                        <label for="userPhone" class="form-label">Số điện thoại:</label>
                        <input type="tel" class="form-control off" id="userPhone" disabled placeholder="${response.customer.phone}">
                    </div>
                    <div class="cot-6-lg">
                        <label for="userAdr" class="form-label">Địa chỉ:</label>
                        <input type="text" class="form-control off" id="userAdr" disabled placeholder="${response.customer.address}">
                    </div>
                    <div class="mb-3">
                        <label for="userDes" class="form-label">Về bản thân:</label>
                        <textarea class="form-control off" id="userDes" rows="3" disabled placeholder="${response.customer.description}"></textarea>
                    </div>
                    
                    <i class="cot-12 fs-6">(Chúng tôi sẽ chịu trách nhiệm bảo mật thông tin của bạn.)</i>
                    `
                ),
                $('#user-avatar').html(
                    `
                    <img class="userCoverBg" src="${response.customer.backgroundImage !== ('' || null || undefined) ? response.customer.backgroundImage : "https://source.unsplash.com/random/1200x800/?natural" } " alt="ảnh nền user">
                    <div class="userCoverAva">
                        <img src="${response.customer.avatar !== '' ? response.customer.avatar : "../public/app/images/person_default.png" }" alt="ảnh đại diện">
                        <h4 class="userNameTop br-line-2">Nguyễn Văn A</h4>
                        <p>@user999000</p>
                    </div>
                    `
                )
            }
        },
        error : (xhr, status , error) =>{

        }

    });
});