// @flow
//All credits to Ole Christian, beholder den bare fordi det er greit å få teste widgetsa også.
import * as React from 'react';
import { Component } from 'react-simplified';
import { Login } from '../src/Components/Login/Login.js';
import { shallow, mount } from 'enzyme';

describe('Login tests', () => {
    const wrapper = shallow(<Login />);

    it('renders div', () =>{
        expect(wrapper.find('div').length).toEqual(5);
    });
    
});