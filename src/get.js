Client.prototype.get = function(key, callback) {
  var self = this;

  this.register(function(cb) {
    openDatabase(function(db) {

      var tx = self.trans.get('read', undefined);
      if(!tx) {
        tx = db.transaction([gazel.osName], IDBTransaction.READ);
        tx.onerror = onerror;

        self.trans.set('read', tx);
      }

      var req = tx.objectStore(gazel.osName).get(key);
      req.onerror = self.handleError.bind(self);
      req.onsuccess = function (e) {
        cb.call(self, e.target.result);
      };

    }, self.handleError.bind(self));

  }, callback);

  return this;
};
