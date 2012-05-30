var chai = require('chai')
  , should = chai.should();

var Seed = require('seed')
  , RedisStore = require('seed-redis')
  , MongoStore = require('seed-mongodb');

var storeTests = require('./fixture/store');

describe('storage integrations', function () {

  describe('MemoryStore', function () {
    var store = new Seed.MemoryStore();
    storeTests(store);
  });

  describe('RedisStore', function () {
    var store = new RedisStore({ db: 2 });

    after(function (done) {
      store.client.flushdb();
      store.client.quit();
      done();
    });

    storeTests(store);
  });

  describe('MongoStore', function () {
    var store = new MongoStore({
        db: 'kinetik_test'
      , auto_connect: false
    });

    before(function (done) {
      store.connect(done);
    });

    after(function (done) {
      store.db.dropDatabase();
      store.close(done);
    });

    storeTests(store);
  });
});
