$=jQuery;

$( document ).ready(function() {
    jQuery('.main-navigation').meanmenu({
        meanMenuContainer: '.menu-holder',
        meanScreenWidth:"767"
    });

    jQuery('.content-area, .widget-area').theiaStickySidebar({
        // Settings
        additionalMarginTop: 30
    });
    
    $(window).scroll(function(){
        var scrollheight =400;
        if( $(window).scrollTop() > scrollheight ) {
            $('.back-to-top').fadeIn();
        }
        else {
            $('.back-to-top').fadeOut();
        }
    });

    $('#banner-slider').owlCarousel({
        loop:true,
        margin:0,
        nav:true,
        dots:false,
        /*autoplay:true,
        autoplayTimeout:2000,
        autoplayHoverPause:true,*/
        responsive:{
            0:{
                items:1
            },
            600:{
                items:1
            },
            1000:{
                items:1
            }
        }
    })
});

