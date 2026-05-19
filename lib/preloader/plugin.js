/*-------------------
  Name: Preloader plugin;
  Author: Mahbub;
-------------------*/
    $(window).on('load', function(){
      $('#ctn-preloader').addClass('loaded');
      $('body').delay(3000).removeClass('no-scroll-y');

      if ($('#ctn-preloader').hasClass('loaded')) {
        $('#preloader').delay(1000).queue(function() {
          $(this).remove();
        });
      }
    });