import React from 'react';
import s from "./CountMenu.module.css";
import Counter from "./Counter/Counter";
import {Button} from "../Button/Button";

type CountMenuPropsType = {
    error: boolean
    maxCount: number
    count: number
    callBackInc: () => void
    callBackReset: () => void
    callBackInfoForUser: () => boolean
}

export const CountMenu: React.FC<CountMenuPropsType> = (props) => {
    const {
        error,
        maxCount,
        count,
        callBackInc,
        callBackReset,
        callBackInfoForUser,
    } = props

    return (
        <div className={s.counterWrap}>
            {error
                ? <div className={s.counterError}>Incorrect Value</div>
                : callBackInfoForUser()
                    ? <div className={s.infoForUser}>Enter values and press 'set'</div>
                    : <Counter maxCount={maxCount} count={count}/>
            }
            <div className={s.buttons}>
                <Button name={"inc"} callBack={callBackInc} disable={count === maxCount || error}/>
                <Button name={"reset"} callBack={callBackReset} disable={error}/>
            </div>
        </div>
    );
};
