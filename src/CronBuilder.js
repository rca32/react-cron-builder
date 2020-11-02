// @flow

import React, {PureComponent} from 'react'
import BEMHelper from 'react-bem-helper'
import {If, Then} from 'react-if'
import {generateCronExpression, parseCronExpression} from 'utils'
import cronsTrue from 'cronstrue'
import noop from 'lodash/noop'
import Tab from './components/Tab'
import PeriodicallyTab from './components/PeriodicallyTab'
import PeriodicallyFrameTab from './components/PeriodicallyFrameTab'
import FixedTimeTab from './components/FixedTimeTab'

import './cron-builder.styl'

const styleNameFactory = new BEMHelper('cron-builder');

type Props = {
    cronExpression: string,
    showResult?: boolean,
    onChange: Function
};

type State = {
    Component: any,
    generatedExpression: string
}

const components = [PeriodicallyTab, PeriodicallyFrameTab, FixedTimeTab];


export default class CronBuilder extends PureComponent {
    static defaultProps = {
        cronExpression: '* * * * *',
        showResult: true,
        onChange: noop
    };

    constructor(props: Props, ctx: Object) {
        super(props, ctx);
        this.state = {
            Component: PeriodicallyFrameTab,
            generatedExpression: ''
        };
    }
    state: State;
    props: Props;
    presetComponent: any;

    generateExpression = () => {
        const {onChange} = this.props;
        this.setState({
            generatedExpression: generateCronExpression(
                this.presetComponent.getExpression()
            )
        }, () =>{
            onChange(this.state.generatedExpression)
        });
    };

    render() {
        const {cronExpression, showResult} = this.props;
        const {Component, generatedExpression} = this.state;
        return (
            <div {...styleNameFactory()} >
                    <Component
                        styleNameFactory={styleNameFactory}
                        ref={(component: any) => this.presetComponent = component}
                        expression={parseCronExpression(cronExpression)}
                        onChange = {()=>{this.generateExpression()}}
                    />
            </div>
        )
    }
}

function PrettyExpression(props: any) {
    const {expression} = props;
    return (
        <div
            {...styleNameFactory('pretty-expression')}
        >
            {cronsTrue.toString(expression)}
        </div>
    )
}
