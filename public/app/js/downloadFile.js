var modalDownloadConfirmation = function(){
    $(document).on('click', 'a[data-action="download"]', function(e){
        e.preventDefault();
        if(getCookie('isAuthLogined') === 'true'){
            const modal = $('#downloadModal');
            let pathFile = $(this).data('path') || null;
            console.log(pathFile);
            modal.find('a[name="downloadFile"]').attr('href', "../" + pathFile);
            modal.find('a[name="downloadFile"]').on('click', function(){
                modal.modal('hide');
            });
            modal.modal('show');
        }else{
            const modalLogin = $('#loginRequiredModal');
            modalLogin.modal('show');
        }
    });
}();

