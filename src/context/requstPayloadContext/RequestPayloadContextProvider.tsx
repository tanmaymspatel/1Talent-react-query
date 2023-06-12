import { useState } from "react"
import { requestPayloadContext } from "./requestPayloadContext"
/** Initial request body for the put call */
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
/**
 * @returns State for the requst body payload
 */
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
