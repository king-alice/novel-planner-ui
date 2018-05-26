'use strict';

describe('myApp.views module', function() {

  beforeEach(module('myApp.views'));

  describe('views controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var novelctrl = $controller('NovelController');
      expect(novelctrl).toBeDefined();
    }));

  });
});