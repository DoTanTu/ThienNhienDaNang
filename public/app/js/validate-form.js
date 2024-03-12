    Validator({
        form: '#form_contact',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
        Validator.isRequired('#name', 'Vui lòng nhập tên!'),
        Validator.isRequired('#email', 'Vui lòng nhập Email!'),
        Validator.isEmail('#email', 'Nhập đúng định dạng email!'),
        Validator.isRequired('#note', 'Vui lòng nhập nội dung!'),
        ],
        onSubmit: function(data) {
        var serializedData = $.param(data);
        $.ajax({
                type: "POST",
                url: "/addMessage",
                data: serializedData,
                success: function (response) {

                    Swal.fire({
                    position: "center-center",
                    icon: "success",
                    title: "Đã gửi thông tin thành công!",
                    showConfirmButton: false,
                    timer: 2000
                    });
                    document.getElementById("form_contact").reset();
                },
                error: function (xhr, status, error) {
                    // Xử lý lỗi
                }
            });
        }
    });

    Validator({
        form: '#dongGopForm',
        formGroupSelector: '.form-group',
        errorSelector: '.form-message',
        rules: [
        Validator.isRequired('input[name="fullname"]', 'Vui lòng nhập tên!'),
        Validator.isRequired('input[name="copyright"]', 'Vui lòng nhập tác quyền!'),
        Validator.isRequired('input[name="phone"]', 'Vui lòng nhập số điện thoại!'),
        ],
        onSubmit: function(dataForm) {
            const customer = {
                customerId:  $('input[name="customerId"]').val(),
                fullname:  $('input[name="fullname"]').val(),
                copyright:  $('input[name="copyright"]').val(),
                phone: $('input[name="phone"]').val(),
                address:  $('input[name="address"]').val(),
                email:  $('input[name="email"]').val(),
            }
    
            const filesInput = [];
            $('.uploadItem').each(function(index) {
                filesInput.push({
                    name: $(this).find('span .name-image').text(),
                    title: $(this).find('input[name="title"]').val(),
                    file: $(this).find('img').data('src'),
                    content: $(this).find('textarea[name="note"]').val(),
                    date: $(this).find('input[name="date"]').val(),
                    address: $(this).find('input[name="address"]').val(),
                })
            });
            
            const data = {
                title: $('input[name="titleGeneral"]').val(),
                customer: customer,
                type: isRadioButtonSelected(),
                content:$('textarea[name="noteGeneral"]').val(),
                date: $('input[name="dateGeneral"]').val(),
                address: $('input[name="addressGeneral"]').val(),
                files: filesInput
            };
    
            $.ajax({
                url: 'addContribute',
                type: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: function(response) {
                    if(response.success === true){
                        $('#thankModal').modal('show');
                    }else{
                        alert('Xảy ra lỗi trong quá trình đóng góp');
                    }
                },
                error: function(error) {
                    alert('Xảy ra lỗi trong quá trình đóng góp');
                }
            });
        }
    });

    var isRadioButtonSelected = function () {
        let selectedType = null;
        $('input[name="dongGopFile"]').each(function() {
            const isChecked = $(this);
            if (isChecked.prop('checked')) {
                const selectedRadioId = isChecked.attr('id');
                if (selectedRadioId === 'dongGopImg') {
                    selectedType = 'image';
                } else if (selectedRadioId === 'dongGopVid') {
                    selectedType = 'video';
                } else if (selectedRadioId === 'dongGopDoc') {
                    selectedType = 'document';
                }
            }
        });
        return selectedType;
    };