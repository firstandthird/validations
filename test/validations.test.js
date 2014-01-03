var validator = new validations({
  url: function(input) {
    return validations.validate(input, function(text) {
      return text.indexOf('htt') === 0;
    }, 'url');
  }
});

suite('validations', function() {
  test('required', function(){
    assert.ok(validations.required('test').valid);
    assert.ok(!validations.required('').valid);
  });

  test('email', function(){
    assert.ok(validations.email('email@example.com').valid);
    assert.ok(!validations.email('example.com').valid);
  });

  test('password', function(){
    assert.ok(validations.password('V3ZjuXLLxnUR9y').valid);
    assert.ok(!validations.password('pass').valid);
  });

  test('passwordConfirm', function(){
    assert.ok(validations.passwordConfirm('V3ZjuXLLxnUR9y', 'V3ZjuXLLxnUR9y').valid);
    assert.ok(!validations.passwordConfirm('pass', 'V3ZjuXLLxnUR9y').valid);
  });

  test('passwordStrength', function(){
    assert.ok(validations.passwordStrength('V3ZjuXLLxnUR9y') > 99);
    assert.ok(validations.passwordStrength('iEad2mc9E') > 50);
    assert.ok(validations.passwordStrength('pass') < 50);
  });

  test('custom: url', function(){
    assert.ok(validations.url('http://google.com').valid);
    assert.ok(validations.url('https://google.com').valid);
    assert.ok(!validations.url('google.com').valid);
  });
});
