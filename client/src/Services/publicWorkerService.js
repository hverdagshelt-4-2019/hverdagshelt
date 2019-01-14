// @flow
import axios from 'axios';
let url = "http://localhost:3000";

class PublicWorker {
    email;
    commune;
}

let config = {
    headers: {
        Authorization: "Bearer " + localStorage.getItem('authToken'),
    }
}

class PublicWorkerService {
    createPublicWorker(email, commune): Promise<Object>{
        let publicWorker = new PublicWorker();
        publicWorker.email = email;
        publicWorker.commune = commune;
        return axios.post(url + '/publicworker', config);
    }
}

export let publicWorkerService = new PublicWorkerService;


