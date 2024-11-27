const { getDb } = require('../../utils/db');

exports.details = async (req) => {
 try {
  let where = {};
  if (req.username) {
   where['username'] = req.username;
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
  let username = reqParams['username'];
  let image = file['buffer'];
  let params = { "username": username, "image": image };
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
  let where = {_id:reqParams['id']};
  let db = await getDb();
  let collect = db.collection(PICS);
  let result = await collect.deleteOne(where);
  return result;
 }
 catch (error) {
  throw error
 }
}