const router = require('express').Router();

const Project = require('../../models/Project');
const Profile = require('../../models/Project');

router.put('/:projectId', (req, res) => {
  //Calls the update method on the Book model
  Profile.update(
    {
      // All the fields you can update and the data attached to the request body.
      projectId: req.body.projectId,
      projectName: req.body.projectName,
      projectDescription: req.body.projectDescription,
      deadLine: req.body.deadLine

     
     
      },
    {
      // Gets a book based on the book_id given in the request parameters
      where: {
        projectId: req.params.projectId,
      },
    }
  )
    .then((updatedProject) => {
      res.json(updatedProject);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Delete route for a book with a matching book_id
router.delete('/:userId', (req, res) => {
  // Looks for the books based book_id given in the request parameters
  Project.destroy({
    where: {
      projectId: req.params.projectId,
    },
  })
    .then((deletedProject) => {
      res.json(deletedProject);
    })
    .catch((err) => res.json(err));
});


router.get('/', (req, res) => {
  // Get all books from the book table
  Profile.findAll().then((projectData) => {
    res.json(projectData);
  });
});

router.post('/', (req, res) => {

  console.log(req.body)
  
  Project.create({
    projectName: req.body.projectName,
    projectDescription: req.body.projectDescription,
    userId: req.body.userId,
    deadLine: req.body.deadLine,

  })
    .then((newProject) => {
      // Send the newly created row as a JSON object
      res.json(newProject);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE multiple profile
router.post('/seed', (req, res) => {
  // Multiple rows can be created with `bulkCreate()` and an array
  // This could also be moved to a separate Node.js script to ensure it only happens once
  Project.bulkCreate([
    {
    projectName: "Bajar de peso",
    projectDescription: "temporado de dieta y ejercicio, llegar al peso ideal",
    deadLine: "2022-06-26"
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
