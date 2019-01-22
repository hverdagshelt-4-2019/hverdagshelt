import axios from 'axios';

export default class StatisticService {

    static getTicketAmountNationally(){
        console.log("getting amount of tickets nationally");
        return axios.get('/ticketAmountNationally');
    }

    static getSolvedTicketsNationally(){
        console.log("getting amount of solved tickets nationally");
        return axios.get('/solvedTicketsNationally');
    }

    static getTicketAmountByCategoryNationally(){
        return axios.get('/getTicketAmountByCategoryNationally');
    }

    static getTicketAmountByMonthNationally(){
        return axios.get('/getTicketAmountByMonthNationally');
    }

    static getTicketAmountLocally(commune : string){
        console.log("Er i service med " + commune);
        return axios.get('/ticketAmountLocally/' + commune);
    }

    static getSolvedTicketsLocally(commune : string){
        return axios.get('/solvedTicketsLocally/' + commune);
    }

    static getTicketAmountByCategoryLocally(commune : string){
        return axios.get('/getTicketAmountByCategoryLocally/' + commune);
    }

    static getTicketAmountByMonthLocally(commune : string){
        return axios.get('/getTicketAmountByMonthLocally/' + commune);
    }

}
