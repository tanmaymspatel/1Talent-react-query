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
// employement type
const getEmployeeTypes = async () => {
    const res = await axios.get('/employee-types');
    return res.data;
}

const getDomains = async () => {
    const res = await axios.get('/domains');
    return res.data;
}
const getDesignations = async () => {
    const res = await axios.get('/designations');
    return res.data;
}
const getGenders = async () => {
    const res = await axios.get('/genders');
    return res.data;
}

const getPersonalInfoById = async (id: string) => {
    const res = await axios.get(`/users/${id}/personal-info`);
    return res.data
}
const getMaritalInfoInfoById = async (id: string) => {
    const res = await axios.get(`/users/${id}/marital-info`);
    return res.data
}
const getEducationInfoInfoById = async (id: string) => {
    const res = await axios.get(`/users/${id}/education-info`);
    return res.data
}

const employeeServices = {
    fetchEmployees1,
    fetchEmployees2,
    getEmployeeTypes,
    getDomains,
    getDesignations,
    getGenders,
    getPersonalInfoById,
    getMaritalInfoInfoById,
    getEducationInfoInfoById
}

export default employeeServices;