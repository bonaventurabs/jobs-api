const router = require('express').Router();
const bcrypt = require("bcrypt");
const fetch = require('cross-fetch');
const { PrismaClient } = require('@prisma/client')
const authToken = require('../services/authToken');

const prisma = new PrismaClient()


router.get('/', async (req, res, next) => {
  res.send({ message: 'Jobs API' });
});

router.post('/login', async (req, res, next) => {
  try{
    const user = await prisma.user.findUnique({
      where: {
        username: String(req.body.username)
      }
    })

    if (!user) {
      return next({
        status: 400,
        message: 'Authentication failed. User not found!',
      });
    }

    bcrypt.compare(req.body.password, user.password, function (err, isValid) {
      if (isValid && !err) {
        const userData = {
          id: user.id,
          email: user.username,
        };

        const token = authToken.generateAccessToken({ userData: userData })
        return res
          .cookie("access_token", token, {
            httpOnly: true,
            maxAge: 3*60*60*1000,
          })
          .json({
            success: true,
            username: user.username,
            access_token: token,
        });
      }
      else {
        return next ({
          status: 401,
          message: 'Authentication failed. Wrong password.',
        });
      }
    })
  } catch (err) {
    next (err)
  }
});

router.get('/jobs', authToken.authenticateToken, async (req, res, next) => {
  try {
    const acceptedFilters = ["description", "location", "full_time", "page"];
    const page = Number(req.query.page);
    const filters = req.query;

    for (key in filters) {
      if (!(acceptedFilters.includes(key))) {
        return next ({
          status: 400,
          message: 'Parameter not allowed!',
        });
      }
    }

    let url = "http://dev3.dansmultipro.co.id/api/recruitment/positions.json";

    fetch(url, {method: "GET"})
      .then(res => res.json())
      .then((json) => {
        const filteredJobs = json.filter(job => {
          let isValid = true;
          for (key in filters) {
            if (key == "page") {
              continue;
            }
            if (key == "full_time"){
              let isFullTime = filters["full_time"] == "true";
              isValid = isValid && (isFullTime) ? job["type"] == "Full Time" : job["type"] != "Full Time";
            } else {
              isValid = isValid && (job[key].search(new RegExp(filters[key], "i")) > -1);
            }
          }
          return isValid;
        });

        if (page) {
          const startIdx = (page-1)*10
          const endIdx = startIdx + 10
          const pagedfilteredJobs = filteredJobs.slice(startIdx, endIdx);
          res.send(pagedfilteredJobs)
        } else {
          res.send(filteredJobs);
        }        
      });
  } catch (err) {
    next (err)
  }
});

router.get('/jobs/:id', authToken.authenticateToken, async (req, res, next) => {
  try {
    const { id } = req.params

    let url = `http://dev3.dansmultipro.co.id/api/recruitment/positions/${id}`;

    fetch(url, {method: "GET"})
      .then(res => res.json())
      .then((json) => {
        res.send(json);
      });
  } catch (err) {
    next (err)
  }
});

module.exports = router;
