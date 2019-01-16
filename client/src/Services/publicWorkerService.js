// @flow
import axios from 'axios';

class PublicWorker {
    email;
    commune;
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

export default class PublicWorkerService {
    createPublicWorker(email: string, commune: string): Promise<Object>{
        let publicWorker = new PublicWorker();
        publicWorker.email = email;
        publicWorker.commune = commune;
        return axios.post('/publicworker', config());
    }
}
