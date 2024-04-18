
class ClientController {
    async getClients(req, res, next){
        try {
            req.db.all('SELECT * FROM clients', (error, clientsDB) => {
                if (error) throw error;
                console.log(clientsDB)
                res.json(clientsDB);
            })
        }
        catch (e){
            console.log(e)
        }
    }
}

module.exports = new ClientController();