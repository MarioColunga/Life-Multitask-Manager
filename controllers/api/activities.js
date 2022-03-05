const router = require("express").Router();

const Activity = require("../../models/Activity");

router.put("/:activityId", (req, res) => {
  //Calls the update method on the Book model
  Activity.update(
    {
      // All the fields you can update and the data attached to the request body.

      activityName: req.body.activityName,
      activityDescription: req.body.activityDescription,
      activitydeadLine: req.body.activitydeadLine,
      startHour: req.body.startHour,
      endHour: req.body.endHour,
    },
    {
      // Gets a book based on the book_id given in the request parameters
      where: {
        activityId: req.params.activityId,
      },
    }
  )
    .then((updatedActivity) => {
      res.json(updatedActivity);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Delete route for a book with a matching book_id
router.delete("/:projectId", (req, res) => {
  Activity.destroy({
    where: {
      activityId: req.params.activityId,
    },
  })
    .then((deletedActivity) => {
      res.json(deletedActivity);
    })
    .catch((err) => res.json(err));
});

router.get("/", (req, res) => {
  Activity.findAll().then((activityData) => {
    console.log(res.json(activityData));
  });
});

router.post("/", (req, res) => {
  console.log("here");
  console.log(req.body);

  Activity.create({
    projectId: req.body.projectId,
    name: req.body.activityName,
    description: req.body.activityDescription,
    deadline: req.body.activityDeadLine,
    start: req.body.startHour,
    end: req.body.endHour,
  })
    .then((newActivity) => {
      // Send the newly created row as a JSON object
      res.json(newActivity);
    })
    .catch((err) => {
      res.json(err);
    });
});

// CREATE multiple profile
router.post("/seed", (req, res) => {
  // Multiple rows can be created with `bulkCreate()` and an array
  // This could also be moved to a separate Node.js script to ensure it only happens once
  Activity.bulkCreate([
    {
      activityName: "Nutriologo",
      activityDescription: "cita con el nutriologo",
      activitydeadLine: "2022-03-01",
      startHour: "11:30:00",
      endHour: "12:30:00",
    },
  ])
    .then(() => {
      res.send("Database seeded!");
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
