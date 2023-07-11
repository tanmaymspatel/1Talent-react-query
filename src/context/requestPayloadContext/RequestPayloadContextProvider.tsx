import { useState } from "react"
import { requestPayloadContext } from "./requestPayloadContext"
import { IRequestPayloadFields } from "../../shared/model/requestPayload.model";
interface IRequestPayloadProviderProps {
    children: React.ReactNode;
}
/** Initial request body for the post call */
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
/**
 * @returns State for the payload for the post request to get the employees details
 */
function RequestPayloadContextProvider({ children }: IRequestPayloadProviderProps) {
    /** State for the request payload */
    const [requestPayload, setRequestPayLoad] = useState<IRequestPayloadFields>(initialPayLoad);
    /** Values to be passed in request payload context provider, which is to be consumed */
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
