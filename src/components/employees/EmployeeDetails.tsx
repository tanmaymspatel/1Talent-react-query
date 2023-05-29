import { useParams } from "react-router-dom"

function EmployeeDetails() {
    const { id } = useParams()
    return (
        <div>
            {id}
        </div>
    )
}

export default EmployeeDetails
