import { ActionType } from "../contants/Action-Type"


export const eliment = (produc) =>{
    return{
        type: ActionType.SET_ELIMENT,
        payload: produc,
    }
};
