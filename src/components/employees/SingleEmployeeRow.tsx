import React from 'react';
import SingleEmployeeContactDetails from './SingleEmployeeContactDetails';
import { useNavigate } from 'react-router-dom';

const SingleEmployeeRow = React.forwardRef(({ employee }: any, ref: any) => {

    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate(`${employee?.userId}/profile`);
        localStorage.setItem("isClicked", "true");
        localStorage.setItem("clickedId", employee?.userId);
    }

    const body = (
        <>
            <td style={{ cursor: "pointer" }} onClick={() => onClickHandler()}>{employee?.name}</td>
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
        ? <tr ref={ref} id={`row-${employee?.userId}`} data-item="true">{body}</tr>
        : <tr id={`row-${employee?.userId}`} data-item="true">{body}</tr>

    return content;
})

export default SingleEmployeeRow;
