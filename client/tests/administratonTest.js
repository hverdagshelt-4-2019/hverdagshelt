// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import Administration from '../src/Components/Administration/Administration.js';
import { shallow, mount } from 'enzyme';

describe('Administration tests', () => {
    const wrapper = shallow(<Administration />);

    it('renders Administration', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('renders all different administration pages', () => {
        expect(wrapper.find('UserArchive')).toHaveLength(1);
        expect(wrapper.find('AddPage')).toHaveLength(1);
        expect(wrapper.find('CategoryCreation')).toHaveLength(1);
        expect(wrapper.find('AddCompany')).toHaveLength(1);
    });    
});
