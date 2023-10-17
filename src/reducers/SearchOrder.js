import { Map } from "immutable";
import { ActionTypes } from "../constants";
import { createReducer } from "../utils/commonService";


const initialState = Map({
  isLoading: false,
  hitsData: [],
});

export default {
  searchedOrder: createReducer(initialState, {
    [ActionTypes.SEARCHED_ORDER_DATA_RECEIVED]: (state, { arrData }) => {
      return state.withMutations((stateMap) => {
        stateMap.set("hitsData", arrData || []);
      });
    },
    [ActionTypes.IS_SEARCHED_ORDER_LOADING]: (state, { loading }) => {
      return state.withMutations((stateMap) => {
        stateMap.set("isLoading", loading);
      });
    },
  }),
};

export function isSearchedOrderLoading(state) {
  return state.getIn(["searchedOrder", "isLoading"]);
}

export function isSearchedOrderData(state) {
  return state.getIn(["searchedOrder", "hitsData"]);
}
