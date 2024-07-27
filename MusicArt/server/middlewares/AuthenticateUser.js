const jwt=require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        const user=jwt.verify(req.headers.token, process.env.JWT_SECRET_KEY);
        req.user=user;
        next()
    }
    catch(err){
        res.send({message:'please login first'})
    }
}
