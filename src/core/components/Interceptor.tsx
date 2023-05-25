import { InteractionType } from "@azure/msal-browser";
import { useMsalAuthentication } from "@azure/msal-react";
import axios from "axios"
import { useEffect, useState } from "react";

function Interceptor(props: any) {

    const { result } = useMsalAuthentication(InteractionType.Redirect, {
        scopes: ['user.read']
    });
    if (result !== null) var ACCESS_TOKEN = result?.accessToken
    // axios.defaults.baseURL = "https://dev-1talent-api.azurewebsites.net/api";
    axios.defaults.baseURL = "https://dev-1talent-api.azurewebsites.net/api";
    axios.interceptors.request.use((request: any) => {
        request.headers.Author = 'Tanmay Patel'
        request.headers.Authorization = "Bearer " + ACCESS_TOKEN
        return request
    }, (error) => console.log(error))

    useEffect(() => {
        console.log({ result })
    }, [result])


    return <div>{props.children}</div>
}


export default Interceptor
