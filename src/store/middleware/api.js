import axios from "axios";
import * as actions from "../api";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    if (action.type !== actions.apiCallBegan.type) return next(action);

    const { url, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    try {
      const response = await axios.request({
        url,
        method: "get", 
      });

      // Dispatch success actions
      dispatch({ type: actions.apiCallSuccess }); 
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data }); 

    } catch (error) {
      // Dispatch error actions
      dispatch({ type: actions.apiCallFailed, payload: error.message });
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;