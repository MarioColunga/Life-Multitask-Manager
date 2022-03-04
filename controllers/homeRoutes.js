const router = require('express').Router();
const { User } = require('../models');
const Project = require('../models/Project');
const Profile = require('../models/Profile');
const Activity = require('../models/Activity');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/projectFormRender', async (req, res) => {
  try {
    res.render('projectForm');
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/activitieFormRender/:projectId', async (req, res) => {
  try {
<<<<<<< HEAD
    //Get project with the projectId
    const projectData = await Project.findAll({      
=======
    //Get project with projectId
    const projectData = await Project.findAll({
>>>>>>> main
      where: {
        projectId: req.params.projectId,
      },
    });
    const projectDataPlain = projectData.map((project) =>
      project.get({ plain: true })
    );
    //console.log('projectDataPlain',projectDataPlain);
    //console.log('projectData',projectData);

    const projects = [
      {
        projectId: req.params.projectId,
        projectName: `${projectDataPlain[0].projectName}`,
      },
    ];
    //console.log('projects plain',projects)
    res.render('activitiesForm', {
      projects,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/projectTableRender', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const projectData = await Project.findAll();
    res.json(projectData);
    //console.log('projectData',projectData);

    //res.render('activitiesForm');
  } catch (err) {
    res.status(500).json(err);
  }
});

<<<<<<< HEAD
//search projects from a specific profile (user)
router.get('/profileProjectTableRender/:profileId', async (req, res) => { 
  try {
    // Get all projects from a profile (user)
    const projectData = await Project.findAll({      
=======
router.get('/profileProjectTableRender/:profileId', async (req, res) => {
  try {
    // Get all projects and JOIN with profile data
    const projectData = await Project.findAll({
>>>>>>> main
      where: {
        userId: req.params.profileId,
      },
    });
    //res.json(projectData);
    //console.log('projectData',projectData);

    const projects = projectData.map((project) => project.get({ plain: true }));
    console.log('projects', projects);

    res.render('profileProjectsTable', {
      projects,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

<<<<<<< HEAD


//search activities from a specific project (user)
router.get('/projectActivitiesTableRender/:projectId', async (req, res) => { 
  try {
     //Get project with the projectId
     const projectData = await Project.findAll({      
      where: {
        projectId: req.params.projectId,
      }    
    });
    const projectDataPlain = projectData.map((project) => project.get({ plain: true }));   
    //console.log('projectDataPlain',projectDataPlain);
    //console.log('projectData',projectData);
    
    const projects= [{projectId: req.params.projectId, projectName: `${projectDataPlain[0].projectName}`},];
    //console.log('projects plain',projects)


    // Get all activites from a project
    const activityData = await Activity.findAll({      
      where: {
        projectId: req.params.projectId,
      }    
    });
    //res.json(projectData);
    //console.log('projectData',projectData);

    const activities = activityData.map((project) => project.get({ plain: true }));   
    console.log('activities',activities);

    res.render('projectActivitiesTable',{
      activities, projects
    });
  } catch (err) {
    res.status(500).json(err);
  }
  
});





=======
>>>>>>> main
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'],
        },
      ],
    });

    const project = projectData.get({ plain: true });

    res.render('project', {
      ...project,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Project }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // // If the user is already logged in, redirect the request to another route
  // if (req.session.logged_in) {
  //   res.redirect("/profile");
  //   return;
  // }
  console.log('login');
  res.render('login');
});

router.get('/calendar', withAuth, (req, res) => {
  // // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.render('calendar', {
      logged_in: req.session.logged_in,
    });
    return;
  }

  res.render('login');
});

module.exports = router;
