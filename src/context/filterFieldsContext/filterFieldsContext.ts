import { createContext } from "react";
import { IFilterFields } from "../../shared/model/requestPayload.model";
import { IAction } from "../../shared/model/filterContext.model";

interface IFilterFieldsContext {
    state: IFilterFields,
    dispatch: React.Dispatch<IAction>
};
/** Initial value to be added in filter context */
const initialValue = {
    state: {} as IFilterFields,
    dispatch: () => { },
}
/** Creating a context for storing the value of the filter fields */
export const FilterFieldsContext = createContext<IFilterFieldsContext>(initialValue);