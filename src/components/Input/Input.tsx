import React, {ChangeEvent} from 'react';
import s from "./Input.module.css"

type InputPropsType = {
    name: string
    callBack: (value: string) => void
    startValue: number
    error: boolean
}
export const Input: React.FC<InputPropsType> = (props) => {
    const {name, callBack, startValue, error} = props
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value
        callBack(value)
    }
    return (
        <div className={s.inputItem}>
            <span className={s.InputValueName}>{name}</span>
            <input className={error ? s.error : s.notError} value={startValue} onChange={onChangeHandler}
                   type={"number"}/>
        </div>
    );
};