var express = require('express');
var router = express.Router();

var Measure = require('./../models/Measure');

/* GET users listing. */
// router.get('/', (req, res) => {
//   User.find({}).populate('country').then(users => {
//     res.render('respond with a resource'); //Envoie la data récupérée à l'affichage
//   })
// });

/* GET measures listing. */
router.get('/', (req, res) => {
  //res.send('respond with a resource');
  Measure.find(function(err,measures){
    if(err){
      console.log(err);
    }else{
      res.json(measures);
    }
  });
});

/* GET one measure.*/
router.get('/:id', function(req, res) {
  let id = req.params.id;
  Measure.findById(id,function(err,measure){
    res.json(measure);
    console.log(measure);
  }); 
});


/* DELETE one measure.*/
router.delete('/:id', function(req, res) {
  let id = req.params.id;
  Measure.findByIdAndDelete(id,function(err,measure){
    res.send(`Measure:${measure} removed succesfully !`);
  }); 
});

/* UPDATE one measure*/
router.route('/update/:id').post(function(req, res) {
  Measure.findById(req.params.id,function(err,measure){
    if(!measure){
      res.status(404).send('Data not found');
    }else{
      measure.measureID = req.body.measureID;
      measure.type = req.body.type;
      measure.creationDate = req.body.creationDate;
      measure.value = req.body.value;
      measure.sensorID = req.body.sensorID;

      measure.save().then(measure => {
        res.json('Measure updated');
      })
      .catch(err => {
        res.status(400).send('Update not possible');
      });
    }
  });
});



/* POST measures listing. */
router.post('/add', (req, res) => {
  let measure = new Measure(req.body);
  measure.save()
      .then(measure => {
    res.status(200).json({'measure':'measure added succesfully !'});
  })
  .catch(err => {
    res.status(400).send('adding new measure failed');
  });
});

module.exports = router;
