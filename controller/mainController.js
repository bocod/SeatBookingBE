
const fs = require('fs');
const path = require('path');

const buyTicketPath = path.join(__dirname, '../db/trxTicketBuy.json');
const buyTicketText = fs.readFileSync(buyTicketPath, 'utf-8');
const ticketData = JSON.parse(buyTicketText);

module.exports = {
    getFilmData: (req, res) => {
        res.send(ticketData[0].Pelicula);
    },
    getSeatsData: (req, res) => {
        res.send(ticketData[1].Asientos);
    }
}