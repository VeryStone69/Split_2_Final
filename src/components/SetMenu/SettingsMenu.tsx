import React from 'react';
import s from "./SettingsMenu.module.css"
import {Input} from "../Input/Input";
import {Button} from "../Button/Button";

type SettingsMenuPropsType = {
    inputMaxValue: number
    setToMaxValue: (value: string) => void
    setToStartValue: (value: string) => void
    errorInInput: boolean
    inputStartValue: number
    setValue: () => void
    infoForUserCallBack: () => boolean
}

export const SettingsMenu: React.FC<SettingsMenuPropsType> = (props) => {
    console.log("SettingsMenu IS RENDERING")
    const {
        inputMaxValue,
        setToMaxValue,
        errorInInput,
        inputStartValue,
        setToStartValue,
        setValue,
        infoForUserCallBack
    } = props

    return (
        <div className={s.settingsWrapper}>
            <div className={s.inputContainer}>
                <Input startValue={inputMaxValue}
                       callBack={setToMaxValue}
                       name={"max value"}
                       error={errorInInput}/>
                <Input startValue={inputStartValue}
                       callBack={setToStartValue}
                       name={"start value"}
                       error={errorInInput}/>
            </div>
            <div className={s.setButton}>
                <Button name={"set"}
                        callBack={setValue}
                        disable={errorInInput || !infoForUserCallBack()} // ! перед infoForUserCallBack
                />
            </div>
        </div>
    );
};