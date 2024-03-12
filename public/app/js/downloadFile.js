
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
            console.error("Like failse", error);
            }
        });
    };

    $(document).on('click', 'a[data-action="downloadImage"]', function (e) {

        if(isUserLogin === 'true'){
            e.preventDefault();
            var imageUrl = $(this).attr('href');
            var downloadLink = $('<a>', { href: imageUrl , download : imageUrl});
            $('body').append(downloadLink);
            downloadLink[0].click();
            downloadLink.remove();
        }else{
            modalLogin.modal('show');
        }
    });



