const Reducer = (state,action) => {
    switch(action.type){
        case 'CHANGE_VIEW' : 
            return {
                ...state,
                view : action.data
            }
        case 'INVOICE_DETAIL' : 
            return {
                ...state,
                invoice_detail : action.data
            }
        case 'CLEAR_INVOICE_DETAIL' : 
            return {
                ...state,
                invoice_detail : ''
            }
        case 'ADD_TEMP_DATA_INVOICE' :
            return {
                ...state,
                temp_data_invoice : action.data
            }      
        // const filter_data = state.temp_data_invoice.filter(list => {
        //     if(list.id.includes(action.data.id)){
        //         return true
        //     }
        //     return false
        // });
        // if(filter_data.length){
        //     const filter = state.temp_data_invoice.filter(list => list.id === action.data.id);
        //     const temp_data_filter = state.temp_data_invoice.filter(list => list.id !== action.data.id);
        //     const data_filter = {
        //         id : filter[0].id,
        //         product_name : filter[0].product_name,
        //         product_price : filter[0].product_price,
        //         qty : filter[0].qty + action.data.qty
        //     }
        //     temp_data_filter.push(data_filter);
            
        //     return{
        //         ...state,
        //         temp_data_invoice : temp_data_filter
        //     }
        // }else{
        //     let temp_data = state.temp_data_invoice;
        //     temp_data.push(action.data);
        //         return {
        //             ...state,
        //             temp_data_invoice : temp_data
        //         }
        // }
        case 'CLEAR_TEMP_DATA_INVOICE' : 
            return {
                ...state,
                temp_data_invoice : []
            }

        case 'ADD_TEMP_DATA_MECHANIC' : 
            return {
                ...state,
                temp_data_mechanic : action.data
            }
        default : return state
    }
}

export default Reducer