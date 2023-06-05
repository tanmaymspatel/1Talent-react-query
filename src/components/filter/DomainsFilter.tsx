import { Stack, Checkbox } from "@mantine/core";
import { useEffect, useState } from "react";

function DomainsFilter({ domainFields, setLocalFilterFields }: any) {
    const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
    const [selectedSubDomains, setSelectedSubDomains] = useState<string[]>([]);

    const handleDomainsChange = (id: any) => {
        const updatedDomains = selectedDomains.includes(id)
            ? selectedDomains.filter((val) => val !== id)
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
                    (subDomain) => !subItemsToRemove.includes(subDomain)
                )
            );
        }
    };

    const handleSubDomainsChange = (id: any) => {
        const updatedSubDomains = selectedSubDomains.includes(id)
            ? selectedSubDomains.filter((val) => val !== id)
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
                updatedSubDomains.some((subDomain) =>
                    subDomainsOfParent.includes(subDomain)
                )
            ) {
                setSelectedDomains((prevDomains) =>
                    prevDomains.includes(parentDomain.id)
                        ? prevDomains
                        : [...prevDomains, parentDomain.id]
                );
            } else {
                setSelectedDomains((prevDomains) =>
                    prevDomains.filter((domain) => domain !== parentDomain.id)
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
                            selectedSubDomains.some((subDomain) =>
                                domain.subDomains.map((sub: any) => sub.id).includes(subDomain)
                            ) && !selectedDomains?.includes(domain.id)
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
    );
}

export default DomainsFilter;
