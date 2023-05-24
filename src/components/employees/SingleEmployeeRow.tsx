import React from 'react';
import { Group, Tooltip } from "@mantine/core"
import { IconDeviceMobile, IconMail } from "@tabler/icons-react"

const SingleEmployeeRow = React.forwardRef(({ employee }: any, ref: any) => {
    const body = (
        <>
            <td>{employee?.name}</td>
            <td>{employee?.employeeTypes?.employmentType ? employee?.employeeTypes?.employmentType : "N/A "}</td>
            <td>{employee?.designations?.name ? employee?.designations?.name : 'N/A'}</td>
            <td>
                {employee.domainWithSubDomain.name !== null ? <><span> {employee.domainWithSubDomain.name}</span> <span>({employee.domainWithSubDomain.subDomain.name})</span></> : `N/A`}
            </td>
            <td>
                <Group position="left">
                    <Tooltip label={employee?.mobileNumber !== null ? employee?.mobileNumber : "Mobile Number is not available"}>
                        <IconDeviceMobile />
                    </Tooltip>
                    <Tooltip label={employee?.emailId}>
                        <IconMail />
                    </Tooltip>
                </Group>
            </td>
        </>
    )

    const content = ref
        ? <tr ref={ref}>{body}</tr>
        : <tr >{body}</tr>

    return content;
})

export default SingleEmployeeRow;
