var validator = new validations({
  urlCustom: function(input) {
    return validations.validate(input, function(text) {
      return text.indexOf('htt') === 0;
    }, 'urlCustom');
  }
});

suite('validations', function() {
  test('required', function(){
    assert.ok(validations.required('test').valid);
    assert.ok(validations.required(['something']).valid);
    assert.ok(validations.required({something: 'value'}).valid);
    assert.ok(validations.required(1234).valid);
    assert.ok(validations.required(true).valid);
    assert.ok(validations.required(false).valid);
    assert.ok(validations.required(' test ').valid);
    assert.ok(!validations.required('').valid);
    assert.ok(!validations.required(null).valid);
    assert.ok(!validations.required().valid);
    assert.ok(!validations.required([]).valid);
    assert.ok(!validations.required().valid);
    assert.ok(!validations.required(' ').valid);
  });

  test('slug', function(){
    assert.ok(validations.slug('my-slug-2014').valid);
    assert.ok(!validations.slug('My-Slug-2014').valid);
    assert.ok(!validations.slug('my_slug-2014').valid);
    assert.ok(!validations.slug('my slug 2014').valid);
    assert.ok(!validations.slug('my-slug-2014!').valid);
  });

  test('email', function(){
    assert.ok(validations.email('email@example.com').valid);
    assert.ok(validations.email('Email@Example.com').valid);
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

  test('max length', function(){
    assert.ok(validations.maxLength('test', 5).valid);
    assert.ok(!validations.maxLength('test', 2).valid);
  });
  
  test('url', function(){
    assert.ok(validations.url('http://google.com').valid);
    assert.ok(validations.url('https://google.com').valid);
    assert.ok(validations.url('https://google.com?query=true').valid);
    assert.ok(!validations.url('google.com').valid);
  });

  test('custom: urlCustom', function(){
    assert.ok(validations.urlCustom('http://google.com').valid);
    assert.ok(validations.urlCustom('https://google.com').valid);
    assert.ok(!validations.urlCustom('google.com').valid);
  });
});
