
import axios from "axios"
/**
 * @returns Interceptor for adding access token to the headers
 */
function Interceptor(props: any) {

    const ACCESS_TOKEN = localStorage.getItem("accessToken")

    axios.defaults.baseURL = "https://dev-1talent-api.azurewebsites.net/api";
    axios.interceptors.request.use((request: any) => {
        request.headers.Author = 'Tanmay Patel'
        request.headers.Authorization = "Bearer " + ACCESS_TOKEN
        return request
    }, (error) => console.log(error))

    return <div>{props.children}</div>
}


export default Interceptor;
