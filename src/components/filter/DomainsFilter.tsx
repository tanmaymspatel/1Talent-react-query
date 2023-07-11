import { Stack, Checkbox, Group, Menu, UnstyledButton, createStyles, Text } from "@mantine/core";
import { useContext } from "react";
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
/**
 * @returns functionality to filter data by domain names
 */
function DomainsFilter({ domainFields }: any) {

    /** State for storing the checked domain and sub domain fields in the context */
    const { state, dispatch } = useContext<any>(FilterFieldsContext);
    const { domains, subDomains } = state;
    const { classes } = useStyle();
    const { setFilterLabel } = utilityServices;
    /**
     * @name handleDomainsChange
     * @description To store the checked values 
     * @param id id of the checked element
     */
    const handleDomainsChange = (id: string) => {
        const updatedDomains = domains.includes(id)
            ? domains.filter((val: any) => val !== id)
            : [...domains, id];
        dispatch({ type: "UPDATE_DOMAIN_FIELD", payload: updatedDomains })

        if (!domains.includes(id)) {
            const subDomainsToAdd = domainFields.data
                .find((domain: any) => domain.id === id)
                .subDomains.map((subDomain: any) => subDomain.id);
            dispatch({ type: "UPDATE_SUB_DOMAIN_FIELD", payload: [...subDomains, ...subDomainsToAdd] })
        } else {
            const subDomainsToRemove = domainFields.data
                .find((domain: any) => domain.id === id)
                .subDomains.map((subDomain: any) => subDomain.id);
            const updatedSubDomains = subDomains.filter((subDomain: any) => !subDomainsToRemove.includes(subDomain));
            dispatch({ type: "UPDATE_SUB_DOMAIN_FIELD", payload: updatedSubDomains })
        }
    };
    /**
     * @name handleSubDomainsChange
     * @description To store the checked values 
     * @param id id of the checked element
    */
    const handleSubDomainsChange = (id: string) => {
        const updatedSubDomains = subDomains.includes(id)
            ? subDomains.filter((val: any) => val !== id)
            : [...subDomains, id];
        dispatch({ type: "UPDATE_SUB_DOMAIN_FIELD", payload: updatedSubDomains })

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
                const updatedDomains = domains.includes(parentDomain.id)
                    ? domains
                    : [...domains, parentDomain.id];
                dispatch({ type: "UPDATE_DOMAIN_FIELD", payload: updatedDomains });
            } else {
                const updatedDomains = domains.filter((domain: any) => domain !== parentDomain.id)
                dispatch({ type: "UPDATE_DOMAIN_FIELD", payload: updatedDomains });
            }
        }
    };

    return (
        <Menu>
            <Menu.Target>
                <UnstyledButton p={"0.5rem"}>
                    <Group spacing={3}>
                        <Text>{setFilterLabel(domains, domainFields, "Domains")}</Text>
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
                                checked={domains?.includes(domain?.id)}
                                onChange={() => {
                                    handleDomainsChange(domain?.id);
                                }}
                                indeterminate={
                                    (domain?.subDomains?.length > 0 && !(domain?.subDomains?.length === subDomains?.length) && subDomains?.length > 0)
                                }
                            />
                            <Stack pl={"2rem"} spacing={4}>
                                {domain.subDomains &&
                                    domain.subDomains.map((subDomain: any) => (
                                        <div key={subDomain?.id} style={{ paddingTop: "0.5rem" }}>
                                            <Checkbox
                                                value={subDomain?.id}
                                                label={subDomain?.name}
                                                checked={subDomains?.includes(subDomain?.id)}
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
