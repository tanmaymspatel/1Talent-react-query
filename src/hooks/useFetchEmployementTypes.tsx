import { useQuery } from "@tanstack/react-query"

import employeeServices from "../shared/services/employeeServices"

function useFetchEmployementTypes() {

    const { getEmployeeTypes } = employeeServices;

    return useQuery(["employee-types"], getEmployeeTypes, {
        staleTime: 60000
    })
}

export default useFetchEmployementTypes;

