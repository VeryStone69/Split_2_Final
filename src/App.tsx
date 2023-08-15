import React, {useEffect, useState} from 'react';
import './App.css';
import {CountMenu} from "./components/CountMenu/CountMenu";
import {SettingsMenu} from "./components/SetMenu/SettingsMenu";


function App() {

    const startCount = 0
    const startMaxInput = 1
    const [count, setCount] = useState<number>(startCount)
    const [countMax, setCountMax] = useState<number>(startCount)
    const [inputStartValue, setInputStartValue] = useState<number>(startCount)
    const [inputMaxValue, setInputMaxValue] = useState<number>(startMaxInput)

    // После перезагрузки страницы получаем из LocalStorage значение для настроек и главного счетчика
    useEffect(() => {
        // Если при первой загрузке/перезагрузке LocalStorage пустой, то устанавливаем стартовые значения.
        const start = localStorage.getItem("start value");
        const max = localStorage.getItem("max value")
        if (start === null || max === null) {
            localStorage.setItem("start value", JSON.stringify(inputStartValue));
            localStorage.setItem("max value", JSON.stringify(inputMaxValue));
        }

        getValuesFromLocalStorage();
        const getIncrementValue = localStorage.getItem("incrementValue");
        if (getIncrementValue !== null) {
            const newStartValue = JSON.parse(getIncrementValue)
            setCount(newStartValue)
        }
    }, [])

    // При изменении значения count - изменяется значение в LocalStorage
    useEffect(() => {
        localStorage.setItem("incrementValue", JSON.stringify(count))
    }, [count])

    // Получаем значения из LokalStorage и устанавливаем значения в State. Используется в useEffect() и в setValue()
    const getValuesFromLocalStorage = () => {
        const getStartValue = localStorage.getItem("start value");
        const getMaxValue = localStorage.getItem("max value")
        if (getStartValue) {
            const newStartValue = JSON.parse(getStartValue)
            setCount(newStartValue)
            setInputStartValue(newStartValue)
        }
        if (getMaxValue) {
            const newMaxValue = JSON.parse(getMaxValue)
            setCountMax(newMaxValue)
            setInputMaxValue(newMaxValue)
        }
    }


    // При клике на кнопку "INC" увеличиваем значение count и устанавливаем это значение в LocalStorage, чтобы не
    // терять его при перезагрузке
    const buttonClickInc = () => {
        if (count < countMax) {
            setCount(count + 1);
        }
    }
    // При клике на "RESET" - значение обновляется до установленного в настройках (LocalStorage).
    const buttonClickReset = () => {
        const startValueForReset = localStorage.getItem("start value");
        if (startValueForReset) setCount(JSON.parse(startValueForReset))
    }


    // Получаем максимальное значение из Input и устанавливаем его в State
    const setToMaxValue = (value: string) => {
        setInputMaxValue(JSON.parse(value))
    }

    // Получаем стартовое значение из Input и устанавливаем его в State
    const setToStartValue = (value: string) => {
        setInputStartValue(JSON.parse(value))
    }

    // При клике на "SET" - очищаем LokalStorage, устанавливаем новые значения в LokalStorage, устанавливаем значения в
    // State, обновляем значение в счетчике.
    const setValue = () => {
        localStorage.clear();
        localStorage.setItem("start value", JSON.stringify(inputStartValue));
        localStorage.setItem("max value", JSON.stringify(inputMaxValue));
        getValuesFromLocalStorage();
        buttonClickReset()
    }

    // Переменные для получения boolean значения. Предназначены для вывода ошибок.
    const errorInInput = inputStartValue < 0 || inputStartValue >= inputMaxValue;

    // Функция, которая сравнивает значения из State и LocalStorage, и возвращает true или false. Используется в
    // компоненте SetMenu -для вывода информации для пользователя, в компоненте Button name={Set}- для блокировки
    // кнопки
    const infoForUserCallBack = () => {
        const max = localStorage.getItem("max value");
        const start = localStorage.getItem("start value");
        const incrementValue = localStorage.getItem("incrementValue")
        // if (incrementValue == "0") return true
        if (max && start) {
            if (JSON.parse(max) !== inputMaxValue || JSON.parse(start) !== inputStartValue) return true;
        }

        return false;
    }


    return (
        <div className={"container"}>
            <CountMenu
                error={errorInInput}
                maxCount={countMax}
                count={count}
                callBackInc={buttonClickInc}
                callBackReset={buttonClickReset}
                callBackInfoForUser={infoForUserCallBack}
            />
            <SettingsMenu
                inputMaxValue={inputMaxValue}
                setToMaxValue={setToMaxValue}
                errorInInput={errorInInput}
                inputStartValue={inputStartValue}
                setToStartValue={setToStartValue}
                setValue={setValue}
                infoForUserCallBack={infoForUserCallBack}
            />
        </div>
    );
}

export default App;
