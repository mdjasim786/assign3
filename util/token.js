 const jwt = require('jsonwebtoken');
const constants=require('../config/constants');

const token = {

generateToken:(payLoad)=> {
    return new Promise((resolve, reject) => {
        jwt.sign(payLoad, constants.key, { expiresIn: '30m' },function (err, token) {
            if (!err)
                resolve(token);
            reject(err)
        });
    })
},

verifyToken:(token)=> {
    return new Promise((resolve, reject) => {
        jwt.verify(token,constants.key,(err,result)=>{
            if(err)
                reject(err)
            else
                resolve(result)
        })
    })
}
}

module.exports = token;