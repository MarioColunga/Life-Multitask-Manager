const router = require('express').Router();

const Profile = require('../../models/Profile');

router.put('/:userId', (req, res) => {
  //Calls the update method on the Book model
  Profile.update(
    {
      // All the fields you can update and the data attached to the request body.
      userName: req.body.userName,
      lastName: req.body.lastName,
      email: req.body.email,
      userPassword: req.body.userPassword
    },
    {
      // Gets a book based on the book_id given in the request parameters
      where: {
        userId: req.params.userId,
      },
    }
  )
    .then((updatedProfile) => {
      res.json(updatedProfile);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Delete route for a book with a matching book_id
router.delete('/:userId', (req, res) => {
  // Looks for the books based book_id given in the request parameters
  Profile.destroy({
    where: {
      userId: req.params.userId,
    },
  })
    .then((deletedProfile) => {
      res.json(deletedProfile);
    })
    .catch((err) => res.json(err));
});






router.get('/', (req, res) => {
  // Get all books from the book table
  Profile.findAll().then((profileData) => {
    res.json(profileData);
  });
});

router.post('/', (req, res) => {

  console.log(req.body)
  
  Profile.create({
    userName: req.body.userName,
    lastName: req.body.lastName,
    email: req.body.email,
    userPassword: req.body.userPassword
  })
    .then((newProfile) => {
      // Send the newly created row as a JSON object
      res.json(newProfile);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE multiple profile
router.post('/seed', (req, res) => {
  // Multiple rows can be created with `bulkCreate()` and an array
  // This could also be moved to a separate Node.js script to ensure it only happens once
  Profile.bulkCreate([
    {
      userName: 'Mario',
      lastName: 'Colunga',
      email: 'mario_a71@hotmail.com',
      userPassword: 'rrjvnjweerjnjev',
    },
  ])
    .then(() => {
      res.send('Database seeded!');
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
