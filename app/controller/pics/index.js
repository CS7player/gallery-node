const pics = require('./../../model/pics');

exports.details = async (req, res, next) => {
 try {
  let result = await pics.details(req['user']);
  res.status(200).json({ status: true, data: result });
 } catch (error) {
  res.status(500).json({ status: false, msg: error });
  next(error)
 }
}

exports.add = async (req, res, next) => {
 try {
  const reqParams = req['body'] || {};
  const file = req['file'] || {};
  let result = await pics.add(reqParams,file);
  res.status(200).json({ status: true, data: result,msg:'Image Added Successfully' });
 } catch (error) {
  res.status(500).json({ status: false, msg: error });
  next(error)
 }
}

exports.delete = async (req,res,next)=>{
 try{
  const reqParams = req['body'] || {};
  let result = await pics.delete(reqParams);
  res.status(200).json({ status: true, data: result });
 } catch (error) {
  res.status(500).json({ status: false, msg: error });
  next(error)
 }
}