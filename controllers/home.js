const router = require("express").Router();
const Project = require("../models/Project");
const Activity = require("../models/Activity");
const withAuth = require("../utils/auth");

router.get("/", (req, res) => {
  try {
    res.render("login");
  } catch (error) {
    res.status(500).send(error);
  }
});

router.get("/activitieFormRender/:projectId/:userId", async (req, res) => {
  try {
    if (req.session.logged_in) {
      const userId = req.params.userId;
      const projectData = await Project.findAll({
        where: {
          id: req.params.projectId,
        },
      });
      const projectDataPlain = projectData.map((project) =>
        project.get({ plain: true })
      );
      const projects = [
        {
          projectId: req.params.projectId,
          name: `${projectDataPlain[0].name}`,
        },
      ];
      res.render("activitiesForm", {
        projects,
        userId,
      });
      return;
    }

    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

//search activities from a specific project (user)
router.get(
  "/projectActivitiesTableRender/:projectId/:userId",
  async (req, res) => {
    try {
      if (req.session.logged_in) {
        const userId = req.params.userId;
        const projectData = await Project.findAll({
          where: {
            id: req.params.projectId,
          },
        });
        const projectDataPlain = projectData.map((project) =>
          project.get({ plain: true })
        );
        const projects = [
          {
            projectId: req.params.projectId,
            name: `${projectDataPlain[0].name}`,
          },
        ];

        // Get all activites from a project
        const activityData = await Activity.findAll({
          where: {
            projectId: req.params.projectId,
          },
        });

        const activities = activityData.map((project) =>
          project.get({ plain: true })
        );
        console.log("activities", activities);

        res.render("projectActivitiesTable", {
          activities,
          projects,
          userId,
        });
        return;
      }

      res.render("login");
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

router.get("/login", (req, res) => {
  // // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/calendar");
    return;
  }

  res.render("login");
});

router.get("/calendar", withAuth, (req, res) => {
  if (req.session.logged_in) {
    res.render("calendar", {
      logged_in: req.session.logged_in,
      user_logged: req.session.user_id,
    });
    return;
  }

  res.render("login");
});

module.exports = router;
