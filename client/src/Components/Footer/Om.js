import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component,} from 'react-simplified';

export default class Om extends Component{
    render(){
        return(
            <div className="aroundStuff">
        <div className="container">
          <div className="row">
            <div className="col-lg-10" style={{marginLeft: "8%", marginRight: "8%"}}>
              <br />
              <h1>Om HverdagsHelt</h1>

              <hr />

              <p>
                HverdagsHelt er en plattform for alle kommuner i Norge hvor man kan melde inn om feil og mangler ved infrastruktur i de ulike tettstedene.
              </p>

              <p>
                HverdagsHelt ble lansert i februar i 2019. Vårt hovedkontor befinner seg i Raffelkakuveien 21, 7340 Oppdal B)
              </p>

              <div style={{ height: '100px' }} />
            </div>
          </div>
        </div>
      </div>
    )}
}