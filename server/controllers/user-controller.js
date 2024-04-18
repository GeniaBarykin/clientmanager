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
                        db.run(`INSERT INTO users (fio, login , password) VALUES (?,?,?)`,
                        [fio, login, password],
                        function (err, result) {
                            if (err) {
                                res.status(400).json({ "error": err.message })
                                return;
                            }                            
                            res.status(201).json({                                
                                "login": login
                                /// TOKEN
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
        try {}
        catch (e){console.log(e)}
    }
    async logout(req, res, next){
        try {}
        catch (e){console.log(e)}
    }
    async refresh(req, res, next){
        try {}
        catch (e){console.log(e)}
    }

    async getUsers(req, res, next){
        try { 
            req.db.all('SELECT * FROM users', (error, usersDB) => {
                if (error) throw error;
                res.json(usersDB);
            })
            }
        catch (e){console.log(e)}
    }
}

module.exports = new UserController();