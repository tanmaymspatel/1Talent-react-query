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
const fetchEmployees1 = async () => {
    const res = await axios.post("/users", body);
    return res.data.data;
}
// for fake api
const fetchEmployees2 = async () => {
    const res = await axios.get("/employees");
    return res.data;
}

const employeeServices = {
    fetchEmployees1,
    fetchEmployees2
}

export default employeeServices;