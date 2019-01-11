import * as React from 'react';
import {Component,} from 'react-simplified';
import PropTypes from 'prop-types';
import shouldPureComponentUpdate from 'react-pure-render/function';

import {greatPlaceStyle, greatPlaceStyleHover} from './controllable_hover_styles.js';

export default class ControllableHover extends Component {
  static propTypes = {
    // use hover from controllable
    hover: PropTypes.bool,
    text: PropTypes.string
  };

  static defaultProps = {};

  shouldComponentUpdate = shouldPureComponentUpdate;

  constructor(props) {
    super(props);
  }

  render() {
    const style = this.props.hover ? greatPlaceStyleHover : greatPlaceStyle;

    return (
       <div className="hint hint--html hint--info hint--top" style={style}>
          
       </div>
    );
  }
}