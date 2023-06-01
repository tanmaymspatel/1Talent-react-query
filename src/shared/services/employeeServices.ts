import axios from 'axios'


// for original api
const fetchEmployees1 = async (pageParam = 1, searchText: string, payLoad: any) => {
    const res = await axios.post(`/users?pageNumber=${pageParam}&pageSize=30&searchText=${searchText}`, payLoad);
    return res.data.data;
}
// for fake api
const fetchEmployees2 = async (pageParam = 1) => {
    const res = await axios.get(`/employees?_page=${pageParam}&_limit=30`);
    return res.data;
}

const employeeServices = {
    fetchEmployees1,
    fetchEmployees2
}

export default employeeServices;