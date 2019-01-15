import axios from 'axios';
let url = "http://localhost:3000";

class Comment {
   description;
   email
}

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

class CommentService {

    postComment(ticketID, description): Promise<Object> {
        console.log({description});
        return axios.post(url + '/comment/' + ticketID, {description}, config);
    }

    getAllComments(ticketID): Promise<Comment[]>{
        return axios.get(url + '/comments/' + ticketID);
    }


    /*deleteComment(ticketID): Promise<Object> {
        return axios.delete(url + '/ticket/' + ticketID, config);
    }*/
}

export let commentService = new CommentService;