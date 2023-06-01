import { Group, SegmentedControl, Switch, Title, createStyles, useMantineTheme } from "@mantine/core"
import { IconLayoutGrid, IconListDetails } from "@tabler/icons-react";
import EmployeeHeaderRight from "./EmployeeHeaderRight";

interface IEmployeesHeader {
    setView: React.Dispatch<React.SetStateAction<string>>,
    view: string
}


function EmployeesHeader({ setView, view }: IEmployeesHeader) {
    const theme = useMantineTheme();

    return (
        <Group position="apart">
            <Title order={4}>Employees</Title>
            <EmployeeHeaderRight view={view} setView={setView} />
        </Group>
    )
}

export default EmployeesHeader
