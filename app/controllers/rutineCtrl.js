var mongoose = require("mongoose");
var Rutine = require('../models/Rutine');
var Admin = require('../models/User');
var User = require('../models/User');
var Q = require('q');

var repository = {
  create: function (rutine) {
    var dfd = Q.defer();

    var nyRutine = new Rutine(rutine);

    nyRutine.save(function (err, savedRutine) {
      if (err) {
        dfd.reject(err);
        return;
      }

      User.findByIdAndUpdate({
          _id: rutine.assignment.assigned_to
        }, {
          $push: {
            rutiner: String(savedRutine._id)
          }
        }, {
          safe: true,
          upsert: true,
          new: true
        },
        function (err, savedUser) {
          if (err) {
            dfd.reject(err);
          } else {
            dfd.resolve(savedUser);
          }
        }
      );
    });
    return dfd.promise;
  },
  findRutiner : function (userId) {
    if (typeof user.rutiner !== 'object' || !user.rutiner.length) {
      return Q.resolve([]);
    }
    var deferred = Q.defer();
    Rutine.find({
      _id: {
        $in: user.rutiner
      }
    }, function (err, result) {
      if (err) {
        dfd.reject(err);
      } else {
        dfd.resolve(result);
      }
    });
    return deferred.promise;
  }
};

module.exports = {

  create: function (req, res) {
    console.log(req.body);

    repository.create(req.body)
      .then(function (savedUser) {
        res.send(savedUser);
      })
      .catch(function (err) {
        res.status(500).end();
      });
  },

  userRutines: function (req, res) {
    repository.findRutiner(req.params.userId)
      .then(function (savedUser) {
        res.send(savedUser);
      })
      .catch(function (err) {
        res.status(500).end();
      });
  },

  read: function (req, res) {
    Rutine.find({})
      .populate('assignment.assigned_to')
      .populate('assignment.assigned_by')
      .exec().then(function (found) {
        if (!found) {
          res.status(404).end();
        }
        res.send(found);
      });
  },

  readOne: function (req, res) {
    Rutine.findOne({
      _id: req.query.id
    }).exec().then(function (found) {
      if (!found) {
        res.status(404).end();
      }
      res.send(found);
    });
  },

  update: function (req, res) {
    Rutine.findByIdAndUpdate(req.params.rutineId, req.body, function (err, result) {
      if (err) {
        res.status(500).end();
      }
      res.send(result);
    });
  },

  delete: function (req, res) {
    var nyRutine = req.params.rutineId;
    console.log('rutine =======>', nyRutine);
    User.findOne({
      _id: req.user._id
    }).exec().then(function (found) {
      if (!found) {
        console.log('user not found !!');
        return res.status(404).json({
          message: "no user found"
        });
      } else {

        console.log(found.rutiner);

        found.rutiner.splice(found.rutiner.indexOf(nyRutine), 1);
        found.save(function (err, saved) {
          if (err) {
            res.Status(400).end();
          } else {
            Rutine.findByIdAndRemove(nyRutine, function (err, result) {
              if (err) {
                res.status(500).end();
              }
              res.send(saved);
            });
          }
        });



      }
    });
  },


  finish: function (req, res) {
    Rutine.findOne({
      _id: req.query.id
    }).exec().then(function (found) {
      if (!found) {
        console.log('rutine ikke funnet');
        return res.status(404).end();
      } else {
        var rut = found;

        rut.status.finished = true;
        rut.save(function (err, saved) {
          console.log(err, saved);
        });

        console.log('rutine found=============>', rut);
        console.log('rutine assigned_to=============', rut.assigned_to);

        User.findByIdAndUpdate(rut.assigned_to, {
            $push: {
              completed_rutiner: rut
            }
          }, {
            safe: true,
            upsert: true,
            new: true
          },
          function (err, saved) {
            if (err) {
              console.log("user not updated");
              return res.status(400).json({
                message: "user not updated"
              });
            } else {
              User.findOne({
                _id: rut.assigned_to
              }).exec().then(function (found) {
                if (err) {
                  return res.status(400).end();
                } else {
                  found.rutiner.splice(0, 1);
                  found.save(function (err, saved) {
                    if (err) {
                      return res.status(500).send(err);
                    } else {
                      res.send(saved);
                    }
                  });
                }
              });
            }
          });
      }
    });
  }

};