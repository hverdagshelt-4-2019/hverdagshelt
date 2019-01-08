// @flow
/* eslint eqeqeq: "off" */

import * as React from 'react';
import { Component } from 'react-simplified';
import { Route, NavLink } from 'react-router-dom';

/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
  alerts: { text: React.Node, type: string }[] = [];

  render() {
    return (
      <>
        {this.alerts.map((alert, i) => (
          <div key={i} className={'alert alert-' + alert.type} role="alert">
            {alert.text}
            <button
              className="close"
              onClick={() => {
                this.alerts.splice(i, 1);
              }}
            >
              &times;
            </button>
          </div>
        ))}
      </>
    );
  }

  static success(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'success' });
    });
  }

  static info(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'info' });
    });
  }

  static warning(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'warning' });
    });
  }

  static danger(text: React.Node) {
    // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
    setTimeout(() => {
      for (let instance of Alert.instances()) instance.alerts.push({ text: text, type: 'danger' });
    });
  }
}
