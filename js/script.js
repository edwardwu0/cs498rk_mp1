$(document).ready(function() {
    //Store original height of navBar
    var navBar = $('nav.main');
    jQuery.data(navBar, 'oHeight', navBar.height());

    $('ul#menu-main li a').on('click', function(event) {

        var target = $($(this).attr('href'));

        if (target.length) {
            var navBarHeight = jQuery.data(navBar, 'oHeight');
            event.preventDefault();

            $('body,html').animate({
                scrollTop: target.offset().top - navBarHeight * 0.5
            }, 500);
        }
    });

    $(window).scroll(function() {
        var position = $(this).scrollTop();
        //console.log(position);
        var navBarHeight = jQuery.data(navBar, 'oHeight');

        console.log(navBarHeight);

        /*if (position > navBarHeight) {
            navBar.stop().animate({
                height: navBarHeight * 0.5
            }, 500);
        } else*/
        if (position <= navBarHeight * 0.5 && position >= 0) {
            navBar.stop().height(navBarHeight - position);
        } else if (position > navBarHeight ) {
            navBar.stop().animate({
                height: navBarHeight * 0.5
            }, 500);
        }
    });
});