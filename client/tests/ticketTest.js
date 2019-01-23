// @flow
//All credits to Ole Christian, beholder den bare fordi det er greit å få teste widgetsa også.
import * as React from 'react';
import { Component } from 'react-simplified';
import Ticket from '../src/Components/Ticket/Ticket.js';
import { shallow, mount } from 'enzyme';

describe('Ticket tests', () => {
    const wrapper = shallow(<Ticket />);

    it('renders div', () =>{
        expect(wrapper.find('div').length).toEqual(10);
    });
});
