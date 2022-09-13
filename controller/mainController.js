
const fs = require('fs');
const path = require('path');

const buyTicketPath = path.join(__dirname, '../db/trxTicketBuy.json');
const buyTicketText = fs.readFileSync(buyTicketPath, 'utf-8');
const ticketData = JSON.parse(buyTicketText);

function saveSeatChanges(){
    const ticketDataStringified = JSON.stringify(ticketData);
    fs.writeFileSync(buyTicketPath, ticketDataStringified, 'utf-8'); 
};

function symmetricDifference(availableSeats, seatsReq) {
    let _difference = new Set(availableSeats)
    for (let elem of seatsReq) {
      if (_difference.has(elem)) {
        _difference.delete(elem)
      } else {
        _difference.add(elem)
      }
    }
    return ticketData[1].Asientos.Disponibles = [...new Set(_difference)];
};

module.exports = {
    getFilmData: (req, res) => {
        res.send(ticketData[0].Pelicula);
    },
    getSeatsData: (req, res) => {
        res.send(ticketData[1].Asientos);
    },
    bookSeats: (req, res) => {
        const seatsReq = req.body.seats;
        const availableSeats = ticketData[1].Asientos.Disponibles;
        const seatFound = seatsReq.map((seatReq) => {
            return availableSeats.find(avSeat => avSeat === seatReq)
        });
        if(seatFound.includes(undefined)){
            return res.status(404).send('Sorry one or more seats you are trying to book are now unavailable...')
        } else {
            symmetricDifference(availableSeats, seatsReq);
            saveSeatChanges();
            res.status(200).send(`Your seats n. ${seatsReq} have been successfully booked! Don't forget to buy popcorn and enjoy the movie!`)
        };
    },
}