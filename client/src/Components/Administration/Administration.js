import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import UserArchive from '../UserArchive/UserArchive.js';
import AddPage from '../AdminAdd/AddPage.js';
import CategoryCreation from '../CategoryCreation/CategoryCreation.js';
import AddCompany from '../Company/AddCompanjy.js';


export default class Administration extends Component {
    render() {
        return (
            <section id="tabs">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 ">
                            <nav>
                                <div className="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true"><i className="fas fa-address-card"></i> Administrer brukere</a>
                                    <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false"><i className="fas fa-user-plus"></i> Legg til admin/kommunearbeider</a>
                                    <a className="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false"><i className="fas fa-edit"></i> Legg til kategori</a>
                                    <a className="nav-item nav-link" id="nav-about-tab" data-toggle="tab" href="#nav-about" role="tab" aria-controls="nav-about" aria-selected="false"><i className="fas fa-suitcase"></i> Legg til bedrift</a>
                                </div>
                            </nav>
                            <div className="tab-content py-3 px-3 px-sm-0" id="nav-tabContent">
                                <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                                    <UserArchive />
                                </div>
                                <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                                    <AddPage />
                                </div>
                                <div className="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                                    <CategoryCreation />                                
                                </div>
                                <div className="tab-pane fade" id="nav-about" role="tabpanel" aria-labelledby="nav-about-tab">
                                    <AddCompany />                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}