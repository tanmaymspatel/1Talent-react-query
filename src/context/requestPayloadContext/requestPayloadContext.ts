import { createContext } from "react";
import { IRequestPayloadFields } from "../../shared/model/requestPayload.model";

interface IRequestPayload {
    requestPayload: IRequestPayloadFields,
    setRequestPayLoad: React.Dispatch<React.SetStateAction<IRequestPayloadFields>>
}
/** Initial values to be added in request payload context*/
const initialValue = {
    requestPayload: {} as IRequestPayloadFields,
    setRequestPayLoad: () => { }
}
/** Creating context for setting the payload for post request to get the employees details  */
export const requestPayloadContext = createContext<IRequestPayload>(initialValue);