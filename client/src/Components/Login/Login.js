import { ReactDOM } from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';

export class Login extends Component {
  render() {
    return (
      <div>
        HverdagsHelt - en nasjonal platform til å oppdatere kommunen om feil på offentlig infrastruktur
        <form>
          <br />
          Email:
          <input type="email" placeholder="E-mail" />
          <br />
          Passord:
          <input type="password" placeholder="Passord" />
        </form>
        <a href="">Registrer deg som bruker</a>
      </div>
    );
  }
}
