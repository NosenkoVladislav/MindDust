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
        $('.dropdown-carret').toggleClass('open');
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

//registration

$('#sign-send').click(function (e) {
    e.preventDefault();
    window.location.href = 'service.html';
});

$('#signUp-send').click(function (e) {
    e.preventDefault();
    window.location.href = 'service.html';
    // isEmpty();
    //
    // $('#signUpForm').find('.form-input').each(function () {
    //     isValid($(this));
    //     passMatch();
    // });
    //
    // // if(i === true) {
    // //     $('#signUpForm').submit();
    // // } else {
    // //     return
    // // }
    //
    // function isEmpty() {
    //     // $('#signUpForm').find('.form-input').each(function () {
    //     //     if($(this).val().length != 0 && passMatch() === true) {
    //     //         console.log('form can be send')
    //     //     } else {
    //     //         console.log('smth wrong')
    //     //     }
    //     // });
    //
    // }
    //
    // function isValid(selector) {
    //     if(selector.val().length < 2) {
    //         selector.on('input', function () {
    //             selector.prev().removeClass('throwed');
    //         });
    //         showError(selector);
    //     }
    // }
    //
    // function showError(selector) {
    //     selector.prev().addClass('throwed');
    // }
    //
    // function passMatch() {
    //     var pass = $('#regPass');
    //     var passConf = $('#regPassConf');
    //
    //     if(pass.val() != passConf.val()) {
    //         pass.prev().text('Passwords do not match').addClass('passErr');
    //         passConf.prev().text('Passwords do not match').addClass('passErr');
    //         return false
    //     } else if (pass.val() == passConf.val() && pass.val() != 0 && passConf.val() != 0){
    //         pass.prev().text('Please enter your password').removeClass('passErr');
    //         passConf.prev().text('Please enter your password').removeClass('passErr');
    //         return true
    //     }
    // }
});

$('#toLogin').click(function () {
    $.magnificPopup.open({
        items: {
            src: '#loginPopup'
        },
        modal: false,
        type: 'inline',
        removalDelay: 500,
        mainClass: 'mfp-fade',
        closeOnBgClick: true,
        showCloseBtn: false
    })
});

$('#toRegistration').click(function () {
    $.magnificPopup.open({
        items: {
            src: '#registrationPopup'
        },
        modal: false,
        type: 'inline',
        removalDelay: 500,
        mainClass: 'mfp-fade',
        closeOnBgClick: true,
        showCloseBtn: false
    })
});

$('#menuToggler').click(function () {
    if($(window).width() < 1100) {
        $('.links-list').toggleClass('open');
        $('.dropdown-menu').fadeOut(200)
    }
    if($(window).width() < 768) {
        $('.header-search').fadeToggle(100);
    }

});

$(window).on('resize',function () {
    if($(this).width() > 1100) {
        $('.links-list').addClass('open');
    } else {
        $('.links-list').removeClass('open');
    }

    if($(this).width() > 768) {
        $('.header-search').fadeIn(1);
    }

    if($(this).width() < 768) {
        $('.header-search').fadeOut(100);
    }

    $('.hamburger').removeClass('is-active');


})

