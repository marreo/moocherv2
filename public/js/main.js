$(document).ready(function() {
  // Place JavaScript code here...

    $(document).on("click",".wrapper-center",(function() {
      $(this).closest('.activity').addClass('active');
    }));
    $(document).on("click",".activity-close",(function() {
      $(this).closest('.activity').removeClass('active');
    }));
});

