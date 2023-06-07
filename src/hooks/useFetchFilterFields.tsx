import useFetchDesignations from "./useFetchDesignations";
import useFetchDomains from "./useFetchDomains";
import useFetchEmployementTypes from "./useFetchEmployementTypes";
import useFetchGenders from "./useFetchGenders";

function useFetchFilterFields() {
    const { data: domainFields } = useFetchDomains();
    const { data: genderFields } = useFetchGenders();
    const { data: designationFields } = useFetchDesignations();
    const { data: employeeTypesFields } = useFetchEmployementTypes();

    return { domainFields, genderFields, designationFields, employeeTypesFields }
}

export default useFetchFilterFields
