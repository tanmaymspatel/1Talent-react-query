import { useState } from "react";
import { FilterFieldsContext } from "./filterFieldsContext"

interface IFilterFieldsProviderProps {
    children: React.ReactNode;
}

const initialLocalFilterFields = {
    designations: [],
    domains: [],
    employmentTypeId: [],
    genders: [],
    isPagination: true,
    subDomains: []
}
function FilterFieldsContextProvider({ children }: IFilterFieldsProviderProps) {

    const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
    const [selectedSubDomains, setSelectedSubDomains] = useState<string[]>([]);
    const [designationsValue, setDesignationsValue] = useState<string[]>([]);
    const [employementValue, setEmployementValue] = useState<string[]>([]);
    const [gendersValue, setGendersValue] = useState<string[]>([]);
    const [localFilterFields, setLocalFilterFields] = useState<any>(initialLocalFilterFields);

    const filterFieldsCtx = {
        domainState: { selectedDomains, setSelectedDomains },
        subDomainState: { selectedSubDomains, setSelectedSubDomains },
        designationState: { designationsValue, setDesignationsValue },
        employementState: { employementValue, setEmployementValue },
        genderState: { gendersValue, setGendersValue },
        localState: { localFilterFields, setLocalFilterFields }
    }

    return (
        <FilterFieldsContext.Provider value={filterFieldsCtx}>
            {children}
        </FilterFieldsContext.Provider>
    )
}

export default FilterFieldsContextProvider
