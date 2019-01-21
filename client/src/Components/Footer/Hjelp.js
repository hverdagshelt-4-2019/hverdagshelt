import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component,} from 'react-simplified';

export default class Hjelp extends Component{
    render(){
        return(
            <div className="aroundStuff">
        <div className="container">
          <div className="row">
            <div className="col-lg-10" style={{marginLeft: "8%", marginRight: "8%"}}>
              <br />
              <h1>Hjelp</h1>

              <hr />

              <p>
                <b>Kontaktinformasjon</b>
              </p>

              <p>
                e-post: kundeservice.hverdagshelt@mail.com
              </p>

              <p>
                Tlf: 12345678
              </p>

              <p>
                Fax: 12-345-678
              </p>

               <hr />
               <h3>Ofte stilte spørsmål</h3>

               <p>Hvordan fjerne Lillehammer fra kartet?</p>
               <p><b>Svar: </b>Vi jobber på spreng for å få til denne funksjonen. Vi beklager at denne funksjonen ikke finnes enda. </p>
               <br />
               <p>Hvordan registrere bruker?</p>
                <p><b>Svar: </b>Pass på at du skriver inn en gyldig e-post og et passord på minst 8 tegn. Du må også velge en kommune du ønsker å ha som hovedkommune. </p>
              <div style={{ height: '100px' }} />
            </div>
          </div>
        </div>
      </div>
    )}
}