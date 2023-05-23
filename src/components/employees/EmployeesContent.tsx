import EmployeesCard from "./EmployeesCard";
import EmployeesTable from "./EmployeesTable";

function EmployeesContent({ employeesData, isGridView }: any) {

    console.log({ isGridView, employeesData });

    return (
        <>
            {
                isGridView
                    ? <EmployeesCard employeesData={employeesData} />
                    : <EmployeesTable employeesData={employeesData} />
            }
        </>
    )
};

export default EmployeesContent;
