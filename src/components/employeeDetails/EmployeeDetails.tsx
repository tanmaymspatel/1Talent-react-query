import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"
import employeeServices from "../../shared/services/employeeServices";

function EmployeeDetails() {
    const { id } = useParams();
    const { getPersonalInfoById, getMaritalInfoInfoById, getEducationInfoInfoById } = employeeServices
    const { data: personaInfo } = useQuery(['personal-info', id], () => getPersonalInfoById(id as string), {
        staleTime: 60000
    })
    const { data: maritalInfo } = useQuery(['marital-info', id], () => getMaritalInfoInfoById(id as string), {
        staleTime: 60000
    })
    const { data: educationInfo } = useQuery(['education-info', id], () => getEducationInfoInfoById(id as string), {
        staleTime: 60000
    })
    console.log({ personaInfo, maritalInfo, educationInfo });

    return (
        <div>
            {id}
        </div>
    )
}

export default EmployeeDetails
