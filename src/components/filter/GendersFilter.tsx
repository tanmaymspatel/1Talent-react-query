import { Stack, Checkbox, Group, Menu, UnstyledButton, createStyles, Text } from "@mantine/core";
import { useState, useEffect, useContext } from "react";
import useFetchGenders from "../../hooks/useFetchGenders";
import { FilterFieldsContext } from "../../context/filterFieldsContext/filterFieldsContext";
import utilityServices from "../../shared/services/utilityServices";
import { IconChevronDown } from "@tabler/icons-react";

const useStyle = createStyles(() => ({
    dropdown: {
        maxHeight: "320px",
        overflow: "auto",
        padding: "1rem",
    },
}))

function GendersFilter({ genderFields, setLocalFilterFields }: any) {
    const { genderState } = useContext<any>(FilterFieldsContext)
    const { gendersValue, setGendersValue } = genderState;
    const { classes } = useStyle();
    const { setFilterLabel } = utilityServices;

    const handleDesignationsChange = (id: string) => {
        const updatedValues = gendersValue.includes(id)
            ? gendersValue.filter((value: any) => value !== id)
            : [...gendersValue, id];
        setGendersValue(updatedValues);
    }
    useEffect(() => {
        console.log(gendersValue);
        setLocalFilterFields((prev: any) => { return { ...prev, genders: gendersValue } })
    }, [gendersValue])
    return (<Menu>
        <Menu.Target>
            <UnstyledButton p={"0.5rem"}>
                <Group spacing={3}>
                    <Text>{setFilterLabel(gendersValue, genderFields, "Gender")}</Text>
                    <IconChevronDown size="1.25rem" />
                </Group>
            </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown className={classes.dropdown}>
            <Stack>
                {
                    genderFields?.data.map((gender: any) => {
                        return <Checkbox
                            key={gender?.id}
                            value={gender?.id}
                            label={gender?.name}
                            checked={gendersValue.includes(gender?.id)}
                            onChange={() => handleDesignationsChange(gender?.id)}
                        />
                    })
                }
            </Stack>
        </Menu.Dropdown>
    </Menu>
    )
}

export default GendersFilter
