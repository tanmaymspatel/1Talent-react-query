import { InteractionRequiredAuthError, InteractionStatus } from "@azure/msal-browser";
import { useMsal } from "@azure/msal-react";
import axios from "axios"
import { useEffect } from "react";

function Interceptor(props: any) {

    const { instance, inProgress, accounts } = useMsal();

    useEffect(() => {
        const accessTokenRequest = {
            scopes: ['openid', 'offline_access', 'api://582856b6-2df6-45b5-b481-c4bb646d7cca/Employee.Read'],
            account: accounts[0],
        };
        if (inProgress === InteractionStatus.None) {
            instance
                .acquireTokenSilent(accessTokenRequest)
                .then((accessTokenResponse) => {
                    // Acquire token silent success
                    localStorage.setItem("accessToken", (accessTokenResponse.accessToken));


                })
                .catch((error) => {
                    if (error instanceof InteractionRequiredAuthError) {
                        instance.acquireTokenRedirect(accessTokenRequest);
                    }
                    console.log(error);
                });
        }
    }, [instance, accounts, inProgress]);

    const ACCESS_TOKEN = localStorage.getItem("accessToken")
    // axios.defaults.baseURL = "https://dev-1talent-api.azurewebsites.net/api";
    axios.defaults.baseURL = "https://dev-1talent-api.azurewebsites.net/api";
    axios.interceptors.request.use((request: any) => {
        request.headers.Author = 'Tanmay Patel'
        request.headers.Authorization = "Bearer " + ACCESS_TOKEN
        return request
    }, (error) => console.log(error))

    return <div>{props.children}</div>
}


export default Interceptor
