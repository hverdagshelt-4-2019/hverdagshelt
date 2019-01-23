// @flow
//All credits to Ole Christian, beholder den bare fordi det er greit å få teste widgetsa også.
import * as React from 'react';
import { Component } from 'react-simplified';
import { Register } from '../src/Components/Login/register.js';
import { shallow, mount } from 'enzyme';

describe('Register tests', () => {
    const wrapper = shallow(<Register />);

    it('renders div', () =>{
        expect(wrapper.find('div').length).toEqual(5);
    });

});
