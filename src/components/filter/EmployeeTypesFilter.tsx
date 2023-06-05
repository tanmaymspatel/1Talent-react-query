import { Stack, Checkbox } from "@mantine/core";
import { useEffect, useState } from "react";

function EmployeeTypesFilter({ employeeTypesFields, setLocalFilterFields }: any) {
    const [employementValue, setEmployementValue] = useState<string[]>([]);

    const handleemployementTypeChange = (id: string) => {
        const updatedValues = employementValue.includes(id)
            ? employementValue.filter((value) => value !== id)
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
