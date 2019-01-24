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

                <p>1. Hvordan fjerne Lillehammer fra kartet?</p>
                <p><b>Svar: </b>Vi jobber på spreng for å få til denne funksjonen. Vi beklager at denne funksjonen ikke finnes enda. </p>
                <br />
                <p>2. Hvordan registrere bruker?</p>
                <p><b>Svar: </b>Pass på at du skriver inn en gyldig e-post og et passord på minst 8 tegn. Du må også velge en kommune du ønsker å ha som hovedkommune. </p>
                <br />
                <p>3. Hvordan finne saker for min kommune på kartet?</p>
                <p><b>Svar: </b> 
                Hvis du ikke har laget en bruker på siden, må du godta forespørselen om å dele din posisjon når du klikker deg inn på kartet.
                Uten å lage en bruker vil du kun ha tilgang til saker i kommunen du befinner deg i (eller ingen hvis du ikke godtar forespørselen om å dele din posisjon).
                Hvis du lager en bruker vil du kun se saker for din hjemmekommune. Hvis du ønsker, kan du gå inn på "Min Side" og legge til flere kommuner du ønsker å følge,
                og dermed få opp saker for flere kommuner. 
                </p>
                <br />
                <p>4. Hvordan får jeg opp flere saker på kartet?</p>
                <p><b>Svar: </b>
                Kartet vil vise alle sakene for kommunen du befinner deg i. Du kan få tilgang til sakene i flere kommuner ved å
                lage en bruker (se svaret på spørsmål 4 for flere detaljer).
                </p>
                <br />
                <p>5. Hvordan laster jeg opp en sak?</p>
                <p><b>Svar: </b>
                Du kan laste opp en sak etter å ha laget en bruker (se svaret på spørsmål 2 for flere detaljer).
                Trykk på "Legg til sak" i menyen øverst på siden. Legg til en tittel, en beskrivelse, velg en kategori og marker på kartet hvor
                hendelsen tar sted. Du kan også laste opp et bilde hvis du ønsker. Hvis du ikke laster opp et bilde, vil et standard bilde bli satt på saken din.
                </p>
              <div style={{ height: '100px' }} />
            </div>
          </div>
        </div>
      </div>
    )}
}