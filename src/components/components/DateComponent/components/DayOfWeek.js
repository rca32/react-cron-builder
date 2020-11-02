// @flow

import {PureComponent} from 'react'

const weekDaysOptions = [
    '월', '화', '수',
    '목', '금', '토',
    '일'
].map((day: string, i: number) => ({
    label: day,
    value: String(i + 1)
}));
 
const options = [
    {
        label: '매일',
        value: '*'
    },
    {
        label: '월요일 부터 금요일',
        value: '1-5'
    },
    {
        label: '토요일과 일요일',
        value: '6-7'
    }
].concat(weekDaysOptions);

export default class DayOfWeek extends PureComponent {
    static getOptions() {
        return options
    }

    static className: string = 'DayOfWeek';
}
