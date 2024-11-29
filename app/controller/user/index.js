const user = require("../../model/user");

exports.login = async (req, res) => {
  try {
    let result = await user.login(req["body"]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.logout = async (req, res) => {
  try {
    let result = await user.logout(req);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.add = async (req, res) => {
  try {
    let result = await user.add(req["body"]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.update = async (req, res) => {
  try {
    let result = await user.update(req["body"]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.details = async (req,res) => {
  try {
    let result = await user.details(req['query']);
    res.status(200).json({status:true,data:result})
  } catch (error) {
    res.status(500).json(error);
  }
}
