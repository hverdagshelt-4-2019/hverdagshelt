// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import AddPage from '../src/Components/AdminAdd/AddPage.js';
import { shallow, mount } from 'enzyme';

describe('AddPage tests', () => {
    const wrapper = shallow(<AddPage />);

    it('renders all divs', () => {
        expect(wrapper.find('div').length).toEqual(8);
    });      
});
