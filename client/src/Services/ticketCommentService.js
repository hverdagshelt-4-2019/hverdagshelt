import axios from 'axios';
let url = "http://localhost:3000";

class Comment {
   description;
   email
}

function config() {
    let token = localStorage.getItem('authToken');
    let Authorization = 'none';
    if(token)
        Authorization = "Bearer " + token;
    return {
        headers: {
            Authorization
        }
    }
}

export default class commentService {

    static postComment(ticketID, description): Promise<Object> {
        console.log({description});
        return axios.post(url + '/comment/' + ticketID, {description}, config());
    }

    static getAllComments(ticketID): Promise<Comment[]>{
        return axios.get(url + '/comments/' + ticketID);
    }


    /*deleteComment(ticketID): Promise<Object> {
        return axios.delete(url + '/ticket/' + ticketID, config);
    }*/
}