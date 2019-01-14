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

export default class PublicWorkerService {
    createPublicWorker(email: string, commune: string): Promise<Object>{
        let publicWorker = new PublicWorker();
        publicWorker.email = email;
        publicWorker.commune = commune;
        return axios.post(url + '/publicworker', config);
    }
}
