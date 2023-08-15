import React from 'react';
import "./Button.module..css"
import {v1} from "uuid";

type ButtonPropsType = {
    name: string
    disable?: boolean
    callBack: ()=>void
}

export const Button: React.FC<ButtonPropsType> = (props) => {
    let {name, disable,callBack} = props
    const onCLickHandler = () => {
        callBack()
    }

    return (
        <div>
            <button id={v1()} className={"button"} onClick={onCLickHandler} disabled={disable}>{name}</button>
        </div>
    );
};
