const tokenService = require("../service/token-service");


module.exports = function (req, res, next){
    try {
        console.log(req.headers.authorization)
        const autorizationHeader = req.headers.authorization;
        if (!autorizationHeader){
            res.status(401).json({error: "Not authorised"});
        }
        const accessToken = autorizationHeader.split(' ')[1];
        if (!accessToken){
            res.status(401).json({error: "Token not found"});
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData){
            res.status(401).json({error: "No such userInvalid token"});
        }
        req.user = userData;
        next();
    } catch (e) {
        res.status(401).json({error: "Authorization failed"});
    }
}