const express = require('express');
const router = require('express').Router();
const models = require("../db/db");
const Student = require('../db/models/student');
const Test = require('../db/models/test');
router.use(express.urlencoded({extended: false}));

router.get("/", async (req, res, next) => {
    try {
        const students = await Student.findAll();
        //console.log(students);
        res.send(students)
    } catch (error) { next(error)}

  });

  router.get("/:id", async (req, res, next) => {
      try {
          const student = await Student.findById(req.params.id);
//could use Student.findOne({
    // where: {
    //     id: req.params.id}
    //}
// })
          if (student === null) {
            res.status(404).end(); ///or res.sendStatus(404)
          }
         else { res.send(student);}


      } catch (error) { next(error)}
  })

  router.post("/", async (req, res, next) => {
      try {
          const newStudent = await Student.create(req.body);
            //   where: {
            //       firstName: req.body.firstName,
            //       lastName: req.body.lastName,
            //       email: req.body.email
            //   }
              //OR await Student.create(req.body)
              //request for a body (data we want to put in a database)
              //then it turns that info into an object with keys from input form

          res.status(201).send(newStudent);
      } catch (error) {next(error)}

    });

    router.put("/:id", async (req, res, next) => {
        try {
            const updatedStudent = await Student.update(req.body, {
                where: {id: req.params.id},
                returning: true,
                plain: true
            })
            res.send(updatedStudent[1])
        }
        catch(error){
            next(error)
        }
    })

    router.delete("/:id", async (req, res, next) => {
        try {
             await Student.destroy({
             where:  {id: req.params.id}
            })
      res.sendStatus(204);//// if ypu want to send a custom 204 page then do res.status(204).send
        } catch (error) {next(error)}
    })



module.exports = router;
