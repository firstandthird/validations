(function(){
  var root = this;

  var alphaSize = function(text) {
    var count = 0;
    var lower, upper, number, symbol, symbol2;
    lower = upper = number = symbol = symbol2 = false;
    var other = '';
    var i, c;

    for(i = 0, c = text.length; i < c; i++) {
      if(!lower && /[a-z]/.test(text)) {
        count += 26;
        lower = true;
      } else if(!upper && /[A-Z]/.test(text)) {
        count += 26;
        upper = true;
      } else if(!number && /\d/.test(text)) {
        count += 10;
        number = true;
      } else if(!symbol && '!@#$%^&*()'.indexOf(text) > -1) {
        count += 10;
        symbol = true;
      } else if(!symbol2 && '~`-_=+[]{}\\|;:\'",.<>?/'.indexOf(text) > -1) {
        count += 22;
        symbol2 = true;
      } else if(other.indexOf(text) === -1) {
        count++;
        other += text;
      }
    }

    return count;
  };

  var trimString = function(text) {
    return text.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  };

  var validations = function(customValidators) {
    var validator;

    if(typeof customValidators === 'object') {
      for(validator in customValidators) {
        if(!validations[validator]) {
          validations[validator] = customValidators[validator];
        }
      }
    }

    return this;
  };

  validations.validate = function(input, pattern, type) {
    var result = {
      valid: false,
      type: type || 'validate'
    };

    if(pattern instanceof RegExp) {
      result.valid = pattern.test(input);
    } else if(typeof pattern === 'string') {
      result.valid = pattern === input;
    } else if(typeof pattern === 'function') {
      result.valid = pattern(input);
    }

    return result;
  };

  validations.required = function(input) {
    return validations.validate(input, function(text) {
      var type = typeof text;

      if(type === 'undefined' || text === null) {
        return false;
      }

      if(text instanceof Array) {
        return text.length > 0;
      }

      if(type === 'string') {
        return trimString(text).length > 0;
      }

      if(type === 'object') {
        
        for(var i in text) {
          if(text.hasOwnProperty(i)) {
            return true;
          }
        }

        return false;
      }

      return true;
    }, 'required');
  };

  validations.slug = function(input) {
    return validations.validate(input, /^[a-z0-9-]+$/, 'slug');
  };

  validations.email = function(input) {
    return validations.validate(input.toLowerCase(), /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'email');
  };

  validations.password = function(input, method) {
    method = method || function(text) {
      return text.length > 5;
    };

    return validations.validate(input, method, 'password');
  };

  validations.passwordConfirm = function(input, confirm) {
    return validations.validate(input, confirm, 'password-confirm');
  };

  validations.passwordStrength = function(password, secureThreshold) {
    if(!password.length) return 0;

    // Sets default threshold to NIST (SP 800-63) recommended 80bit.
    secureThreshold = secureThreshold || 80;

    var entropy = (password.length * Math.log(alphaSize(password))) / Math.log(2);
    var bits = Math.round(entropy * 100) / 100;

    if(bits > secureThreshold) bits = secureThreshold;

    return ~~((bits / secureThreshold) * 100);
  };

  validations.maxLength = function(input, length) {
    length = length || 0;

    return validations.validate(input, function(text) {
      var type = typeof text;

      if(type === 'undefined' || text === null) {
        return false;
      }

      if(text instanceof Array || type === 'string') {
        return text.length <= length;
      }

      return false;
    }, 'maxLength');
  };

  validations.url = function(input) {
    return validations.validate(input, function(text) {
      return (/^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/gi).test(text);
    }, 'url');
  };

  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = validations;
    }
    exports.validations = validations;
  } else {
    root.validations = validations;
  }


}());
