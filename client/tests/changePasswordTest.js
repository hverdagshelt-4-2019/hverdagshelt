// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import ChangePassword from '../src/Components/ChangePassword/ChangePassword.js';
import { shallow, mount } from 'enzyme';

describe('ChangePassword tests', () => {
    const wrapper = shallow(<ChangePassword />);

    it('renders ChangePassword', () => {
         expect(wrapper.exists()).toBe(true);
    });

    it('renders a single div initially', () => {
         expect(wrapper.find('div').length).toEqual(1);
    });
});
