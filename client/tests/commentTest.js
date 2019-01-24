// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import Comment from '../src/Components/Comment/Comment.js';
import { shallow, mount } from 'enzyme';

describe('Comment tests', () => {
    const wrapper = shallow(<Comment name="Navn" description="Beskrivelse" />);

    it('renders a four divs initially', () => {
         expect(wrapper.find('div').length).toEqual(4);
    });
});
