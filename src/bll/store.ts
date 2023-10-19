import {applyMiddleware, combineReducers, legacy_createStore} from 'redux';
import {counterReducer, CounterReducerActionType} from "./counter-reducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";



export type AppStateType = ReturnType<typeof rootReducer>
export type RootState = ReturnType<typeof store.getState>
// export type AppDispatch = typeof store.dispatch
export type AppActionsType = CounterReducerActionType
export type AppDispatch = ThunkDispatch< RootState, unknown, AppActionsType>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AppActionsType>



const rootReducer = combineReducers({
    counter:counterReducer
})
export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));