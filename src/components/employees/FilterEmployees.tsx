import { Button, Checkbox, Divider, Group, Menu, Stack, Text, UnstyledButton, createStyles } from "@mantine/core"
import { IconChevronDown } from "@tabler/icons-react"
import { useState } from "react";
import useFetchEmployementTypes from "../../hooks/useFetchEmployementTypes";
import useFetchDomains from "../../hooks/useFetchDomains";
import useFetchGenders from "../../hooks/useFetchGenders";
import useFetchDesignations from "../../hooks/useFetchDesignations";

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

function FilterEmployees({ setIsFilter }: any) {
    const { classes } = useStyle()
    const [employementValue, setEmployementValue] = useState<string[]>([]);
    const { data: employeeTypesFields } = useFetchEmployementTypes();
    const { data: domainFields } = useFetchDomains();
    const { data: genderFields } = useFetchGenders();
    const { data: designationFields } = useFetchDesignations();
    console.log({ employeeTypesFields, domainFields, genderFields, designationFields });

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
                    <Stack>
                        {
                            employeeTypesFields?.data.map((type: any) => {
                                return <Checkbox key={type?.employmentTypeId} value={type?.employmentTypeId} label={type?.employmentType} />
                            }
                            )
                        }

                    </Stack>
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

                <Menu.Dropdown className={classes.dropdown} mah={"320px"} style={{ overflow: "auto" }}>
                    <Stack>
                        {
                            domainFields?.data.map((domain: any) => {
                                return (
                                    <div>
                                        <Checkbox key={domain?.id} value={domain?.id} label={domain?.name} />
                                        <Stack pl={"2rem"} spacing={4}>
                                            {domain.subDomains && domain.subDomains.map((subDomain: any) => (
                                                <div style={{ paddingTop: "0.5rem" }}>
                                                    <Checkbox key={subDomain?.id} value={subDomain?.id} label={subDomain?.name} />
                                                </div>
                                            ))}
                                        </Stack>
                                    </div>

                                )
                            })
                        }
                    </Stack>
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
                    <Stack>
                        {
                            designationFields?.data.map((designation: any) => {
                                return <Checkbox key={designation?.id} value={designation?.id} label={designation?.name} />
                            })
                        }
                    </Stack>
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
                    <Stack>
                        {
                            genderFields?.data.map((gender: any) => {
                                return <Checkbox key={gender?.id} value={gender?.id} label={gender?.name} />
                            })
                        }
                    </Stack>
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
