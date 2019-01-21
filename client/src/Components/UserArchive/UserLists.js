import userService from '../../Services/userService';
import CompanyService from '../../Services/companyService';
import PublicWorkerService from '../../Services/publicWorkerService';
import AdminService from '../../Services/adminService';

export class UserList extends Component {
    users = [];

    render() {
        return(
            <div></div>
        );
    }

    mounted() {
        userService.getUsers()
            .then(res => this.users = res.data)
            .catch(err => console.log(err))
    }
}

export class CompanyList extends Component {
    companies = [];

    render() {
        return (
            <div></div>
        );
    }

    mounted() {
        CompanyService.getCompanies()
            .then(res => this.companies = res.data)
            .catch(err => console.log(err))
    }
}

export class AdminList extends Component {
    admins = [];

    render() {
        return (
            <div></div>
        );
    }

    mounted() {
        AdminService
    }
}

export class PublicworkerList extends Component {
    publicworkers = [];

    render() {
        return (
            <div></div>
        );
    }

}