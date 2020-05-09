import React,{createContext,useReducer} from 'react'
import Reducer from '../Reducer/Reducer';

export const Context = createContext();

const ContextProvider = (props) => {
    const initialState = {
        view : 'home',
        invoice_detail : '',
        temp_data_invoice : [],
        temp_data_mechanic : []
    };
    const [dataContext,dispatch] = useReducer(Reducer,initialState);

    return (
        <Context.Provider value = {{
                dataContext,
                dispatch
            }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider