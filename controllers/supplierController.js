const con = require('../config');
const SQL = require('sql-template-strings');
const { response } = require('express');
const { cond, add } = require('lodash');

module.exports.getSupplierDetails =   async function(req, res){
    console.log("Sending all supplier details");
    con.query(SQL`SELECT * FROM suppliers`,[],function (err, data) {
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

module.exports.getSupplierDetailsById = async function(req, res){
  console.log("Sending details of particular manufacturer");
  let id = req.params.id;
  con.query(SQL`SELECT * FROM Suppliers WHERE id=?`,[id],function (err, data) {
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

module.exports.addSupplierDetails = async function(req, res){
    console.log("Adding a manufacturer");
    console.log(req.body);
    const {name,address,city,email} = req.body;
     con.query(SQL`Select COUNT(*) AS cnt from Suppliers where email=?`,[email],function(err,data){
        if(data[0].cnt>0){
          
            return res
              .status(400)
              .json({ errors: [{ msg: 'Invalid Credentials' }] });
          
        }
        else{
        con.query(SQL`INSERT INTO Suppliers (name,address,city,email) VALUES (?,?,?,?)`,[name,address,city,email],function (err, data) {
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
        });}     
     });
   
};

module.exports.editSupplierDetailsById = async function(req, res){
    console.log("Editing particular manufacturer details ");
    console.log(req.body);
    let id = req.params.id;
    const {name,address,city,email} = req.body;
    con.query(SQL`UPDATE Suppliers SET name=?, address=?, city=?, email=? WHERE id=?`,[name,address,city,email,id],function (err, data) {
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

module.exports.deleteSupplierDetailsById = async function(req, res){
    console.log("Delete supplier details by Id");
    let id = req.params.id;
    con.query(SQL`DELETE from Suppliers WHERE id=?`,[id],function (err, data) {
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