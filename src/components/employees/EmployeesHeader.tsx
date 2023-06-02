import { Group, Title } from "@mantine/core";

import EmployeeHeaderRight from "./EmployeeHeaderRight";
import useFetchFilterFields from "../../hooks/useFetchFilterFields";

interface IEmployeesHeader {
    setView: React.Dispatch<React.SetStateAction<string>>,
    view: string
}


function EmployeesHeader({ setView, view }: IEmployeesHeader) {
    const { domainFields, designationFields, employeeTypesFields, genderFields } = useFetchFilterFields();

    const filterFields = {
        domainFields,
        designationFields,
        employeeTypesFields,
        genderFields
    }

    return (
        <Group position="apart">
            <Title order={4}>Employees</Title>
            <EmployeeHeaderRight filterFields={filterFields} view={view} setView={setView} />
        </Group>
    )
}

export default EmployeesHeader
