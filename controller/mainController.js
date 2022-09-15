
const fs = require('fs');
const path = require('path');

const buyTicketPath = path.join(__dirname, '../db/trxTicketBuy.json');
const buyTicketText = fs.readFileSync(buyTicketPath, 'utf-8');
const ticketData = JSON.parse(buyTicketText);

function saveSeatChanges(){
    const ticketDataStringified = JSON.stringify(ticketData);
    fs.writeFileSync(buyTicketPath, ticketDataStringified, 'utf-8'); 
};

module.exports = {
    getAllData: (req, res) => {
        res.send(ticketData);
    },

    getFilmsData: (req, res) => {
        res.send(ticketData[0].Films);
    },

    getSeatsData: (req, res) => {
        res.send(ticketData[1].Seats);
    },

    bookSeats: (req, res) => {
        const seatsReq = req.body.seats;
        const availableSeats = ticketData[1].Seats.Availability;
        const seatFound = seatsReq.map((seatReq) => {
            return availableSeats.find(avSeat => avSeat.SeatNumber === seatReq)
        });

        // Don't book at first mapping in order to avoid partials booking. 
        // Whether the user book all seats wanted or neither of them.

        if(seatFound.includes(undefined)){
            return res.status(404).send('Sorry one or more seats you are trying to book are now unavailable...')
        } else {
            const seatFound = seatsReq.map((seatReq) => {
                return availableSeats.find(avSeat => {
                    if(avSeat.SeatNumber === seatReq){
                        avSeat.Available = false;
                    }})
            });
            saveSeatChanges();
            res.status(200).send(`Your seats n. ${seatsReq} have been successfully booked! Don't forget to buy popcorn and enjoy the movie!`)
        };
    },
}