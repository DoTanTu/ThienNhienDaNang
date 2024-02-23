// alert('baby')

// init Isotope
var $grid = $('.filer-box').isotope({
    // options
});
// filter items on button click
$('.test-btn').on('click', 'button', function () {
    var filterValue = $(this).attr('data-filter');
    $grid.isotope({
        filter: filterValue
    });
});

// change is-checked class on buttons
$('.button-group').each(function (i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function () {
        $buttonGroup.find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
    });
});


// test
console.log('hello')
console.log('oiupouoiuo')