import { toast } from "react-toastify";
import { apiCallFailed } from "../api";

const toastDisplay =
  ({ dispatch, getState }) =>
  (next) =>
    (action) => {
    if (action.type === apiCallFailed.type) toast.error("An unexpected error occured");
    next(action);
  };

export default toastDisplay;
