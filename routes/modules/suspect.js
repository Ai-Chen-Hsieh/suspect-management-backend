const express = require('express');
const router = express.Router();
const Suspect = require('../../model/suspect');
router.get('/', (req, res) => {
  Suspect.find()
    .lean()
    .then((suspects) => {
      const statusPriority = {
        "wanted": 1,
        "arrested": 2,
        "normal": 3,
        "released": 4
      };
      
      const sortedSuspects = suspects.sort((a, b) => {
        return statusPriority[a.status] - statusPriority[b.status];
      });
      res.json(sortedSuspects);
    })
    .catch((error) => console.log(error));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Suspect.findById(id)
    .lean()
    .then((suspect) => {
      res.json(suspect);
    })
    .catch((error) => console.log(error));
});

router.put('/:id', (req, res) => {
  const { status, priority } = req.body;
  const { id } = req.params;

  Suspect.findById(id)
  .then(crime => {
    console.log("crime", crime)
    console.log("status", status, "priority", priority)

    if(status) {
      console.log("有status", status)
      crime.status = status;
      if(crime.status === "arrested") {
        crime.arrestedCount += 1;
      }
  
      if(crime.status === "wanted" && crime.priority === false) {
        crime.priority = true;
      }
    }

    if(priority !== undefined){
      console.log("有priority", priority)
      crime.priority = priority;
    }
    

    return crime.save()
  })
  .then((crime) => {
    res.json(crime);
  })
  .catch(error => console.log(error))
});

module.exports = router;
