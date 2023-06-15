import { Stack, Checkbox, Group, Menu, UnstyledButton, createStyles, Text } from "@mantine/core";
import { useEffect, useContext } from "react";
import { IconChevronDown } from "@tabler/icons-react";

import { FilterFieldsContext } from "../../context/filterFieldsContext/filterFieldsContext";
import utilityServices from "../../shared/services/utilityServices";

const useStyle = createStyles(() => ({
    dropdown: {
        maxHeight: "320px",
        overflow: "auto",
        padding: "1rem",
    },
}))
/**
 * @returns functionality to filter data by gender
 */
function GendersFilter({ genderFields, setLocalFilterFields }: any) {
    /** State for storing the checked designation fields in the context */
    const { genderState } = useContext<any>(FilterFieldsContext)
    const { gendersValue, setGendersValue } = genderState;
    const { classes } = useStyle();
    const { setFilterLabel } = utilityServices;
    /**
     * @name handleGenderChange
     * @description To store the checked values 
     * @param id id of the checked element
     */
    const handleGenderChange = (id: string) => {
        const updatedValues = gendersValue.includes(id)
            ? gendersValue.filter((value: any) => value !== id)
            : [...gendersValue, id];
        setGendersValue(updatedValues);
    };
    /** Set the local filter fields if there is any change in the checked values of the designations */
    useEffect(() => {
        setLocalFilterFields((prev: any) => { return { ...prev, genders: gendersValue } })
    }, [gendersValue]);

    return (
        <Menu>
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
                                onChange={() => handleGenderChange(gender?.id)}
                            />
                        })
                    }
                </Stack>
            </Menu.Dropdown>
        </Menu>
    )
}

export default GendersFilter;
