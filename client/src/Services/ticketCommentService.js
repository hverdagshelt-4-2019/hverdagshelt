import axios from 'axios';

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
        return axios.post('/comment/' + ticketID, {description}, config);
    }

    static getAllComments(ticketID): Promise<Comment[]>{
        return axios.get('/comments/' + ticketID);
    }


    /*deleteComment(ticketID): Promise<Object> {
        return axios.delete('/ticket/' + ticketID, config);
    }*/
}