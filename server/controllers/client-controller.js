
class ClientController {
    async getClients(req, res, next){
        try {
            const {fio_responsible} = req.body
            req.db.all('SELECT * FROM clients where  fio_responsible=?',
            [ fio_responsible], (error, clientsDB) => {
                if (error) throw error;
                res.json(clientsDB);
            })
        }
        catch (e){
            console.log(e)
        }
    }

    async changeStatus(req, res, next){
        try {
            const db = req.db;
            const {nomer_scheta, status, fio_responsible} = req.body
            if (!nomer_scheta || status == undefined || status < 0 || status > 2
                || fio_responsible == undefined) {
                res.status(403).json({error: "Wrong input data"});
            } else {
                db.run(`UPDATE clients set status=? where nomer_scheta=? AND fio_responsible=?`,
                [status, nomer_scheta, fio_responsible],
                function (error) {
                    if (error) throw error;
                    console.log("client updated")
                    req.db.all('SELECT * FROM clients where  fio_responsible=?',
                        [ fio_responsible], (error, clientsDB) => {
                        if (error) throw error;
                        res.json(clientsDB);
                    })
                });
            }            
        } catch (e){
            console.log(e)
        }
    }
}

module.exports = new ClientController();