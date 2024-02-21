/********************************************************************************
*  WEB322 - Assignment 03
* 
*  I declare that this assignment is my own work in accordance with Seneca's
*  Academic Integrity Policy:
* 
*  https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
* 
*  Name: Dev A. Surati Student ID: 117958223 Date: 24-02-16
*  Published URL: https://dark-jade-gopher-veil.cyclic.app
********************************************************************************/

const express = require('express');
const app = express();
const path = require("path");
const legoData = require("./modules/legoSets");
const HTTP_PORT = process.env.PORT || 8080
app.use(express.static("public"));

legoData.initialize()
  .then(() => {
    app.listen(HTTP_PORT, () => {
      console.log(`Server is initialized on port http://localhost:${HTTP_PORT}`);
    });
  })
  .catch(error => {
    console.error('Failed to initialize legoData:', error);
  });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get('/about', (req, res)=>{ 
  res.sendFile(path.join(__dirname, "/views/about.html"));
});

app.get('/lego/sets', (req, res) => {
  const theme = req.query.theme;

  if (theme) {
    legoData.getSetsByTheme(theme)
      .then(sets => {
        if (sets.length > 0) {
          res.json(sets);
        } else {
          res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
        }
      })
      .catch(error => {
        res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
      });
  } else {
    legoData.getAllSets()
      .then(sets => {
        res.json(sets);
      })
      .catch(error => {
        res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
      });
  }
});

app.get('/lego/sets/:set_num', (req, res) => {
  const setNum = req.params.set_num;

  legoData.getSetByNum(setNum)
    .then(sets => {
      if (sets) {
        res.json(sets);
      } else {
        res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
      }
    })
    .catch(error => {
      res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
    });
});

app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "/views/404.html"));
});