/* global fbq */

/**
 * FacebookPixelAdapter
 */
function FacebookPixelAdapter() {
    this.initialized = false;
    this.pixelId = null;
}

/**
 * Facebook pixel adapter
 * https://developers.facebook.com/docs/facebook-pixel/pixel-with-ads/conversion-tracking#advanced_match
 * @param {stirng} pixelId - The pixel id
 * @param {object} [configuration] - The employee who is responsible for the project.
 * @param {string} configuration.em - email
 * @param {string} configuration.fn - first name
 * @param {string} configuration.ln - last name
 * @param {string} configuration.ph - phone 16505551212
 * @param {string} configuration.ge - gender m or f
 * @param {string} configuration.db - date birth 19911226
 * @param {string} configuration.ct - city in lower case
 * @param {string} configuration.st - state two letter: ca
 * @param {string} configuration.zp - 5 digits postal code 94035
 */
FacebookPixelAdapter.prototype.init = function() {
    var args = [].slice.call(arguments);
    this.pixelId = args[0];
    /* eslint-disable */
    !function (f, b, e, v, n, t, s) {
      if (f.fbq) return; n = f.fbq = function () {
        n.callMethod ?
          n.callMethod.apply(n, arguments) : n.queue.push(arguments)
      };
      if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
      n.queue = []; t = b.createElement(e); t.async = !0;
      t.src = v; s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s)
    }(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
    /* eslint-enable */

    if (!this.pixelId || this.pixelId === '') {
        console.warn('Facebook Pixel: please insert pixel id for initializing');
        return;
    }
    // calling with 'init', pixelId, object
    args.unshift('init');
    fbq.apply(null, args);
    this.initialized = true;
};

FacebookPixelAdapter.prototype.isInitialized = function() {
    return this.initialized;
};
  
FacebookPixelAdapter.prototype.getPixelId = function() {
    return this.pixelId;
};

FacebookPixelAdapter.prototype.pageView = function() {
    if (!this.isInitialized()) {
        return;
    }
    fbq('track', 'PageView');
};

FacebookPixelAdapter.prototype.track = function(title, data) {
    if (!this.isInitialized()) {
        return;
    }
    fbq('track', title, data);
};

FacebookPixelAdapter.prototype.trackCustom = function(event, data) {
    if (!this.isInitialized()) {
        return;
    }
    fbq('trackCustom', event, data);
};

FacebookPixelAdapter.prototype.fbq = function() {
    if (!this.isInitialized()) {
        return null;
    }
    return fbq;
};
  
module.exports = FacebookPixelAdapter;