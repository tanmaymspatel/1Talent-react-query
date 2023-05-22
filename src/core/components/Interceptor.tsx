import axios from "axios"

function Interceptor(props: any) {
    const ACCESS_TOKEN = "";
    axios.defaults.baseURL = " http://localhost:3000";
    axios.interceptors.request.use((request: any) => {
        request.headers.Author = 'Tanmay Patel'
        request.headers.Authorization = `Bearer ${ACCESS_TOKEN}}`
        return request
    }, (error) => console.log(error))


    axios.interceptors.response.use(response => {
        return response
    })

    return <div>{props.children}</div>
}


export default Interceptor
