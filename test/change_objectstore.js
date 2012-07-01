describe('Changed Object Store', function() {
  'use strict';

  var osName = 'foo',
      client = gazel.createClient(osName);

  var isTrue = function(done) {
    return function(truthy) {
      done(assert.ok(truthy, 'Not the case'));
    };
  };

  var setGet = function(done, key, value, test) {
    client.set(key, value, function(res) {
      client.get(key, function(val) {
        isTrue(done)(test(res, val));
      });
    });
  };

  it('should return ints when set as ints', function(done) {
    var val = 45;
    setGet(done, 'foo', val, function(setRep, getRep) {
      return getRep === val;
    });
  });
});

