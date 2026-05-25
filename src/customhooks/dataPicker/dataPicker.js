import { useState } from "react";

const useDataPicker =(initialState) =>{
 const [data, setData] = useState(initialState);
    // data handler 
const dataHandler = (prop, value) =>{
    setData(data=>({
        ...data,
        [prop] : value,
    }))
};
// reset Data 
const reset = () => setData(initialState); 
return [data, dataHandler, reset];

}
export default useDataPicker;