/**
 * @file
 * Placeholder file for custom sub-theme behaviors.
 *
 */
(function ($, Drupal) {

  /**
   * Use this behavior as a template for custom Javascript.
   */
  Drupal.behaviors.exampleBehavior = {
    attach: function (context, settings) {
      $(document).ready(function () {
        $("#header").sticky({ topSpacing: 0, zIndex: 450 });
        $(".home-first").enllax();
      });
      
      /* Facebook call */

      $('.purchase-button').on('click', function(e){
        fbq('track', 'InitiateCheckout');
      });

      /* Smooth scroll */
      $('a[href*="#"]')
      // Remove links that don't actually link to anything
      .not('[href="#"]')
      .not('[href="#0"]')
      .click(function(event) {
        // On-page links
        if (
          location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
          && 
          location.hostname == this.hostname
        ) {
          // Figure out element to scroll to
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          // Does a scroll target exist?
          if (target.length) {
            // Only prevent default if animation is actually gonna happen
            event.preventDefault();
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 400, function() {
              // Callback after animation
              // Must change focus!
              var $target = $(target);
              //$target.focus();
              if ($target.is(":focus")) { // Checking if the target was focused
                return false;
              } else {
                $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
                //$target.focus(); // Set focus again
              };
            });
          }
        }
      });

      /* Set active classes */
      $(window).on('scroll', function(){
        var win = $(window),
              windowPosition = win.scrollTop();
        // add activeClass to the div that is passing the top of the window
        
        $('.section').each(function() {
          var top = $(this).offset().top - 80,
              bottom = $(this).outerHeight(true) + top;
          if ((windowPosition >= top) && (windowPosition <= bottom)) {
              $('#nav').find('a[href*="#' + this.id + '"]').addClass('is-active');
          } else {
            $('#nav').find('a[href*="#' + this.id + '"]').removeClass('is-active').blur();
          }
        });
      });
      
      /* Preloader and animations */
      
      $(window).on('load', function () { // makes sure the whole site is loaded
        $('#status').fadeOut(); // will first fade out the loading animation
        $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
        $('body').delay(350).css({'overflow-y': 'visible'});
        $('#nav').find('a[href*="#"]').removeClass('is-active');
      });
    }
  };

})(jQuery, Drupal);
