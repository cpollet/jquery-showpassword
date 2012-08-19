/*
* ----------------------------------------------------------------------------
* A jQuery (> 1.3.0) plugin that allows users to trigger the transformation of
* a password field into a cleartext field and vice versa from a DOM event.
* 
* @name             jquery.showPassword
* @version          0.0.0
* @requires         jQuery > 1.3.0
* @author           Christophe Pollet - http://christophe.pollet.ch
* @license          MIT Licence - http://www.opensource.org/licenses/mit-license.php
*
* Thanks to Show Password from Jan Jarfalk (http://www.unwrongest.com) for the
* general idea.
* ----------------------------------------------------------------------------
*/

;(function($, window, undefined) {
  var document = window.document;
  
  var ShowPassword = function(element, options) {
    this.options   = $.extend({}, $.fn.showPassword.options, options);
    this.trigger   = $(element); // the trigger
    this.inputPwd  = null;       // the <input type="password">
    this.inputTxt  = null;       // the <input type="text">
    
    this.init();
  }
  
  ShowPassword.prototype = {
    init: function () {
      if (this.options.field != null) {
        this.inputPwd = $(this.options.field);
      } else {
        this.inputPwd = $(this.trigger.attr(this.options.attr));
      }
      
      this.inputTxt = this.clone();
      
      var instance = this;
      
      this.trigger.click(function(event) {
        return instance.changeState(event);
      });
      
      this.inputPwd.keyup(function() {
        instance.copyValue(instance.inputPwd, instance.inputTxt);
      })
      
      this.inputTxt
        .keyup(function() {
          if (!instance.valueEquals()) {
            instance.copyValue(instance.inputTxt, instance.inputPwd);
            instance.inputPwd.trigger('keyup');
          }
        })
        .blur(function() {
          if (!instance.valueEquals()) {
            instance.inputPwd.trigger('focusout');
          }
        });
      
      this.copyValue(this.inputPwd, this.inputTxt);
    },
    
    copyValue: function(from, to) {
      to.val(from.val());
    },
    
    valueEquals: function() {
      return this.inputTxt.val() == this.inputPwd.val();
    },
    
    changeState: function(event) {
      if (!this.options.before(event, this.trigger, this.inputPwd, this.inputTxt)) {
        return;
      }
      
      if (this.inputPwd.is(":visible")) {
        this.inputPwd.hide();
        this.inputTxt.show();
      } else {
        this.inputTxt.hide();
        this.inputPwd.show();
      }
      
      this.options.after(event, this.trigger, this.inputPwd, this.inputTxt);
    },
    
    clone: function() {
      var cloneName = this.options.clonePrefix + this.inputPwd.attr('name') + this.options.clonePostfix;
      var clone = $("input[name='" + cloneName + "']")[0];
      
      if (clone != undefined) {
        return $(clone);
      }
      
      clone = $("<input>").attr({
        'type':     'text',
        'class':    this.inputPwd.attr('class'),
        'style':    this.inputPwd.attr('style'),
        'size':     this.inputPwd.attr('size'),
        'name':     cloneName,
        'tabindex': this.inputPwd.attr('tabindex')
      });
      
      clone.insertAfter(this.inputPwd).toggle();
      
      return clone;
    }
  };
  
  $.fn.showPassword = function (options) {
    return this.each(function() {
      if (!$.data(this, 'plugin_showPassword')) {
        $.data(this, 'plugin_showPassword', new ShowPassword(this, options));
      }
    });
  };
  
  $.fn.showPassword.options = {
    attr: 'data-showpassword-field',
    clonePrefix: 'showPassword-',
    clonePostfix: '',
    field: null,
    before: function(event, trigger, pwd, txt) { return true; },
    after: function(event, trigger, pwd, txt) {}
  };
}(jQuery, window));
