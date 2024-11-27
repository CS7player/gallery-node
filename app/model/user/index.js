const {getDb} = require('../../utils/db');
const jwt = require('jsonwebtoken');

exports.login = async (req)=>{
    try{
        let where = { username : req['username'],password:req['password']};
        let db = await getDb();
        let collect = db.collection(USERS);
        let result = await collect.findOne(where);
        if(result){
            let token = generateToken(where);
            await collect.updateOne(where,{$push:{tokens:token}});
            return {status:true,token:token,msg:'login Successfully'}
        }
        return {status:false,msg:'login failed'}
    }catch{
        throw error
    }
}

exports.logout = async (req)=>{
    try {
        if (!req.headers.authorization) {
            return res.status(401).json({ status: false, msg: "Authorization header missing" });
        }
        let token = req.headers.authorization.split(" ")[1];
        let data = jwt.verify(token,SECRET_KEY);
        let db = await getDb();
        let collect = db.collection(USERS);
        await collect.updateOne({ username: data.username},{ $pull: { tokens:token } });
        return {status:true,msg:'logout successfully'};
    } catch (error) {
        throw error;
    }
}

function generateToken(where){
    let token = jwt.sign(where,SECRET_KEY);
    return token;
}