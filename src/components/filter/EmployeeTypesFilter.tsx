import { Stack, Checkbox } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { FilterFieldsContext } from "../../context/filterFieldsContext/filterFieldsContext";

function EmployeeTypesFilter({ employeeTypesFields, setLocalFilterFields }: any) {
    const { employementState } = useContext<any>(FilterFieldsContext)
    const { employementValue, setEmployementValue } = employementState

    const handleemployementTypeChange = (id: string) => {
        const updatedValues = employementValue.includes(id)
            ? employementValue.filter((value: any) => value !== id)
            : [...employementValue, id];
        setEmployementValue(updatedValues);
    }
    useEffect(() => {
        console.log(employementValue);
        setLocalFilterFields((prev: any) => { return { ...prev, employmentTypeId: employementValue } })
    }, [employementValue])
    return (
        <Stack>
            {
                employeeTypesFields?.data.map((type: any) => {
                    return <Checkbox
                        key={type?.employmentTypeId}
                        value={type?.employmentTypeId}
                        label={type?.employmentType}
                        checked={employementValue.includes(type?.employmentTypeId)}
                        onChange={() => handleemployementTypeChange(type?.employmentTypeId)}
                    />
                }
                )
            }

        </Stack>
    )
}

export default EmployeeTypesFilter
