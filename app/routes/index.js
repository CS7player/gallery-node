const router = require('express').Router();
const user = require('./user');
const pics = require('./pics');
const jwt = require('jsonwebtoken');

router.use('/user',user);
router.use('/pics',pics);

router.get('/test',(req,res,next)=>{
    let token = jwt.sign('testing','123456')
    res.status(200).json({status:true,data:{"token":token}})
})

router.get('/',(req,res)=>{
    res.status(200).json({status:true,msg:"working Fine!!"})
})

module.exports = router