var FacebookPixelAdapter = require('../FacebookPixelAdapter');

describe('Facebook pixel adapter init', function(){
    var adapterInstance;
    beforeEach(function(){
        adapterInstance = new FacebookPixelAdapter();
    });
    afterEach(function(){
        window.fbq = null;        
    });

    it('Expect fbq to have been called with pixelId', function(){
        window.fbq = function(){}
        spyOn(window, 'fbq');
        adapterInstance.init('123456');
        expect(window.fbq).toHaveBeenCalledWith('init', '123456');
        expect(adapterInstance.isInitialized()).toEqual(true);
    });

    it('Expect init to have been called with pixel id and option params', function(){
        window.fbq = function(){}
        spyOn(window, 'fbq');
        adapterInstance.init('123456', { ln: 'mangia', fn: 'asd', em: 'email' });
        expect(window.fbq).toHaveBeenCalledWith('init', '123456', { ln: 'mangia', fn: 'asd', em: 'email' });
        expect(adapterInstance.isInitialized()).toEqual(true);
    });

    it('Expect isInitialized to be true', function(){
        window.fbq = function() { }
        spyOn(window, 'fbq');
        adapterInstance.init('123456');
        expect(window.fbq).toHaveBeenCalledWith('init', '123456');
        expect(adapterInstance.isInitialized()).toEqual(true);
    });

    it('Expect isInitialized to be false', function(){
        window.fbq = function() { }
        spyOn(window, 'fbq');
        adapterInstance.init('');
        expect(window.fbq).not.toHaveBeenCalled();
        expect(adapterInstance.isInitialized()).toEqual(false);
    });

});