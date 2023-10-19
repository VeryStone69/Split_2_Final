import {Dispatch} from "redux";
import {AppThunk} from "./store";

const initialState = {
    count: 0,
    newStartValue: 0,
    countMax: 0,
    inputMaxValue: 1
}

type InitialStateType = typeof initialState
export type CounterReducerActionType = ReturnType<typeof incCounterValueAC>
    | ReturnType<typeof setValueFromLocalStorageAC>
    | ReturnType<typeof setInputStartValueAC>
    | ReturnType<typeof setCountMaxAC>
    | ReturnType<typeof setInputMaxValueAC>

export const counterReducer = (state: InitialStateType = initialState, action: CounterReducerActionType): InitialStateType => {
    switch (action.type) {
        case 'INC-VALUE': {
            return {...state, count: action.count}
        }
        case "SET-VALUE-FROM-LOCAL-STORAGE": {
            return {...state, count: action.value}
        }
        case "SET-INPUT-START-VALUE": {
            return {...state, newStartValue: action.newStartValue}
        }
        case "SET-COUNT-MAX-VALUE": {
            return {...state, countMax: action.newMaxValue}
        }
        case "SET-INPUT-MAX-VALUE":{
            return {...state,inputMaxValue: action.inputMaxValue}
        }
        default:
            return {...state}
    }
}

export const incCounterValueAC = (count: number) => (
    {
        type: "INC-VALUE" as const,
        count
    })
export const setValueFromLocalStorageAC = (value: number) => ({
    type: "SET-VALUE-FROM-LOCAL-STORAGE" as const,
    value
})
export const setInputStartValueAC = (newStartValue: number) => ({
    type: "SET-INPUT-START-VALUE" as const,
    newStartValue
})
export const setCountMaxAC = (newMaxValue:number)=>({
    type: "SET-COUNT-MAX-VALUE" as const,
    newMaxValue
})
export const setInputMaxValueAC=(inputMaxValue:number)=>({
    type: "SET-INPUT-MAX-VALUE" as const,
    inputMaxValue
})

//<=====-THUNK-=====>
export const getValueFromLocalStorageTC = ():AppThunk => (dispatch: Dispatch) => {
    const getStartValue = localStorage.getItem("start value");
    const getMaxValue = localStorage.getItem("max value")
    if (getStartValue) {
        const newStartValue = JSON.parse(getStartValue)
        dispatch(incCounterValueAC(newStartValue))
        dispatch(setInputStartValueAC(newStartValue))
    }
    if (getMaxValue) {
        const newMaxValue = JSON.parse(getMaxValue)
        dispatch(setCountMaxAC(newMaxValue))
        dispatch(setInputMaxValueAC(newMaxValue))
    }
}