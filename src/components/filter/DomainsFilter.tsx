import { Stack, Checkbox, Group, Menu, UnstyledButton, createStyles, Text } from "@mantine/core";
import { useContext, useEffect } from "react";
import { FilterFieldsContext } from "../../context/filterFieldsContext/filterFieldsContext";
import { IconChevronDown } from "@tabler/icons-react";
import utilityServices from "../../shared/services/utilityServices";

const useStyle = createStyles(() => ({
    dropdown: {
        maxHeight: "320px",
        overflow: "auto",
        padding: "1rem",
    },
}))

function DomainsFilter({ domainFields, setLocalFilterFields }: any) {

    const { domainState, subDomainState } = useContext<any>(FilterFieldsContext);
    const { selectedDomains, setSelectedDomains } = domainState;
    const { selectedSubDomains, setSelectedSubDomains } = subDomainState;
    const { classes } = useStyle();
    const { setFilterLabel } = utilityServices;

    const handleDomainsChange = (id: string) => {
        const updatedDomains = selectedDomains.includes(id)
            ? selectedDomains.filter((val: any) => val !== id)
            : [...selectedDomains, id];
        setSelectedDomains(updatedDomains);

        if (!selectedDomains.includes(id)) {
            const subItemsToAdd = domainFields.data
                .find((domain: any) => domain.id === id)
                .subDomains.map((subDomain: any) => subDomain.id);
            setSelectedSubDomains([...selectedSubDomains, ...subItemsToAdd]);
        } else {
            const subItemsToRemove = domainFields.data
                .find((domain: any) => domain.id === id)
                .subDomains.map((subDomain: any) => subDomain.id);
            setSelectedSubDomains(
                selectedSubDomains.filter(
                    (subDomain: any) => !subItemsToRemove.includes(subDomain)
                )
            );
        }
    };

    const handleSubDomainsChange = (id: string) => {
        const updatedSubDomains = selectedSubDomains.includes(id)
            ? selectedSubDomains.filter((val: any) => val !== id)
            : [...selectedSubDomains, id];
        setSelectedSubDomains(updatedSubDomains);

        const parentDomain = domainFields.data.find((domain: any) =>
            domain.subDomains.some((subDomain: any) => subDomain.id === id)
        );

        if (parentDomain) {
            const subDomainsOfParent = parentDomain.subDomains.map(
                (subDomain: any) => subDomain.id
            );
            if (
                updatedSubDomains.some((subDomain: any) =>
                    subDomainsOfParent.includes(subDomain)
                )
            ) {
                setSelectedDomains((prevDomains: any) =>
                    prevDomains.includes(parentDomain.id)
                        ? prevDomains
                        : [...prevDomains, parentDomain.id]
                );
            } else {
                setSelectedDomains((prevDomains: any) =>
                    prevDomains.filter((domain: any) => domain !== parentDomain.id)
                );
            }
        }
    };

    useEffect(() => {
        setLocalFilterFields((prev: any) => ({
            ...prev,
            domains: selectedDomains,
            subDomains: selectedSubDomains
        }));
    }, [selectedDomains, selectedSubDomains]);

    return (
        <Menu>
            <Menu.Target>
                <UnstyledButton p={"0.5rem"}>
                    <Group spacing={3}>
                        <Text>{setFilterLabel(selectedDomains, domainFields, "Domains")}</Text>
                        <IconChevronDown size="1.25rem" />
                    </Group>
                </UnstyledButton>
            </Menu.Target>

            <Menu.Dropdown className={classes.dropdown}>

                <Stack>
                    {domainFields?.data.map((domain: any) => (
                        <div key={domain?.id}>
                            <Checkbox
                                id={domain?.id}
                                label={domain?.name}
                                checked={selectedDomains?.includes(domain?.id)}
                                onChange={() => {
                                    handleDomainsChange(domain?.id);
                                }}
                                indeterminate={
                                    (domain?.subDomains?.length > 0 && !(domain?.subDomains?.length === selectedSubDomains?.length) && selectedSubDomains?.length > 0)
                                }
                            />
                            <Stack pl={"2rem"} spacing={4}>
                                {domain.subDomains &&
                                    domain.subDomains.map((subDomain: any) => (
                                        <div key={subDomain?.id} style={{ paddingTop: "0.5rem" }}>
                                            <Checkbox
                                                value={subDomain?.id}
                                                label={subDomain?.name}
                                                checked={selectedSubDomains?.includes(subDomain?.id)}
                                                onChange={() => {
                                                    handleSubDomainsChange(subDomain?.id);
                                                }}
                                            />
                                        </div>
                                    ))}
                            </Stack>
                        </div>
                    ))}
                </Stack>
            </Menu.Dropdown>
        </Menu>
    );
}

export default DomainsFilter;
