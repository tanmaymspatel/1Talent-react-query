import { Group, Switch, Title, useMantineTheme } from "@mantine/core"
import { IconLayoutGrid, IconListDetails } from "@tabler/icons-react";

interface IEmployeesHeader {
    dataLength: number,
    isGridView: boolean,
    setView: React.Dispatch<React.SetStateAction<string>>
}

function EmployeesHeader({ dataLength, isGridView, setView }: IEmployeesHeader) {
    const theme = useMantineTheme();
    const changeView = () => {
        setView(view => view === 'grid' ? 'list' : 'grid')
    }

    return (
        <Group position="apart">
            <Title order={4}>Employees ({dataLength})</Title>
            <div>
                <Switch
                    size="lg"
                    // color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
                    onLabel={<IconListDetails size="1.25rem" stroke={2.5} color={theme.colors.gray[4]} />}
                    offLabel={<IconLayoutGrid size="1.25rem" stroke={2.5} color={theme.colors.blue[6]} />}
                    onChange={changeView}
                    checked={isGridView}
                />
            </div>
        </Group>
    )
}

export default EmployeesHeader
