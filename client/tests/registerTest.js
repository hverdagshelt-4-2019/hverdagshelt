// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import Register from '../src/Components/Login/register.js';
import { shallow, mount } from 'enzyme';

describe('Register tests', () => {
    const wrapper = shallow(<Register />);

    it('renders div', () =>{
        expect(wrapper.find('div').length).toEqual(5);
    });
});
