var express = require('express');
var router = express.Router();

var User = require('./../models/User');

/* GET users listing. */
// router.get('/', (req, res) => {
//   User.find({}).populate('location').then(users => {
//     res.render('respond with a resource'); //Envoie la data récupérée à l'affichage
//   })
// });

/* GET users listing. */
router.get('/', (req, res) => {
  //res.send('respond with a resource');
  User.find(function(err,users){
    if(err){
      console.log(err);
    }else{
      res.json(users);
      console.log(users);
    }
  });
});

/* GET one user.*/
router.route('/:id').get(function(req, res) {
  let id = req.params.id;
  console.log('route',id);
  User.findById(id,function(err,user){
    res.json(user);
  }); 
});

/* POST users listing. */
router.route('/add').post((req, res) => {
  let user = new User(req.body);
  console.log(req.body);
  user.save()
      .then(user => {
    res.status(200).json({'user':'user added succesfully !'});
  })
  .catch(err => {
    return res.status(400).send('adding new user failed');
  });
});


/* DELETE one user.*/
router.route('/delete/:id').post(function(req, res) {
  User.findByIdAndDelete(req.params.id,function(err,user){
    if(!user){
      res.status(400).send('User not found');
    }else{
      res.json(`User removed succesfully !`);
    }
  }); 
});

module.exports = router;
