import React from 'react';
import s from './Counter.module.css'

type CounterPropsType = {
    count: number
    maxCount: number
}

export const Counter: React.FC<CounterPropsType> = (props) => {
    const {count,maxCount} = props
    return (
        <div className={count === maxCount ? `${s.counterRED}` : `${s.counter}`}>
            {count}
        </div>
    );
};

export default Counter;