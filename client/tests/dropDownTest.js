// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import DropDown from '../src/Components/Statistics/DropDown.js';
import { shallow, mount } from 'enzyme';

describe('DropDown tests', () => {
    const wrapper = shallow(<DropDown communes={['Trondheim']} />);

    it('renders DropDown', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('then renders the drop down menu', () => {
        expect(wrapper.find('select')).toHaveLength(1);
    });

    it('then renders only a single option, Trondheim', () => {
        expect(wrapper.find('option')).toHaveLength(1);
    });
});
