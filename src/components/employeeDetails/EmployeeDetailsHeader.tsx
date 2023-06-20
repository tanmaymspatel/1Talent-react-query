import { Title } from '@mantine/core'

function EmployeeDetailsHeader({ employeeName }: any) {
    return (
        <Title order={4}>{employeeName ? employeeName : "Employee"}</Title>
    )
}

export default EmployeeDetailsHeader;
