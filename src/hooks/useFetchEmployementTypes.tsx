import { useQuery } from "@tanstack/react-query"

import employeeServices from "../shared/services/employeeServices"
/**
 * @description To get the employment type fields
 */
function useFetchEmployementTypes() {

    const { getEmploymentTypes } = employeeServices;

    return useQuery(["employee-types"], getEmploymentTypes, {
        staleTime: 60000
    })
}

export default useFetchEmployementTypes;

