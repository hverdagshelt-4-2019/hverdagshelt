import axios from 'axios';
let url = "http://localhost:3000";

class Comment {
   description;

}

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

class CommentService {

    postComment(ticketID, comment): Promise<Object> {
        console.log(config);
        return axios.post(url + '/comment/' + ticketID, comment, config);
    }

    getAllComments(ticketID): Promise<Comment[]>{
        return axios.get(url + '/comments/' + ticketID);
    }


    /*deleteComment(ticketID): Promise<Object> {
        return axios.delete(url + '/ticket/' + ticketID, config);
    }*/
}

export let commentService = new CommentService;