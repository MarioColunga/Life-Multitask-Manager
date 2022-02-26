const router = require('express').Router();

const Profile = require('../../models/Profile');
// CREATE a book
router.post('/', (req, res) => {
  
  Profile.create({
    Nombre: req.body.Nombre,
    LastName: req.body.LastName,
    email: req.body.email,
    UserPassword: req.body.UserPassword
  })
    .then((newBook) => {
      // Send the newly created row as a JSON object
      res.json(newBook);
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
      Nombre: 'Mario',
      LastName: 'Colunga',
      email: 'mario_a71@hotmail.com',
      UserPassword: 'rrjvnjweerjnjev',
    },
    {
      Nombre: 'Daniel',
      LastName: 'Moreno',
      email: 'wrvokwknv',
      UserPassword: 'wfoncptn',
    },
    {
      Nombre: 'Mariana',
      LastName: 'NA',
      email: 'kpwfkwm',
      UserPassword: 'wdvker',
    },
    {
      Nombre: 'Marco',
      LastName: 'NA',
      email: 'kpwsdcm',
      UserPassword: 'wddcr',
    },
    {
      Nombre: 'Marco',
      LastName: 'NA',
      email: 'kpwsdcm',
      UserPassword: 'wddcr'
    }
  ])
    .then(() => {
      res.send('Database seeded!');
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
