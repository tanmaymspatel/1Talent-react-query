import { InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import axios from "axios"
import { useEffect } from 'react'
interface IInterCeptorPrps {
    children: React.ReactNode
}
/**
 * @returns Interceptor for adding access token to the headers
 */
function Interceptor({ children }: IInterCeptorPrps) {

    const { instance, inProgress, accounts } = useMsal();
    /** accesstoken request object to get the access token */
    const accessTokenRequest = {
        scopes: ['openid', 'offline_access', 'api://582856b6-2df6-45b5-b481-c4bb646d7cca/Employee.Read'],
        account: accounts[0],
    };
    /** getting access token from the local storage */
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    /** Changing the base url for api calls */
    axios.defaults.baseURL = "https://dev-1talent-api.azurewebsites.net/api";
    /** Intercepting the request headers */
    axios.interceptors.request.use((config: any) => {
        config.headers.Author = 'Tanmay Patel'
        config.headers.Authorization = "Bearer " + ACCESS_TOKEN
        return config
    }, (error) => console.log(error))
    /** Getting the access token and storing it to the local storage */
    useEffect(() => {
        try {
            if (inProgress === InteractionStatus.None) {
                instance
                    .acquireTokenSilent(accessTokenRequest)
                    .then((accessTokenResponse) => {
                        // Acquire token silent success
                        console.log(accessTokenResponse);
                        localStorage.setItem("accessToken", (accessTokenResponse.accessToken));
                    })
                    .catch((error) => {
                        if (error instanceof InteractionRequiredAuthError) {
                            instance.acquireTokenRedirect(accessTokenRequest);
                        }
                        console.log(error, "errr");
                    });
            }
        }
        catch (e) {
            console.log(e);
        }
    }, [inProgress, instance])

    return <div>{children}</div>
}


export default Interceptor;
