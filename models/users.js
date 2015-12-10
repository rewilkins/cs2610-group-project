var assert = require('assert')
var db = require('../db')

exports.insert = function(user, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Insert a user
  collection.insert(user, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    assert.equal(1, result.ops.length)
    callback(result)
  })
}

exports.find = function(id, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Find a user
  collection.findOne({'_id': id}, function(err, document) {
    console.log(document)
    assert.equal(err, null)
    callback(document)
  })
}
exports.appendTags = function(user, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Update the user
  collection.update({'_id': user._id}, {$addToSet: {'tags': user.tags}}, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    callback()
  })
}

exports.update = function(user, callback) {
  // Get the users collection
  var collection = db.get().collection('users')
  // Update the user
  collection.update({'_id': user._id},{$set: user}, function(err, result) {
    assert.equal(err, null)
    assert.equal(1, result.result.n)
    callback()
  })
}
