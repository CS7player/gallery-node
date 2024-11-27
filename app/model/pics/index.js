const { getDb } = require('../../utils/db');
const { ObjectId } = require('mongodb');

exports.details = async (req) => {
 try {
  let where = {};
  if (req.id) {
   where['id'] = req.id;
  }
  let db = await getDb();
  let collect = db.collection(PICS);
  let result = await collect.find(where).toArray();
  for (let item of result) {
   const image = item['image'];
   if (image) {
    const base64Image = image.toString('base64');
    item['image'] = `data:image/png;base64,${base64Image}`;
   } else {
    item['image'] = null;
   }
  }
  return result;
 } catch (error) {
  throw error;
 }
}

exports.add = async (reqParams, file) => {
 try {
    let id = new ObjectId(reqParams['id']);
  let username = reqParams['username'];
  let name = reqParams['name'];
  let image = file['buffer'];
  let params = { "username": username, "image": image ,"name": name,"id":id };
  let db = await getDb();
  let collect = db.collection(PICS);
  let result = await collect.insertOne(params);
  return result;
 } catch (error) {
  throw error
 }
}

exports.delete = async (reqParams) => {
 try {
    let where = { _id: new ObjectId(reqParams['id']) };
  console.log(where)
  let db = await getDb();
  let collect = db.collection(PICS);
  let result = await collect.deleteOne(where);
  if(result.deletedCount !=0){
    return {status:true,msg:'Image deleted Successfully'};
  }
  return {status:false,msg:'Image deleted Failed'};
 }
 catch (error) {
  throw error
 }
}