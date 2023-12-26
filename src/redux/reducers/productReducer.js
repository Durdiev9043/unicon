  import { ActionType } from "../contants/Action-Type";

  export const productReducer = (state = "", { type, payload }) => {
    switch (type) {
      case ActionType.SET_ELIMENT:
        return { ...state, payload };
      default:
        return state;
    }
  };