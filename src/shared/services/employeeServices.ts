import axios from 'axios'
/**
 * @name fetchEmployees
 * @description To get the employees details page wise
 * @param pageParam number of the page
 * @param searchText search text typed by the user
 * @param payLoad Request body in the post call
 * @returns data of the fetched employees
 */
const fetchEmployees = async (pageParam = 1, searchText: string, payLoad: any) => {
    const res = await axios.post(`/users?pageNumber=${pageParam}&pageSize=30&searchText=${searchText}`, payLoad);
    return res.data.data;
}
/**
 * @name getEmployeeTypes
 * @description To get the filter fields for the employmet types 
 * @returns data of the emlpoyment type
 */
const getEmploymentTypes = async () => {
    const res = await axios.get('/employee-types');
    return res.data;
}
/**
 * @name getDomains
 * @description To get the filter fields for the domains and sub-domains 
 * @returns data of the domain and respective sub-domain fields
 */
const getDomains = async () => {
    const res = await axios.get('/domains');
    return res.data;
}
/**
 * @name getDesignations
 * @description To get the filter fields for the designations 
 * @returns data of the designations fields
 */
const getDesignations = async () => {
    const res = await axios.get('/designations');
    return res.data;
}
/**
 * @name getGenders
 * @description To get the filter fields for the genders
 * @returns data of the gender fields
 */
const getGenders = async () => {
    const res = await axios.get('/genders');
    return res.data;
}
/**
 * @name getPersonalInfoById
 * @description To get the personal information of the employee, of which record is clicked
 * @param id id of the employee
 * @returns personal information data of the clicked id of the employee
 */
const getPersonalInfoById = async (id: string) => {
    const res = await axios.get(`/users/${id}/personal-info`);
    return res.data.data
}
/**
 * @name getMaritalInfoInfoById
 * @description To get the marital information of the employee, of which record is clicked
 * @param id id of the employee
 * @returns marital information data of the clicked id of the employee
 */
const getMaritalInfoInfoById = async (id: string) => {
    const res = await axios.get(`/users/${id}/marital-info`);
    return res.data
}
/**
 * @name getEducationInfoInfoById
 * @description To get the educational information of the employee, of which record is clicked
 * @param id id of the employee
 * @returns educational information data of the clicked id of the employee
 */
const getEducationInfoInfoById = async (id: string) => {
    const res = await axios.get(`/users/${id}/education-info`);
    return res.data
}

const employeeServices = {
    fetchEmployees,
    getEmploymentTypes,
    getDomains,
    getDesignations,
    getGenders,
    getPersonalInfoById,
    getMaritalInfoInfoById,
    getEducationInfoInfoById
}

export default employeeServices;