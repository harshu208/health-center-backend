const con = require('../config');
const SQL = require('sql-template-strings');
const { response } = require('express');
const { cond } = require('lodash');

module.exports.getBudgetDetails =   async function(req, res){
    console.log("Sending all budget details");
    con.query(SQL`SELECT * FROM financial_budget`,[],function (err, data) {
        if (err) {
            console.log("Error : " + err.message);            
          return res.status(400).json({
            err:err
          })
        }else{
          if(data.length>0){
          //  console.log(course);
          return  res.status(200).json({
              status:true,
              showMsg:false,
              data,
          })
        }else{
        return  res.status(400).json({
            err: 'No data found'
        })
        }
        }
      });    
};

module.exports.addBudgetDetails = async function(req, res){
    console.log("Adding budget for a year");
    console.log(req.body);
    const {year,amount} = req.body;
    con.query(SQL`INSERT INTO financial_budget (year,amount) VALUES (?,?)`,[year,amount],function (err, data) {
        if (err) {
            console.log("Error : " + err.message);            
          return res.status(400).json({
            err:err
          })
        }else{
          return  res.status(200).json({
              status:true,
              data,
          })
        }
      });     
};

module.exports.getBudgetDetailsById = async function(req, res){
    console.log("Sending details of particular budget");
    let budgetId = req.params.id;
    con.query(SQL`SELECT * FROM financial_budget WHERE id=?`,[budgetId],function (err, data) {
        if (err) {
            console.log("Error : " + err.message);            
          return res.status(400).json({
            err:err
          })
        }else{
          if(data.length>0){
          //  console.log(course);
          return  res.status(200).json({
              status:true,
              showMsg:false,
              data: data[0],
          })
        }else{
        return  res.status(400).json({
            err: 'No data found'
        })
        }
        }
      });      
};

module.exports.editBudgetDetailsById = async function(req, res){
    console.log("Editing particular budget details ");
    console.log(req.body);
    let id = req.params.id;
    const {year,amount}=req.body;

    let currentYear = new Date().getFullYear();
    console.log(year);
    console.log(currentYear);
    if(year!=currentYear)
    {
      console.log("cannot edit");
      return res.status(400).json({
        "message": "Bad parameters"
      })
    }
    con.query(SQL`UPDATE financial_budget SET year=?, amount=? WHERE id=?`,[year,amount,id],function (err, data) {
        if (err) {
            console.log("Error : " + err.message);            
          return res.status(400).json({
            err:err
          })
        }else{
          return  res.status(200).json({
              status:true,
              showMsg:false,
              data,
          })
        }
      });    
};

module.exports.deleteBudgetDetailsById = async function(req, res){
  console.log("Delete budget details by Id");
  let id = req.params.id;
  
  let currentYear = new Date().getFullYear();
  let year=currentYear;
  console.log(year);
  console.log(currentYear);
  if(year!=currentYear)
  {
    console.log("cannot edit");
    return res.status(400).json({
      "message": "Bad parameters"
    })
  }
  con.query(SQL`DELETE from financial_budget WHERE id=? AND year=?`,[id,year],function (err, data) {
    if (err) {
        console.log("Error : " + err.message);            
      return res.status(400).json({
        err:err
      })
    }else{
      return  res.status(200).json({
          status:true,
          showMsg:false,
          data,
      })
    }
  });    
};