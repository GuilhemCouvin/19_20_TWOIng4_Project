var express = require('express');
var router = express.Router();

var Sensor = require('./../models/Sensor');

/* GET users listing. */
// router.get('/', (req, res) => {
//   User.find({}).populate('location').then(users => {
//     res.render('respond with a resource'); //Envoie la data récupérée à l'affichage
//   })
// });

/* GET sensors listing. */
router.get('/', (req, res) => {
  //res.send('respond with a resource');
  Sensor.find(function(err,sensors){
    if(err){
      console.log(err);
    }else{
      res.json(sensors);
    }
  });
});

/* GET one sensor.*/
router.route('/:id').get(function(req, res) {
  let id = req.params.id;
  console.log(id);
  Sensor.find({_id:id},function(err,sensor){
    res.json(sensor);
    console.log(sensor);
  }); 
});

/* POST sensors listing. */
router.post('/add', (req, res) => {
  let sensor = new Sensor(req.body);
  sensor.save()
      .then(sensor => {
    res.status(200).json({'sensor':'sensor added succesfully !'});
  })
  .catch(err => {
    res.status(400).send('adding new sensor failed');
  });
});

/* UPDATE one sensor*/
router.route('/update/:id').post(function(req, res) {
  Sensor.findById(req.params.id,function(err,sensor){
    if(!sensor){
      res.status(404).send('Data not found');
    }else{
      sensor.userID = req.body.userID;
      sensor.location = req.body.location;
      sensor.creationDate = req.body.creationDate;

      sensor.save().then(sensor => {
        res.json('Sensor updated');
      })
      .catch(err => {
        res.status(400).send('Update not possible');
      });
    }
  });
});


module.exports = router;
