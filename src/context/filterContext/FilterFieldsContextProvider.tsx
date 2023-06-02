import { useState } from "react"
import { FilterFieldsContext } from "./filterFieldsContext"

const initialPayLoad = {
    field: "Name",
    order: "asc",
    filter: {
        isPagination: true,
        designations: [],
        domains: [],
        employmentTypeId: [],
        genders: [],
        subDomains: []
    }
}

interface IFilterFieldProviderProps {
    children: React.ReactNode;
}

function FilterFieldsContextProvider({ children }: IFilterFieldProviderProps) {

    const [requestPayload, setRequestPayLoad] = useState<any>(initialPayLoad);

    const ctx = {
        requestPayload,
        setRequestPayLoad
    }

    return (
        <FilterFieldsContext.Provider value={ctx}>
            {children}
        </FilterFieldsContext.Provider>
    )
}

export default FilterFieldsContextProvider
