import { createContext } from "react";
import { IRequestPayloadFields } from "../../shared/model/requestPayload.model";

interface IRequestPayload {
    requestPayload: IRequestPayloadFields,
    setRequestPayLoad: React.Dispatch<React.SetStateAction<IRequestPayloadFields>>
}

const initialValue = {
    requestPayload: {} as IRequestPayloadFields,
    setRequestPayLoad: () => { }
}

export const requestPayloadContext = createContext<IRequestPayload>(initialValue);