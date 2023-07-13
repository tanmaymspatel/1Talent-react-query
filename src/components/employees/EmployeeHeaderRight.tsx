import { useContext, useState } from 'react'
import { Group, Input, SegmentedControl, ThemeIcon, UnstyledButton, createStyles, useMantineTheme } from "@mantine/core";
import { IconListDetails, IconLayoutGrid, IconSearch, IconFilter } from "@tabler/icons-react";

import FilterEmployees from '../filter/FilterEmployees';
import { FilterFieldsContext } from '../../context/filterFieldsContext/filterFieldsContext';
import { SearchContext } from '../../context/searchContext/searchContext';

interface IEmployeeHeaderRightProps {
    view: string,
    setView: React.Dispatch<React.SetStateAction<string>>,
    filterFields: any
}

const useStyle = createStyles((theme) => ({
    root: {
        backgroundColor: "transparent",
        border: `1px solid ${theme.colors.gray[3]}`,
        borderRadius: "8px",
        padding: 0
    },
    filterActive: {
        position: "relative",
        '&:after': {
            position: "absolute",
            content: "''",
            top: -2,
            right: -2,
            height: "8px",
            width: "8px",
            background: theme.colors.blue,
            borderRadius: "50%",
        }
    }
}))

/** data for the view switching functionality */
const segmentData = [
    {
        label: (<IconListDetails size="1.25rem" stroke={2.5} />),
        value: 'list'
    },
    {
        label: (<IconLayoutGrid size="1.25rem" stroke={2.5} />),
        value: 'grid'
    },
]
/**
 * @returns right side section of the header 
 */
function EmployeeHeaderRight({ view, setView, filterFields }: IEmployeeHeaderRightProps) {
    const { classes } = useStyle();
    const theme = useMantineTheme();
    /**
     * @name changeView
     * @description Method to change the view 
     */
    const changeView = () => {
        setView(view => view === 'grid' ? 'list' : 'grid')
    }
    const { search, setSearch } = useContext<any>(SearchContext);
    /** To determine whether the search bar is open */
    const [isFilterBarOpen, setIsFilterBarOpen] = useState<boolean>(false);
    /** State for storing the data of the filter fields which is checked or unchecked */
    const { state } = useContext(FilterFieldsContext);
    /** object to store the local changes in the filter field */
    /** To check if all the filter fields are unchecked */
    const isFilterFieldsEmpty =
        !state.designations.length
        && !state.domains.length
        && !state.employmentTypeId.length
        && !state.genders.length
        && !state.subDomains.length;

    return (
        <Group>
            {!isFilterBarOpen
                ? <Group>
                    <Input
                        icon={<IconSearch color={theme.black} />}
                        placeholder="Search Employees"
                        value={search}
                        onChange={(e) => setSearch(e.currentTarget.value)}
                    />
                    <UnstyledButton
                        onClick={() => setIsFilterBarOpen(true)}
                        className={`${!isFilterFieldsEmpty ? classes.filterActive : ""}`}
                    >
                        <ThemeIcon variant="default" size={"2rem"}>
                            <IconFilter size={"1.25rem"} />
                        </ThemeIcon>
                    </UnstyledButton>
                    <SegmentedControl
                        value={view}
                        onChange={changeView}
                        classNames={{
                            root: classes.root
                        }}
                        data={segmentData}
                    />
                </Group>
                : <FilterEmployees
                    filterFields={filterFields}
                    setIsFilterBarOpen={setIsFilterBarOpen}
                    isFilterFieldsEmpty={isFilterFieldsEmpty}
                />
            }
        </Group>
    )
}

export default EmployeeHeaderRight;

