import { useReducer } from "react";
import { FilterFieldsContext } from "./filterFieldsContext"
import { IFilterFields } from "../../shared/model/requestPayload.model";
import { IAction } from "../../shared/model/filterContext.model";

interface IFilterFieldsProviderProps {
    children: React.ReactNode;
}
/** Initial filter object, if no filters are applied */
const initialLocalFilterFields: IFilterFields = {
    designations: [],
    domains: [],
    employmentTypeId: [],
    genders: [],
    isPagination: true,
    subDomains: []
}
/**
 * @returns Fields for storing the checked filter field values  
 */
function FilterFieldsContextProvider({ children }: IFilterFieldsProviderProps) {
    /**
     * @name filterReducer
     * @param state previously stored values of the filter fields
     * @param action actions which are dispatched while checking/unchecking the filter fields
     * @returns new filter fields object after checking/unchecking values
     */
    const filterReducer = (state: IFilterFields, action: IAction) => {
        switch (action.type) {
            case "UPDATE_DESIGNATION_FIELD":
                return { ...state, designations: action.payload };
            case "UPDATE_EMPLOYEE_TYPES_FIELD":
                return { ...state, employmentTypeId: action.payload };
            case "UPDATE_GENDER_FIELD":
                return { ...state, genders: action.payload };
            case "UPDATE_DOMAIN_FIELD":
                return { ...state, domains: action.payload };
            case "UPDATE_SUB_DOMAIN_FIELD":
                return { ...state, subDomains: action.payload };
            default:
                return state;
        }
    }
    /** userReducer for maintaining state of the filter fields */
    const [state, dispatch] = useReducer(filterReducer, initialLocalFilterFields);
    /** Values to be passed in filter fields context provider, which is to be consumed */
    const filterFieldsCtx = {
        state,
        dispatch,
    }

    return (
        <FilterFieldsContext.Provider value={filterFieldsCtx}>
            {children}
        </FilterFieldsContext.Provider>
    )
}

export default FilterFieldsContextProvider;
