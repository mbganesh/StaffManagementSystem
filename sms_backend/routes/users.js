var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");
const countModel = require("../Models/CountModel");
const EmpModel = require("../Models/UserModel");

var mongoDB = "mongodb://localhost:27017/employee_management_system";

mongoose.connect(mongoDB);

// Visiter Count
router.get("/visiter-count",  async (req, res) => {
  let foundCount = await countModel.find({})
  if(foundCount.length === 0 ){
    let data = {visit : 1}
    let cModel = await countModel.insertMany(data)
    res.json(data )
  }else{
    let incCount = await countModel.findOne({}, {_id:0  , __v:0})
     let tempValue =  incCount["visit"] + 1
    let cModel = await countModel.findOneAndUpdate({} , {$set:{visit:tempValue} } );
    res.json({ totalVisit:cModel['visit']+1  , lastVisit:new Date()})
  }
});


// dummyData
router.get("/add", async (req, res) => {
  var data = {
    EmpName: 'Ganesh',
    EmpMobNo: '84956215',     
    EmpEmail: 'mbganesh@gmail.com', 
    Empdob: '2000-09-17',
    EmpAddress: 'Tvl',
    Empbg: 'A+ve',
    EmpDesignation: 'Developer',        
    EmpId: 'emp-871371'
  }

  let myModel = new EmpModel(data);
      myModel.save();
      res.json({ success: true, message: "New Employee Added" });
}
)

// Add
router.post("/add-emp", async (req, res) => {
  var data = req.body;


  try {
    var foundMe = await EmpModel.find(
      { EmpMobNo: data["EmpMobNo"] },
      { _id: 0 }
    );

    console.log('foundEmp');
    console.log(foundMe);

    if (foundMe.length === 0) {
      console.log("new emp");
      let myModel = new EmpModel(data);
      myModel.save();
      res.json({ success: true, message: "New Employee Added" });
    } else {
      console.log("old emp");
      if(foundMe[0]['EmpMobNo'] === data['EmpMobNo']){
          console.log(foundMe[0]);
          let myModel = new EmpModel(data);
          myModel.save();
          res.json({ success: true, message: "New Employee Added" });
      }
      // res.json({ success: false, message: "Employee Alredy Exist" });
    }
  } catch (error) {
    res.json({ success: false, message: error });
  }
  return
});

// view
router.post("/list-emp", async (req, res) => {
  var data = req.body;
  if (data.user === "admin") {
    console.log(data);
    var listOfData = await EmpModel.find({}, { _id: 0, __v: 0 });
    console.log({ message: listOfData, success: true });
    res.json({ message: listOfData, success: true });
  } else {
    res.json({ message: "Your not admin", success: false });
  }
});

// delete
router.post('/del-emp' , async (req , res) => {
  var data = req.body
  var deleteEmp = await EmpModel.deleteOne({EmpNo : data['EmpNo']})
  console.log(deleteEmp);
  res.json({message:'Employee Deleted' , success:true})
})

// deleteMany
router.get("/delEmpDel", async (req, res) => {
  var deleteObj = await EmpModel.deleteMany({});
  res.send(deleteObj);
});

module.exports = router;
