(function() {
  module.exports = (function() {
    var __all__, util;
    __all__ = {};
    util = function(x, y) {
      return __all__[x] = y;
    };
    util('dispose_image', function() {
      this.remove();
      return delete this;
    });
    return __all__;
  })();

}).call(this);
