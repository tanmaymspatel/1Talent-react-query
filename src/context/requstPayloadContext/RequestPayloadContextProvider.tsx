import { useState } from "react"
import { requestPayloadContext } from "./requestPayloadContext"

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

interface IRequestPayloadProviderProps {
    children: React.ReactNode;
}

function RequestPayloadContextProvider({ children }: IRequestPayloadProviderProps) {

    const [requestPayload, setRequestPayLoad] = useState<any>(initialPayLoad);

    const ctx = {
        requestPayload,
        setRequestPayLoad
    }

    return (
        <requestPayloadContext.Provider value={ctx}>
            {children}
        </requestPayloadContext.Provider>
    )
}

export default RequestPayloadContextProvider;
