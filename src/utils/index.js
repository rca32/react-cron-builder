// @flow

import type {Option} from 'types/Option'
import type {CronExpression} from 'types/CronExpression'

import head from 'lodash/head'
import values from 'lodash/values'
import get from 'lodash/get'
import {MINUTES, HOURS, EVERY} from 'data/constants'

export const toggleMultiple = (value: any) => {
    if(value instanceof Array) {
        return head(value)
    } else {
        return [value]
    }
};

export const toOptions = (_values: Array<any>) => {
    return _values.map(String).map((value: string) => ({
        value,
        label: value
    }))
};

export const toggleDateType = (value: string) => {
    return value === MINUTES ? HOURS : MINUTES
};

export const parseTimeValue = (value: any) => {
    if(value instanceof Array) {
        return value.map(parseTimeValue)
    }
    switch (value) {
        case '*/0':
            return '0';
        case '*':
            return '1';
        default:
            return value;
    }
};

export const isMultiple = (value: any) => value instanceof Array;

export const ensureMultiple = (value: any, multiple: boolean) => {
    if(multiple && !isMultiple(value)) {
        return toggleMultiple(value)
    }
    if(!multiple && isMultiple(value)) {
        return toggleMultiple(value)
    }
    return value
};

export const getValues = (value: Array<Option>) => value.map((option: Option) => option.value);

export const getValue = (value: any) => {
    return get(value, 'value') || value
};

export const generateCronExpression = (expression: CronExpression) => {
    if(expression["minutes"]==="*/0")
    {
        expression["minutes"] = "*/30 */1";
    }
    return values(expression).join(' ')
};

export const splitMultiple = (value: string, field: ?string = undefined) => {
    if(value.includes(',')) {
        return value.split(',')
    }
    if(value.includes('/')) {
        return value
    }
    if(value.includes('-') && field === HOURS) {
        return value
    }
    if(value === EVERY) {
        return value
    }
    return [value]
};

export const replaceEvery = (value: any) => {
    if(typeof value === 'string') {
        return value.replace('*/', '')
    }
    return value
};

export const parseCronExpression = (expression: string) => {
    const segments = expression.split(' ');
    if(segments.length==5)
    {
        const [minutes, hours, dayOfMonth, month, dayOfWeek] = segments;
        const defaultExpression = {
            minutes: EVERY,
            hours: EVERY,
            dayOfMonth: EVERY,
            month: EVERY,
            dayOfWeek: EVERY
        };
        return Object.assign(defaultExpression, {
            minutes: replaceEvery(splitMultiple(minutes)),
            hours: replaceEvery(splitMultiple(hours, HOURS)),
            dayOfMonth: splitMultiple(dayOfMonth),
            month: splitMultiple(month),
            dayOfWeek: splitMultiple(dayOfWeek)
        })  
    }
    else if(segments.length==6)
    {
        const [seconds,minutes, hours, dayOfMonth, month, dayOfWeek] = segments;
        const defaultExpression = {
            minutes: EVERY,
            hours: EVERY,
            dayOfMonth: EVERY,
            month: EVERY,
            dayOfWeek: EVERY
        };
        return Object.assign(defaultExpression, {
            minutes: "*/0",
            hours: replaceEvery(splitMultiple(hours, HOURS)),
            dayOfMonth: splitMultiple(dayOfMonth),
            month: splitMultiple(month),
            dayOfWeek: splitMultiple(dayOfWeek)
        })  
    }
};

export const addLeadingZero = (el: any) => `0${el}`.slice(-2);

export const addLeadingZeroToOption = (option: Option) => {
    const {value, label} = option;
    return {
        label: addLeadingZero(label),
        value
    }
};

export const defaultTo = (item: string, defaultItem: string) => {
    return (item === EVERY || !item) ? defaultItem : item
};

export const rangeHoursToSingle = (hours: any) => {
    if(hours instanceof Array) {
        return hours
    }
    return hours.split('-')[0]
};

