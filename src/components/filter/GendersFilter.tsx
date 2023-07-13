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
    const { state, dispatch } = useContext<any>(FilterFieldsContext);
    const { genders } = state;
    const { classes } = useStyle();
    const { setFilterLabel } = utilityServices;
    /**
     * @name handleGenderChange
     * @description To store the checked values 
     * @param id id of the checked element
     */
    const handleGenderChange = (id: string) => {
        const updatedValues = genders.includes(id)
            ? genders.filter((value: any) => value !== id)
            : [...genders, id];
        dispatch({ type: "UPDATE_GENDER_FIELD", payload: updatedValues })
    };

    return (
        <Menu>
            <Menu.Target>
                <UnstyledButton p={"0.5rem"}>
                    <Group spacing={3}>
                        <Text>{setFilterLabel(genders, genderFields, "Gender")}</Text>
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
                                checked={genders.includes(gender?.id)}
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
