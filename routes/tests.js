const router = require('express').Router();
// const express = require('express');
// const models = require("../db/db");
const Student = require('../db/models/student');
const Test = require('../db/models/test');
//router.use(express.urlencoded({extended: false}));

router.get("/", async (req, res, next) => {
    try {
        const tests = await Test.findAll();
        //console.log(students);
        res.send(tests)
    } catch (error) { next(error)}

  });

  router.get("/:id", async (req, res, next) => {
      try {
          const test = await Test.findById(req.params.id);
//could use Student.findOne({
    // where: {
    //     id: req.params.id}
    //}
// })
          if (test === null) {
            res.status(404).end(); ///or res.sendStatus(404)
          }
         else { res.send(test);}


      } catch (error) { next(error)}
  })

  router.post("/student/:studentId", async (req, res, next) => {
      try {
          const student = await Student.findById(req.params.studentId);
        const newTest = await Test.create(req.body);
          const studentTest = await newTest.setStudent(student);

          res.status(201).send(studentTest);
      } catch (error) {next(error);}

    })


    router.delete("/:id", async (req, res, next) => {
        try {
             await Test.destroy({
             where:  {id: req.params.id}
            })
      res.sendStatus(204);//// if ypu want to send a custom 204 page then do res.status(204).send
        } catch (error) {next(error)}
    })


module.exports = router;
