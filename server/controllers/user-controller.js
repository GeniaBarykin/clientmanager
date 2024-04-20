const bcrypt = require('bcryptjs')
require('dotenv').config()
const userDto = require('../dtos/user-dto')
const tokenService =require('../service/token-service')
const UserDto = require('../dtos/user-dto')

class UserController {

    async registration(req, res, next){
        try {
            const db = req.db
            const {fio, login, password} = req.body   
            if (login == undefined || login == ''){
                res.status(403).json({error: "Empty login"});
            } else if (password == undefined || password == ''){
                res.status(403).json({error: "Empty password"});
            } else if (fio == undefined || fio == ''){
                res.status(403).json({error: "Empty fio"});
            } else {
                db.get('SELECT * FROM users WHERE login=?', [login], (error, userDB) => {
                    if (error) throw error;
                    if (userDB == undefined) {
                        const SALT = Number(process.env.SALT);
                        const hashPassword = bcrypt.hashSync(password, SALT);
                        db.run(`INSERT INTO users (fio, login , password) VALUES (?,?,?)`,
                        [fio, login, hashPassword],
                        function (err, result) {
                            if (err) {
                                res.status(400).json({ "error": err.message })
                                return;
                            }      
                            const userDto = new UserDto({fio: fio, login: login})
                            const tokens = tokenService.generateTokens({...userDto})
                            tokenService.saveToken(userDto.login, db, tokens.refreshToken)
                            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
                            res.status(201).json({                                
                                ...tokens,
                                user: userDto                     
                        })
                        });
                    } else {
                        res.status(403).json({error: "Login already exists"});
                    }});
            }
        }
        catch (e){console.log(e)}
    }
    async login(req, res, next){
        try {
            const db = req.db
            const {login, password} = req.body 
            if (login == undefined || login == ''){
                res.status(403).json({error: "Empty login"});
            } else if (password == undefined || password == ''){
                res.status(403).json({error: "Empty password"});
            } else {
                db.get('SELECT * FROM users WHERE login=?', [login], async (error, userDB) => {
                    if (error) throw error;
                    if (userDB == undefined) {
                        res.status(401).json({error: "No such user"});
                    } else {
                        const passwordEquals = await bcrypt.compare(password, userDB.password)
                        if (passwordEquals) {
                            const userDto = new UserDto({fio: userDB.fio, login: login})
                            const tokens = tokenService.generateTokens({...userDto})
                            tokenService.saveToken(userDto.login, db, tokens.refreshToken)
                            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
                            res.status(201).json({                                
                                ...tokens,
                                user: userDto                     
                        })
                        } else {
                            res.status(401).json({error: "Wrong password"});
                        }
                    }});
            }
        }
        catch (e){console.log(e)}
    }
    async logout(req, res, next){
        try {
            const db = req.db
            const {refreshToken} =req.cookies;
            const token = await tokenService.removeToken(refreshToken, db)
            res.clearCookie('refreshToken');
            return res.status(200).json({"logout": "success"})
        }
        catch (e){console.log(e)}
    }
    async refresh(req, res, next){
        try {
            const db = req.db
            const {refreshToken} =req.cookies;
            if(!refreshToken) {
                res.status(401).json({error: "No token found"});
            }
            const userData = tokenService.validateRefreshToken(refreshToken)
            if (userData){
                db.get('SELECT * FROM tokens WHERE refreshToken=?', [refreshToken], (error, tokenDB) => {
                    if (error) throw error;
                    if (tokenDB) {
                        db.get('SELECT fio, login FROM users WHERE login=?', [tokenDB.user], (error, userDB) => {
                            if (error) throw error;
                            const userDto = new UserDto({fio: userDB.fio, login: userDB.login})
                            const tokens = tokenService.generateTokens({...userDto})
                            tokenService.saveToken(userDto.login, db, tokens.refreshToken)
                            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true})
                            res.status(201).json({                                
                                ...tokens,
                                user: userDto                     
                        })
                        })                        
                    }
                });
            } else {
                res.status(401).json({error: "Invalid token"});
            }            
        }
        catch (e){console.log(e)}
    }
}

module.exports = new UserController();