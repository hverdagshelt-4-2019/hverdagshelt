// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import Login from '../src/Components/Login/Login.js';
import { shallow, mount } from 'enzyme';

describe('Login tests', () => {
    const wrapper = shallow(<Login />);

    it('renders four divs initially', () =>{
        expect(wrapper.find('div').length).toEqual(4);
    });

});
