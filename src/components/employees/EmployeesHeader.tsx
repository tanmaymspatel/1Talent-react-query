import { Group, Switch, Title, useMantineTheme } from "@mantine/core"
import { IconLayoutGrid, IconListDetails } from "@tabler/icons-react";

function EmployeesHeader() {

    const theme = useMantineTheme();

    return (
        <Group position="apart">
            <Title order={4}>Employees</Title>
            <div>
                <Switch
                    size="md"
                    // color={theme.colorScheme === 'dark' ? 'gray' : 'dark'}
                    onLabel={<IconListDetails size="1rem" stroke={2.5} color={theme.colors.gray[4]} />}
                    offLabel={<IconLayoutGrid size="1rem" stroke={2.5} color={theme.colors.blue[6]} />}
                />
            </div>
        </Group>
    )
}

export default EmployeesHeader
