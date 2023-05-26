import React from 'react';
import SingleEmployeeContactDetails from './SingleEmployeeContactDetails';

const SingleEmployeeRow = React.forwardRef(({ employee }: any, ref: any) => {
    const body = (
        <>
            <td>{employee?.name}</td>
            <td>{employee?.employeeTypes?.employmentType ? employee?.employeeTypes?.employmentType : "N/A "}</td>
            <td>{employee?.designations?.name ? employee?.designations?.name : 'N/A'}</td>
            <td>
                {employee.domainWithSubDomain.name !== null
                    ? <>
                        <span> {employee.domainWithSubDomain.name}</span>
                        {employee.domainWithSubDomain.subDomain.name && <span>({employee.domainWithSubDomain.subDomain.name})</span>}
                    </>
                    : `N/A`}
            </td>
            <td>
                <SingleEmployeeContactDetails employee={employee}></SingleEmployeeContactDetails>
            </td>
        </>
    )

    const content = ref
        ? <tr ref={ref}>{body}</tr>
        : <tr >{body}</tr>

    return content;
})

export default SingleEmployeeRow;
