
import { InteractionStatus, InteractionRequiredAuthError } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import axios from "axios"
import { useEffect } from 'react'
/**
 * @returns Interceptor for adding access token to the headers
 */
function Interceptor(props: any) {
    console.log("interceptor called");

    const { instance, inProgress, accounts } = useMsal();

    const accessTokenRequest = {
        scopes: ['openid', 'offline_access', 'api://582856b6-2df6-45b5-b481-c4bb646d7cca/Employee.Read'],
        account: accounts[0],
    };

    console.log({ inProgress }, { instance }, { accounts });

    const ACCESS_TOKEN = localStorage.getItem("accessToken");

    axios.defaults.baseURL = "https://dev-1talent-api.azurewebsites.net/api";
    axios.interceptors.request.use((config: any) => {
        config.headers.Author = 'Tanmay Patel'
        config.headers.Authorization = "Bearer " + ACCESS_TOKEN
        return config
    }, (error) => console.log(error))

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

    return <div>{props.children}</div>
}


export default Interceptor;
