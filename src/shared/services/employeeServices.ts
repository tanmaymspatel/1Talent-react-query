import axios from 'axios'

const fetchEmployees = async () => {
    const res = await axios.get("/employees");
    return res.data;
}

const employeeServices = {
    fetchEmployees
}

export default employeeServices;