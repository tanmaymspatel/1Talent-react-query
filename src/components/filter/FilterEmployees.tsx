import { Button, Checkbox, Divider, Group, Menu, Stack, Text, UnstyledButton, createStyles } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"

import EmployeeTypesFilter from "./EmployeeTypesFilter";
import DesignationsFilter from "./DesignationsFilter";
import GendersFilter from "./GendersFilter";
import DomainsFilter from "./DomainsFilter";

const useStyle = createStyles((theme) => ({
    wrapper: {
        border: `1px solid ${theme.colors.gray[3]}`,
        borderRadius: "4px"
    },
    padding: {
        padding: "0.5rem"
    },
    dropdown: {
        maxHeight: "320px",
        overflow: "auto",
        padding: "1rem"
    }
}))

function FilterEmployees({ setIsFilter, filterFields }: any) {
    const { classes } = useStyle();
    const { domainFields, employeeTypesFields, designationFields, genderFields } = filterFields

    return (
        <Group spacing={"xs"} className={classes.wrapper}>
            <Menu>
                <Menu.Target>
                    <UnstyledButton p={"0.5rem"}>
                        <Group spacing={3}>
                            <Text>Employement Type</Text>
                            <IconChevronDown size="1.25rem" />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown className={classes.dropdown}>
                    <EmployeeTypesFilter employeeTypesFields={employeeTypesFields} />
                </Menu.Dropdown>
            </Menu>
            <Menu>
                <Menu.Target>
                    <UnstyledButton p={"0.5rem"}>
                        <Group spacing={3}>
                            <Text>Domains</Text>
                            <IconChevronDown size="1.25rem" />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown className={classes.dropdown}>
                    <DomainsFilter domainFields={domainFields} />
                </Menu.Dropdown>
            </Menu>
            <Menu>
                <Menu.Target>
                    <UnstyledButton p={"0.5rem"}>
                        <Group spacing={3}>
                            <Text>Designations</Text>
                            <IconChevronDown size="1.25rem" />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown className={classes.dropdown}>
                    <DesignationsFilter designationFields={designationFields} />
                </Menu.Dropdown>
            </Menu>
            <Menu>
                <Menu.Target>
                    <UnstyledButton p={"0.5rem"}>
                        <Group spacing={3}>
                            <Text>Gender</Text>
                            <IconChevronDown size="1.25rem" />
                        </Group>
                    </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown className={classes.dropdown}>
                    <GendersFilter genderFields={genderFields} />
                </Menu.Dropdown>
            </Menu>
            <Divider orientation="vertical" />
            <Group spacing={6} p={"0.5rem"}>
                <Button size="xs">Apply</Button>
                <Button size="xs" variant="outline" onClick={() => setIsFilter(false)}>Close</Button>
            </Group>
        </Group >
    )
}

export default FilterEmployees
