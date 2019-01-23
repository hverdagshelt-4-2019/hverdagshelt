// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import Statistics from '../src/Components/Statistics/Statistics.js';
import { shallow, mount } from 'enzyme';

describe('Statistics tests', () => {
    const wrapper = shallow(<Statistics />);

    it('renders div', () =>{
        expect(wrapper.find('div').length).toEqual(8);
    });

    it('renders all three statistics types', () => {
        expect(wrapper.find('Doughnut').length).toEqual(1);
        expect(wrapper.find('Bar').length).toEqual(1);
        expect(wrapper.find('Line').length).toEqual(1);
    });
});
