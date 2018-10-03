import jwt from 'jsonwebtoken';
import user from "./userModel"


module.exports = {
    getToken : (user )=> {
        return jwt.sign(user,process.env.secretOrPrivateKey,{
            expiresIn: 3600
        });
    },

    verifyAdmin:(req,res,next) => {
        let token = req.body.token || req.query.token || req.headers['x-access-token'];

        if(token && +user.admin) {
            jwt.verify(token,process.env.secretOrPrivateKey,(err,decoded)=>{
                if(err){
                    let err = {"status":401,"message":"You arenot authenticated!"};
                    res.json(err);
                }else{
                   req.decoded = decoded;
                   next(); 
                }
            });
        } else{
            let err = {"status":403,"message":"You must but a verified Admin"};
            res.json(err);
        }
    }
}
