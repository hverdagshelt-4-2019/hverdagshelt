import axios from 'axios';

class Comment {
    id;
   description;
   name;
   email;
}

/**
 * Function for getting the auth token from localstorage and returns it as a header
 * @returns {{headers: {Authorization: string}}} Token for API authorization
 */

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
        return axios.post('/comment/' + ticketID, {description}, config());
    }

    static getAllComments(ticketID): Promise<Comment[]>{
        return axios.get('/comments/' + ticketID);
    }


    /*deleteComment(ticketID): Promise<Object> {
        return axios.delete('/ticket/' + ticketID, config);
    }*/
}