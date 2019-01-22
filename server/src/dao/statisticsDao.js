import Dao from "./dao";

export default class StatisticsDao extends Dao {
    //Nationally
    getTicketAmountNationally(callback){
        super.query("SELECT count(*) as amount FROM ticket",
        [],
        callback);
    }

    getSolvedTicketsNationally(callback){
        super.query("SELECT count(*) as amount FROM ticket WHERE status='Fullført'",
        [],
        callback);
    }

    getTicketAmountByCategoryNationally(callback){
        super.query("SELECT category, COUNT(*) AS 'tickets_in_categories' FROM ticket GROUP BY category;",
        [],
        callback);
    }

    getTicketsByMonthNationally(callback){
        super.query("SELECT COUNT(*) as value, MONTH(t.submitted_time) as month "+
            "FROM ticket t "+
            "WHERE YEAR(t.submitted_time) = YEAR(NOW()) "+
            "GROUP BY MONTH(t.submitted_time);",
            [],
            callback);
    }

    //Locally
    getTicketAmountLocally(commune, callback){
        super.query("SELECT count(*) as amount FROM ticket t JOIN commune c ON(t.responsible_commune = c.name) WHERE c.name = ?;",
        [commune],
        callback);
    }

    getSolvedTicketsLocally(commune, callback){
        super.query("SELECT count(*) as amount FROM ticket t JOIN commune c ON(t.responsible_commune = c.name) WHERE status='Fullført' AND c.name = ?;",
        [commune],
        callback);
    }

    getTicketAmountByCategoryLocally(commune, callback){
        super.query(
            "SELECT category, COUNT(*) AS 'tickets_in_categories' " + 
            "FROM ticket t JOIN commune c ON(t.responsible_commune = c.name) " +
            "WHERE c.name = ? " +
            "GROUP BY category;",
        [commune],
        callback);
    }

    getTicketsByMonthLocally(commune, callback){
        super.query("SELECT COUNT(*) as value, MONTH(t.submitted_time) as 'month' "+
        "FROM ticket t " +
        "JOIN commune c ON(t.responsible_commune = c.name) " +
        "WHERE YEAR(t.submitted_time) = YEAR(NOW()) AND c.name = ? "+
        "GROUP BY MONTH(t.submitted_time);",
            [commune],
            callback);
    }
}