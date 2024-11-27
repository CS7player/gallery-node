const jwt = require('jsonwebtoken');
const { getDb} = require('./db');

exports.auth = async (req,res,next)=>{
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ status: false, msg: "Authorization header missing" });
        }
        let token = req.headers.authorization.split(" ")[1];
        let data = jwt.verify(token,SECRET_KEY);
        let db = await getDb();
        let collect = db.collection(USERS);
        const result = await collect.findOne({ username: data.username, tokens: token });
        if (!result) {
            return res.status(401).json({ status: false, msg: "Unauthorized access" });
        }
        if(result.length == 0){
            res.status(420).json({status:false,msg:"unauthorization access"})
        }
        req.user = data;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        res.status(401).json({ status: false, msg: "Unauthorized access" });
    }
}