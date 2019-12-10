var express = require('express');
var router = express.Router();

var Sensor = require('./../models/Sensor');

/* GET users listing. */
// router.get('/', (req, res) => {
//   User.find({}).populate('country').then(users => {
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
      res.status(200).json({
        message: 'Sensors found!',
        sensors
      });
    }
  });
});

/* GET one sensor.*/
// router.get('/:id',(req,res)=>{
//   //Get id in params
//   const { id } = req.params;
//   //Find sensor id in DB
//   const sensor = _.find(sensors, ["id",id]);
//   //Return sensor
//   res.status(200).json({
//     message: 'sensor found!',
//     sensor
//   });
// });

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

module.exports = router;
