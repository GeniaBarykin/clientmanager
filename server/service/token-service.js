const jwt = require('jsonwebtoken')

class TokenService{

    generateTokens(payload){
        const accessToken = jwt.sign(payload,process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'})
        const refreshToken = jwt.sign(payload,process.env.JWT_REFRESH_SECRET, {expiresIn: '30d'})
        return {
            accessToken,
            refreshToken
        }
    }

    async saveToken(userID, db, refreshToken) {
        db.get('SELECT refreshToken FROM tokens WHERE user=?', userID,(error, userDB) => {
            if (error) throw error;
            if (userDB == undefined){
                db.run(`INSERT INTO tokens (user,refreshToken) VALUES (?,?)`,
                [userID, refreshToken],
                function (error, result) {
                    if (error) throw error;                          
                    //do smth
                    console.log("token created")
                });
            } else {
                db.run(`UPDATE tokens set refreshToken=? where user=?`,
                [refreshToken, userID],
                function (error, result) {
                    if (error) throw error;                          
                    //do smth
                    console.log("token refreshed")
                });
            }
        })
    }


}

module.exports = new TokenService();