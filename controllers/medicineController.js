const con = require('../config');
const SQL = require('sql-template-strings');
const { response } = require('express');
const { cond, add } = require('lodash');

module.exports.getMedicineDetails =   async function(req, res){
    console.log("Sending all medicine details");
    con.query(SQL`SELECT * FROM medicines`,[],function (err, data) {
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

module.exports.getMedicineDetailsById = async function(req, res){
  console.log("Sending details of particular medicine");
  let id = req.params.id;
  con.query(SQL`SELECT * FROM medicines WHERE id=?`,[id],function (err, data) {
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

module.exports.addMedicineDetails = async function(req, res){
    console.log("Adding a medicine");
    console.log(req.body);
    const {name,description,quantity} = req.body;
    con.query(SQL`INSERT INTO medicines (name,description,quantity) VALUES (?,?,?)`,[name,description,quantity],function (err, data) {
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

module.exports.editMedicineDetailsById = async function(req, res){
    console.log("Editing particular medicine details ");
    console.log(req.body);
    let id = req.params.id;
    const {name,description,quantity} = req.body;
    con.query(SQL`UPDATE medicines SET name=?, description=?, quantity=? WHERE id=?`,[name,description,quantity,id],function (err, data) {
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


module.exports.deleteMedicineDetailsById = async function(req, res){
  console.log("Delete medicine details by Id");
  let id = req.params.id;
  con.query(SQL`DELETE from medicines WHERE id=?`,[id],function (err, data) {
    if (err) {
        console.log("Error : " + err.message);            
      return res.status(400).json({
        err:err
      })
    }else{
      console.log('deleted');
      return  res.status(200).json({
          status:true,
          showMsg:false,
          data,
      })
    }
  });    
};