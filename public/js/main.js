$(document).ready(function() {
  // Place JavaScript code here...

    $(document).on("click",".wrapper-center",(function() {
      $(this).closest('.activity').addClass('active');
    }));
    $(document).on("click",".activity-close",(function() {
      $(this).closest('.activity').removeClass('active');
    }));

    $("#symbolPath").imagepicker({
      changed: function(oldValues, newValues){
        $select = $(this);
        $select.val(newValues).triggerNative("change");
      }
    });
});

//// Extends triggerEvent for browser native event. 
//// Default trigger() does not trigger our VueJs binding for activities.
(function($) {

    $.fn.triggerNative = function(eventName) {
        return this.each(function() {
            var el = $(this).get(0);
            triggerNativeEvent(el, eventName);
        });
    };

    function triggerNativeEvent(el, eventName){
      if (el.fireEvent) { // < IE9
        (el.fireEvent('on' + eventName));
      } else {
        var evt = document.createEvent('Events');
        evt.initEvent(eventName, true, false);
        el.dispatchEvent(evt);
      }
}

}(jQuery)); 

