//@flow
import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component} from 'react-simplified';
import { NavLink } from 'react-router-dom';
import {Doughnut} from 'react-chartjs-2';
import {Bar} from 'react-chartjs-2';
import {Line} from 'react-chartjs-2';
import statisticsService from '../../Services/statisticsService';
import categoryService from '../../Services/categoryService';
import communeService from '../../Services/communeService';
import DropDown from './DropDown';


//Possibly refactorize code here. 

export default class Statistics extends Component{
    allCategories = [];

    //National data
    ticketsSentN = '';  
    ticketsSolvedN = '';
    ticketsPerCatN = [];
    ticketsPerMonthN = [0,0,0,0,0,0,0,0,0,0,0,0];
    categoriesN = [];

    //Local data
    selectedCommune = '';
    ticketsSentL = '';  
    ticketsSolvedL = '';
    ticketsPerCatL = [];
    ticketsPerMonthL = [0,0,0,0,0,0,0,0,0,0,0,0];
    categoriesL = [];
    communes = [];

    constructor(props){
        super(props);
        this.state = {
            ticketsSent : '',  
            ticketsSolved : '',
            categories : [],
            ticketsPerCat : [],
            ticketsPerMonth : [],
            isHidden : true
        }
    }

    

    render(){
        return(
            <div className="aroundStuff">
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-selected="true"  onClick={this.setNational}>Nasjonalt</a>
                        <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-home" role="tab" aria-selected="false" onClick={this.setLocal}>Lokalt</a>
                        {!this.state.isHidden && <DropDown selected={this.selectedCommune} communes={this.communes} clickFunc={this.updateLocal.bind(this)}/>}
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col" style={{border:'1px solid lightgrey'}}>
                            <br/>
                            <Doughnut data = {{
                                datasets: [{
                                    data: [(this.state.ticketsSent - this.state.ticketsSolved), this.state.ticketsSolved],
                                    backgroundColor: ['LightCoral', 'lightblue'],
                                    hoverBackgroundColor: ['IndianRed', 'SkyBlue']
                                }],

                                labels: [
                                    'Uløste saker',
                                    'Løste saker'
                                ]
                            }} />
                            <hr/>
                            <small>Innsendte saker: {this.state.ticketsSent}</small><br/>
                            <small>Løste saker: {this.state.ticketsSolved}</small><br/>
                            <small>Uløste saker: {(this.state.ticketsSent - this.state.ticketsSolved)}</small><br/>
                            <small>Prosentandel løste saker: {(this.state.ticketsSent == 0) ? 'Ingen saker innsendt.' : (((this.state.ticketsSolved / this.state.ticketsSent)*100).toFixed(2) + ' %')}</small>
                            <br/>
                            <br/>
                        </div>
                        {' '}
                        <div className="col" style={{border:'1px solid lightgrey'}}>
                            <br/>
                            <Bar data = {{
                                labels: this.state.categories,
                                datasets: [{
                                    label: "Antall saker",
                                    backgroundColor: 'lightblue',
                                    borderColor: 'lightgrey',
                                    data: this.state.ticketsPerCat
                                }]
                                     
                            }} options= {{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero:true
                                        }
                                    }]
                                }
                            }}
                            />
                            <hr/>
                            <small>Antall benyttede kategorier: {this.state.categories.length}</small><br/>
                            <small>Tilgjengelige kategorier i Hverdagshelt: {this.allCategories.length}</small><br/>
                        </div>
                    </div>
                    
                    <div className="row">
                        <div className="col" style={{border:'1px solid lightgrey'}}>
                            <br/>
                            <Line data={{
                                labels : ['Januar', 'Februar', 'Mars', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Desember'],
                                datasets: [{
                                    label: "Saker innsendt per måned",
                                    backgroundColor: 'lightblue',
                                    data: this.state.ticketsPerMonth
                                }]
                            }}
                            
                            options= {{
                                scales: {
                                    yAxes: [{
                                        ticks: {
                                            beginAtZero:true
                                        }
                                    }]
                                }
                            }}
                            />
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
    
        )
    }

    async mounted(){
        categoryService.getTicketCategories()
        .then(categories => this.allCategories = categories.data)
        .catch((error : Error) => console.log(error.message));

        //-----NATIONAL DATA FETCHING-----\\
        await statisticsService.getTicketAmountNationally()
        .then(ticketAmount => this.ticketsSentN = ticketAmount.data[0].amount)
        .catch((error : Error) => console.log(error.message));

        await statisticsService.getSolvedTicketsNationally()
        .then(ticketAmount => this.ticketsSolvedN = ticketAmount.data[0].amount)
        .catch((error : Error) => console.log(error.message));

        await statisticsService.getTicketAmountByCategoryNationally()
        .then(amounts => amounts.data.map(amount => (
            this.categoriesN.push(amount.category),
            this.ticketsPerCatN.push(amount.tickets_in_categories)
        )))
        .catch((error : Error ) => console.log(error.message));

        await statisticsService.getTicketAmountByMonthNationally()
        .then(amounts => amounts.data.map(amount => (
            this.ticketsPerMonthN[(amount.month - 1)] = amount.value
        )))
        .catch((error : Error) => console.log(error.message));

        //-----LOCAL DATA FETCHING-----\\
        await communeService.getAllCommunes()
        .then(communes => communes.data.map(commune =>(
            this.communes.push(commune.commune_name)
        )))
        .catch((error : Error) => console.log(error.message));

        await this.updateLocal(this.communes[0]);
        
        this.setState({
            ticketsSent : this.ticketsSentN,  
            ticketsSolved : this.ticketsSolvedN,
            categories : this.categoriesN,
            ticketsPerCat : this.ticketsPerCatN,
            ticketsPerMonth : this.ticketsPerMonthN,
            isHidden : true
        });
    }

    setNational(){
        //States below will get data from props 
        this.setState({
            ticketsSent : this.ticketsSentN,  
            ticketsSolved : this.ticketsSolvedN,
            categories : this.categoriesN,
            ticketsPerCat : this.ticketsPerCatN,
            ticketsPerMonth : this.ticketsPerMonthN,
            isHidden : true
        });
    }

    setLocal(){
        //States below will get data from props
        this.setState({
            ticketsSent : this.ticketsSentL,  
            ticketsSolved : this.ticketsSolvedL,
            categories : this.categoriesL,
            ticketsPerCat : this.ticketsPerCatL,
            ticketsPerMonth : this.ticketsPerMonthL,
            isHidden : false
        });
    }

    async updateLocal(commune : string){
        this.selectedCommune = commune; 

        await statisticsService.getTicketAmountLocally(commune)
        .then(ticketAmount => this.ticketsSentL = ticketAmount.data[0].amount)
        .catch((error : Error) => console.log(error.message));

        await statisticsService.getSolvedTicketsLocally(commune)
        .then(ticketAmount => this.ticketsSolvedL = ticketAmount.data[0].amount)
        .catch((error : Error) => console.log(error.message));

        this.categoriesL = [];
        this.ticketsPerCatL = [];

        await statisticsService.getTicketAmountByCategoryLocally(commune)
        .then(amounts => amounts.data.map(amount => (
            this.categoriesL.push(amount.category),
            this.ticketsPerCatL.push(amount.tickets_in_categories)
        )))
        .catch((error : Error ) => console.log(error.message));

        this.ticketsPerMonthL = [];    
        await statisticsService.getTicketAmountByMonthLocally(commune)
        .then(amounts => amounts.data.map(amount => (
            this.ticketsPerMonthL[(amount.month - 1)] = amount.value
        )))
        .catch((error : Error) => console.log(error.message));

        this.setLocal();
    }
}
