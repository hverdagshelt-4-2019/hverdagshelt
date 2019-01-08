// @flow
//All credits to Ole Christian, beholder den bare fordi det er greit å få teste widgetsa også.
import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../src/widgets.js';
import { shallow, mount } from 'enzyme';

describe('Alert tests', () => {
  const wrapper = shallow(<Alert />);

  it('initially', () => {
    let instance: ?Alert = Alert.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expect(instance.alerts).toEqual([]);

    expect(wrapper.find('button.close')).toHaveLength(0);
  });

  it('after danger', done => {
    Alert.danger('test');

    setTimeout(() => {
      let instance: ?Alert = Alert.instance();
      expect(typeof instance).toEqual('object');
      if (instance) expect(instance.alerts).toEqual([{ text: 'test', type: 'danger' }]);

      expect(wrapper.find('button.close')).toHaveLength(1);

      done();
    });
  });

  it('after clicking close button', () => {
    wrapper.find('button.close').simulate('click');

    let instance: ?Alert = Alert.instance();
    expect(typeof instance).toEqual('object');
    if (instance) expect(instance.alerts).toEqual([]);

    expect(wrapper.find('button.close')).toHaveLength(0);
  });
});
