// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import CategoryCreation from '../src/Components/CategoryCreation/CategoryCreation.js';
import { shallow, mount } from 'enzyme';

describe('CategoryCreation tests', () => {
    const wrapper = shallow(<CategoryCreation />);

    it('renders CategoryCreation', () => {
         expect(wrapper.exists()).toBe(true);
    });

    it('renders the two Adder components', () => {
        expect(wrapper.find('Adder').length).toEqual(2);
    });
});
