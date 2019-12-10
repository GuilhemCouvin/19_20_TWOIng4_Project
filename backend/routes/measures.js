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
      res.status(200).json({
        message: 'Measures found!',
        measures
      });
    }
  });
});

/* GET one measure.*/
// router.get('/:id',(req,res)=>{
//   //Get id in params
//   const { id } = req.params;
//   //Find measure id in DB
//   const measure = _.find(measures, ["id",id]);
//   //Return measure
//   res.status(200).json({
//     message: 'measure found!',
//     measure
//   });
// });

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
