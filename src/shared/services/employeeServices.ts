import axios from 'axios'

const body = {
    "filter": {
        "employmentTypeId": [],
        "designations": [],
        "domains": [],
        "subDomains": [],
        "genders": [],
        "maritalStatus": [],
        "roles": [],
        "workShifts": [],
        "experienceLevels": [],
        "reportingOffices": []
    },
    "order": "asc",
    "field": "Name"
}
// for original api
const fetchEmployees1 = async (pageParam = 1, searchText: string) => {
    const res = await axios.post(`/users?pageNumber=${pageParam}&pageSize=30&searchText=${searchText}`, body);
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