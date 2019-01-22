import axios from 'axios';

export default class StatisticService {

    static getTicketAmountNationally(){
        return axios.get('/ticketAmountNationally');
    }

    static getSolvedTicketsNationally(){
        return axios.get('/solvedTicketsNationally');
    }

    static getTicketAmountByCategoryNationally(){
        return axios.get('/getTicketAmountByCategoryNationally');
    }

    static getTicketAmountByMonthNationally(){
        return axios.get('/getTicketAmountByMonthNationally');
    }

    static getTicketAmountLocally(commune : string){
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
