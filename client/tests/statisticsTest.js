// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import Statistics from '../src/Components/Statistics/Statistics.js';
import { shallow, mount } from 'enzyme';

describe('Statistics tests', () => {
    const wrapper = shallow(<Statistics />);

    it('renders Statistics', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('renders all three statistics types', () => {
        expect(wrapper.find('Doughnut').length).toEqual(1);
        expect(wrapper.find('Bar').length).toEqual(1);
        expect(wrapper.find('Line').length).toEqual(1);
    });
});
