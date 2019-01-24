// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import Comment from '../src/Components/Comment/Comment.js';
import { shallow, mount } from 'enzyme';

describe('Comment tests', () => {
    const wrapper = shallow(<Comment name="Navn" description="Beskrivelse" />);

    it('renders Comment', () => {
        expect(wrapper.exists()).toBe(true);
    });

    it('renders four divs initially', () => {
         expect(wrapper.find('div').length).toEqual(4);
    });

    it('uses both props name and description to render an header and a paragraph', () => {
        expect(wrapper.find('h4').text()).toBe("Navn");
        expect(wrapper.find('p').text()).toBe("Beskrivelse");
    });
});
