// @flow
//All credits to Ole Christian, beholder den bare fordi det er greit å få teste widgetsa også.
import * as React from 'react';
import { Component } from 'react-simplified';
import { TicketList } from '../src/Components/TicketList/TicketList.js';
import { shallow, mount } from 'enzyme';

describe('TicketList tests', () => {
    const wrapper = shallow(<TicketList />);

    it('renders div', () =>{
        expect(wrapper.find('div').length).toEqual(10);
    });
});
