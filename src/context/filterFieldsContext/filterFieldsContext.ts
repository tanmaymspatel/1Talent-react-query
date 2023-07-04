import { createContext } from "react";
import { IFilterFields } from "../../shared/model/requestPayload.model";

interface IFilterFieldsContext {
    domainState: { selectedDomains: string[], setSelectedDomains: React.Dispatch<React.SetStateAction<string[]>> },
    subDomainState: { selectedSubDomains: string[], setSelectedSubDomains: React.Dispatch<React.SetStateAction<string[]>> },
    designationState: { designationsValue: string[], setDesignationsValue: React.Dispatch<React.SetStateAction<string[]>> },
    employementState: { employementValue: string[], setEmployementValue: React.Dispatch<React.SetStateAction<string[]>> },
    genderState: { gendersValue: string[], setGendersValue: React.Dispatch<React.SetStateAction<string[]>> },
    localState: { localFilterFields: IFilterFields, setLocalFilterFields: React.Dispatch<React.SetStateAction<IFilterFields>> }
}

const initialValue = {
    domainState: { selectedDomains: [], setSelectedDomains: () => { } },
    subDomainState: { selectedSubDomains: [], setSelectedSubDomains: () => { } },
    designationState: { designationsValue: [], setDesignationsValue: () => { } },
    employementState: { employementValue: [], setEmployementValue: () => { } },
    genderState: { gendersValue: [], setGendersValue: () => { } },
    localState: { localFilterFields: {} as IFilterFields, setLocalFilterFields: () => { } }
}

export const FilterFieldsContext = createContext<IFilterFieldsContext>(initialValue);