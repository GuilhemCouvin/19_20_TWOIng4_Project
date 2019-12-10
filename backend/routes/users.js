var express = require('express');
var router = express.Router();

var User = require('./../models/User');

/* GET users listing. */
// router.get('/', (req, res) => {
//   User.find({}).populate('country').then(users => {
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
router.get('/:id',(req,res)=>{
  //Get id in params
  const { id } = req.params;
  //Find user id in DB
  const user = _.find(users, ["id",id]);
  //Return user
  res.status(200).json({
    message: 'User found!',
    user
  });
});

/* POST users listing. */
router.post('/add', (req, res) => {
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

module.exports = router;
