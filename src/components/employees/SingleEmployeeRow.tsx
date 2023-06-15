import React from 'react';
import SingleEmployeeContactDetails from './SingleEmployeeContactDetails';
import { useNavigate } from 'react-router-dom';
/**
 * @erturns a row of table showing employee details
 */
const SingleEmployeeRow = React.forwardRef(({ employee }: any, ref: any) => {

    const navigate = useNavigate();
    /**
     * @name onClickHandler
     * @description navigate to perticular user details page, stores data of isClicked and clickedId to the localstorage
     */
    const onClickHandler = () => {
        navigate(`${employee?.userId}/profile`);
        localStorage.setItem("isClicked", "true");
        localStorage.setItem("clickedId", employee?.userId);
    }
    /** Details of domain and sub domain */
    const getEmployeeDomainAndSubDomain = employee.domainWithSubDomain.name !== null
        ? <>
            <span> {employee.domainWithSubDomain.name}</span>
            {employee.domainWithSubDomain.subDomain.name && <span>({employee.domainWithSubDomain.subDomain.name})</span>}
        </>
        : `N/A`

    const body = (
        <>
            <td style={{ cursor: "pointer" }} onClick={() => onClickHandler()}>{employee?.name}</td>
            <td>{employee?.employeeTypes?.employmentType ? employee?.employeeTypes?.employmentType : "N/A "}</td>
            <td>{employee?.designations?.name ? employee?.designations?.name : 'N/A'}</td>
            <td>
                {getEmployeeDomainAndSubDomain}
            </td>
            <td>
                <SingleEmployeeContactDetails employee={employee}></SingleEmployeeContactDetails>
            </td>
        </>
    )

    const content = ref /** ref is added if the element is the last in the viewport */
        ? <tr ref={ref} className={`user-${employee?.userId}`} data-item="true">{body}</tr>
        : <tr className={`user-${employee?.userId}`} data-item="true">{body}</tr>

    return content;
})

export default SingleEmployeeRow;
