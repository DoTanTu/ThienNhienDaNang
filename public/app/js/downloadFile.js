
    const modalLogin = $('#signInModal');

    $(document).on('click', 'a[data-action="download"]', function(e){
        e.preventDefault();
        if(isUserLogin === 'true'){
            const modal = $('#downloadModal');
            let pathFile = $(this).data('path') || null;
            modal.find('a[name="downloadFile"]').attr('href', "../" + pathFile);
            modal.find('a[name="downloadFile"]').on('click', function(){
                modal.modal('hide');
            });
            modal.modal('show');
        }else{
            modalLogin.modal('show');
        }
    });

    $(document).on('click', 'a[data-action="#downloadDocument"]', function(e){
        e.preventDefault();
        if(isUserLogin === 'true'){
            const modal = $('#downloadFileModal');
            let pathFile = $(this).data('src-file') || null;
            let productId = $(this).data('file-id') || null;
            modal.find('a[name="downloadFile"]').attr('href', "../" + pathFile);
            modal.find('a[name="downloadFile"]').attr('onclick', "downloadDocument('"+ productId + "')");
            modal.find('a[name="downloadFile"]').on('click', function(){
                modal.modal('hide');
            });
            modal.modal('show');
        }else{
            modalLogin.modal('show');
        }
    });

    $(document).on('click', 'i[data-action="like"]', function (e) {
        e.preventDefault();
        if(isUserLogin === 'true'){
            $(this).toggleClass('bi-suit-heart bi-suit-heart-fill');
            submitLike();
        }else{
            modalLogin.modal('show');
        }
    });

    function submitLike() {
        $.ajax({
            type: "POST", 
            url: "/likes",  
            data: { productId: $('i[data-action="like"]').data('post-id')},  
            success: function(response) {
                $('#likeCustomer').text(response.total);
            },
            error: function(error) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Xảy ra lỗi",
                    showConfirmButton: false,
                    backdrop: `
                    rgb(192,192,192, 0.4)
                    no-repeat
                    `,
                    timer: 3000
                });
            }
        });
    };

    $(document).on('click', 'a[data-action="downloadImage"]', function (e) {
        var imageName = $('#namePost').val();
        if(isUserLogin === 'true'){
            e.preventDefault();
            var imageUrlCurrent = $(this).attr('href');
            var downloadLink = $('<a>', { href: imageUrlCurrent , download : imageName});
            $('body').append(downloadLink);
            downloadLink[0].click();
            downloadLink.remove();
        }else{
            modalLogin.modal('show');
        }
    });



