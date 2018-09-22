$(document).ready(function () {
    slickCounter();
    slickProgress();
});

function slickCounter() {
    var $current = $('.counter-curr');
    var $all = $('.counter-all');
    var $slickElement = $('.video-list');

    $slickElement.on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
        var i = (currentSlide ? currentSlide : 0) + 1;
        $current.text(i+2);
        $all.text(slick.slideCount);
    });

    $slickElement.slick({
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        arrows: false
    });
}

function slickProgress() {
    var circle = $('.p-bar-circle');
    var $current = $('.counter-curr');
    var $all = $('.counter-all');

    function toNum(selector) {
        var input = selector.text();
        var output = parseInt(input);
        return output
    }

    var allSlide = toNum($all);
    var cSlide = toNum($current);

    var step = 100/(allSlide/3);

    $('.video-list').on('beforeChange', function (event,slick,currentSlide,nextSlide) {
        // console.log(toNum($current) + ' ' + typeof toNum($current));
        if(currentSlide > nextSlide) {
            console.log('to left');
        } else {
            console.log('to right');
        }
    })
}

$('.terms').click(function () {
    $(this).toggleClass('checked');
});

// send sotry form

$('#ss-send').click(function (e) {
    e.preventDefault();
    if($('#form-name').val().length < 1) {
        console.log('enter your name');
        return
    } else if($('#form-mail').val().length < 1) {
        console.log('enter your mail');
        return
    } else if($('#form-age').val().length < 1) {
        console.log('enter your age');
        return
    } else if($('.terms').hasClass('checked') == false) {
        console.log('confirm with terms of use');
        return
    } else {
        $('#send-story').submit();
    }
});

//popup init

$('.mgp-ss').magnificPopup({
    type: 'inline',
    modal: true,
    removalDelay: 300,
    mainClass: 'mfp-fade'
});

$('.mgp-sign').magnificPopup({
    type: 'inline',
    modal: true,
    removalDelay: 300,
    mainClass: 'mfp-fade'
});

$(document).on('click', '.popup-close', function (e) {
    e.preventDefault();
    $.magnificPopup.close();
});

//anchor link

$('#toTopAnchor').click(function () {
    $('html, body').animate({scrollTop:0}, 'slow');
});

//open video in popup

$('.open-play-popup').click(function (e) {
    e.preventDefault();
    $.magnificPopup.open({
        items: {
            src: '#playerPopup'
        },
        modal: false,
        type: 'inline',
        removalDelay: 500,
        mainClass: 'mfp-fade',
        closeOnBgClick: true,
        showCloseBtn: false
    })
});

//service radio button

$('.filter').click(function () {
    $('.filter').each(function () {
        $(this).removeClass('checked');
        $(this).find('.filter-radio-hidden').prop('checked', false);
    });
    $(this).addClass('checked').find('.filter-radio-hidden').prop('checked', true);
})

//dropdown menu

$('.dropdown-title').click(function () {
    $('.dropdown-menu').slideToggle(200,function () {
        $('.dropdown-carret').toggleClass('open')
    });
});

$(document).ready(function () {
    if($('.stories-section').length > 0){
        function imgAppr(selecor,img) {
            var hT = $(selecor).offset().top,
                hH = $(selecor).outerHeight(),
                wH = $(window).height(),
                wS = $(window).scrollTop();
            if (wS > (hT+hH-wH)){
                // $(img).animate({opacity : 1},1500)
                $(img).addClass('show');

            }
        }

        $(window).on('scroll',function () {
            imgAppr('#melissaScroll','#melissaImg');
            imgAppr('#bettyScroll','#bettyImg');
            imgAppr('#arnieScroll','#arnieImg');
            imgAppr('#seanScroll','#seanImg');
        });
    }
});

