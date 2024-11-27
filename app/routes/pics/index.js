const { auth } = require('../../utils/auth');
const router = require('express').Router();
const pics = require('./../../controller/pics');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get('/details', auth, async (req, res, next) => {
 try {
  await pics.details(req, res, next)
 } catch (error) {
  next(error);
 }
})

router.post('/add', auth,upload.single('img'), async (req, res, next) => {
 try {
  await pics.add(req,res,next);
 } catch (error) {
  next(error);
 }
})

router.delete('/delete',auth,async(req,res,next)=>{
 try{
  await pics.delete(req,res,next);
 }catch(error){
  next(error);
 }
})

module.exports = router;