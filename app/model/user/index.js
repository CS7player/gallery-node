const { getDb } = require("../../utils/db");
const jwt = require("jsonwebtoken");
const { ObjectId } = require('mongodb');

exports.login = async (req) => {
  try {
    let where = { username: req["username"], password: req["password"] };
    let db = await getDb();
    let collect = db.collection(USERS);
    let result = await collect.findOne(where);
    if (result) {
      where['_id'] = result['_id'];
      let token = generateToken(where);
      await collect.updateOne(where, { $push: { tokens: token } });
      return {
        status: true,
        token: token,
        msg: "login Successfully",
        data: where,
      };
    }
    return { status: false, msg: "login failed" };
  } catch {
    throw error;
  }
};

exports.logout = async (req) => {
  try {
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ status: false, msg: "Authorization header missing" });
    }
    let token = req.headers.authorization.split(" ")[1];
    let data = jwt.verify(token, SECRET_KEY);
    let db = await getDb();
    let collect = db.collection(USERS);
    await collect.updateOne(
      { username: data.username },
      { $pull: { tokens: token } }
    );
    return { status: true, msg: "logout successfully" };
  } catch (error) {
    throw error;
  }
};

exports.add = async (req) => {
  try {
    let insert = {
      username: req["username"],
      password: req["password"],
      email: req["email"],
    };
    let db = await getDb();
    let collect = db.collection(USERS);
    let check = await checkExist(insert, collect);
    if (check["status"]) {
      let result = await collect.insertOne(insert);
      if (result) {
        return { status: true, msg: "User add Successfully" };
      } else {
        return { status: false, msg: "User add failed" };
      }
    } else {
      return check;
    }
  } catch (error) {
    throw error;
  }
};

exports.update = async (req) => {
  try {
    let where = { username: req["username"], email: req["email"] };
    let insert = { password: req["password"] };
    let db = await getDb();
    let collect = db.collection(USERS);
    let check = await checkExistPassword(where, collect);
    if (check["status"]) {
      let result = await collect.updateOne(where, { $set: insert });
      if (result) {
        return { status: true, msg: "Password updated Successfully" };
      }
      return { status: false, msg: "Password updatation Failed!!!" };
    }
    return check;
  } catch (error) {
    throw error;
  }
};

exports.details = async (req) => {
  try {
    let id = new ObjectId(req['id']);
    let db = await getDb();
    let collect = db.collection(USERS);
    let result = await collect.find({ _id: { $ne: id } }, { tokens: 0 ,password : 0}).toArray()
    return result;
  } catch (error) {
    throw error;
  }
}

function generateToken(where) {
  let token = jwt.sign(where, SECRET_KEY);
  return token;
}

async function checkExist(record, collect) {
  let where = { email: record["email"] };
  let emailData = await collect.find(where).toArray();
  if (emailData.length != 0) {
    return { status: false, msg: "Email is already used!!!" };
  }
  where = { username: record["username"] };
  let userData = await collect.find(where).toArray();
  if (userData.length != 0) {
    return { status: false, msg: "Username is already exist!!!" };
  }
  return { status: true };
}

async function checkExistPassword(record, collect) {
  let emailData = await collect.find(record).toArray();
  if (emailData.length != 0) {
    return { status: true };
  }
  return { status: false, msg: "User does not existed" };
}
