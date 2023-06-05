import { useContext, useEffect, useState } from 'react'
import { useDebouncedValue } from "@mantine/hooks"
import { Group, Input, SegmentedControl, ThemeIcon, UnstyledButton, createStyles, useMantineTheme } from "@mantine/core";
import { IconListDetails, IconLayoutGrid, IconSearch, IconFilter } from "@tabler/icons-react";
import { SearchContext } from "../../context/searchContext/searchContext";
import { DataContext } from '../../context/dataContext/dataContext';
import FilterEmployees from '../filter/FilterEmployees';
import useFetchFilterFields from '../../hooks/useFetchFilterFields';

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
    }
}))

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

function EmployeeHeaderRight({ view, setView, filterFields }: IEmployeeHeaderRightProps) {
    const { classes } = useStyle();
    const theme = useMantineTheme();
    const changeView = () => {
        setView(view => view === 'grid' ? 'list' : 'grid')
    }
    const { search, setSearch } = useContext<any>(DataContext);
    const [isFilterBarOpen, setIsFilterBarOpen] = useState<boolean>(false);

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
                    <UnstyledButton onClick={() => setIsFilterBarOpen(true)}>
                        <ThemeIcon variant="default" size={"2rem"}>
                            <IconFilter size={"1.25rem"} />
                        </ThemeIcon>
                    </UnstyledButton>
                    <SegmentedControl
                        value={view}
                        onChange={changeView}
                        classNames={{
                            // label: classes.label,
                            root: classes.root
                        }}
                        data={segmentData}
                    />
                </Group>
                : <FilterEmployees filterFields={filterFields} setIsFilterBarOpen={setIsFilterBarOpen} />
            }
        </Group>
    )
}

export default EmployeeHeaderRight;

