var express = require('express');
var router = express.Router();
const db = require("../../model/helper");

router.get("/", (req, res) => {
  res.send("Welcome to the API");
});

// get all events
router.get("/events/", (req, res) => {
  db("SELECT eid, e.name, e.datefrom, e.dateto, closingdate as closing, e.location, e.status, e.images, e.description, e.contactname, e.contactnum, totalvolunteer, totalfunds, o.name as organization FROM events e INNER JOIN users u on uid = e.organizer_id inner join organizations o on oid = u.organization_id;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get all events by an organizer
router.get("/events/organizer/:id", (req, res) => {
  db("SELECT e.*, o.name as organization FROM events e INNER JOIN users u on uid = e.organizer_id inner join organizations o on oid = u.organization_id WHERE e.organizer_id = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get an event by event id
router.get("/events/:id", (req, res) => {
  db("SELECT e.*, o.name as organization_name FROM events e INNER JOIN users u on uid = e.organizer_id inner join organizations o on oid = u.organization_id WHERE eid = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// insert an event under an organizer
router.post("/events", function(req, res, next) {
  db("INSERT INTO events SET ?;", req.body)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}); 

//delete an event and anything that tied to the event i.e. volunteers
router.delete("/events/:id", function(req, res, next) {
  db("DELETE FROM volunteers WHERE event_id = ?; DELETE FROM events WHERE eid = ?;", [req.params.id,req.params.id])
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// update event
router.put("/events/:id", function(req, res, next) {
  db("UPDATE events SET ? WHERE eid = ?;", [req.body, req.params.id])
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get all organizations
router.get("/organizations/", (req, res) => {
  db("SELECT oid, name FROM organizations;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get an organization by id
router.get("/organizations/:id", (req, res) => {
  db("SELECT * FROM organizations WHERE oid = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get all volunteers/applicants by event
router.get("/volunteers/:id", (req, res) => {
  db("SELECT * FROM volunteers WHERE event_id = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get all volunteers under an organizer
router.get("/volunteers/organizers/:id", (req, res) => {
  db("SELECT v.*, e.name as Event, e.totalvolunteer FROM volunteers v inner join events e on v.event_id = e.eid inner join users u on e.organizer_id = u.uid where e.status = 'active' and organizer_id = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// get all volunteers/applicants by event id and application status
// status = 'approved' - this is a volunteer
// status = 'new' - this is a new volunteer applicant
router.get("/volunteers/:id/application-status/:status", (req, res) => {
  db("SELECT * FROM volunteers WHERE event_id = ? AND status = ?;", [req.params.id, req.params.status])
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

// insert an application to volunteer for an event
// when this is first inserted the status should be set to new
router.post("/volunteers", function(req, res, next) {
  db("INSERT INTO volunteers SET ?;", req.body)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
}); 

// update application status, date processed
router.put("/volunteers/:id", function(req, res, next) {
  db("UPDATE volunteers SET ? WHERE vid = ?;", [req.body, req.params.id])
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});

router.delete("/volunteers/:id", function(req, res, next) {
  db("DELETE FROM volunteers WHERE vid = ?;", req.params.id)
    .then(results => {
      res.send(results.data);
    })
    .catch(err => res.status(500).send(err));
});



module.exports = router;
