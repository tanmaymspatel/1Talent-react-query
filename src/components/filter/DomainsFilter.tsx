import { Stack, Checkbox } from "@mantine/core"
import { useEffect, useState } from "react";

function DomainsFilter({ domainFields }: any) {
    const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
    const [selectedSubDomains, setSelectedSubDomains] = useState<string[]>([]);

    const handleDomainsChange = (id: any) => {
        const updatedDomains: any = selectedDomains.includes(id)
            ? selectedDomains.filter((val) => val !== id)
            : [...selectedDomains, id];
        setSelectedDomains(updatedDomains);
    };

    const handleSubDomainsChange = (id: any) => {
        const updatedSubDomains: any = selectedSubDomains.includes(id)
            ? selectedSubDomains.filter((val) => val !== id)
            : [...selectedSubDomains, id];
        setSelectedSubDomains(updatedSubDomains);
    };

    useEffect(() => {
        console.log({ selectedDomains, selectedSubDomains });
    }, [selectedDomains, selectedSubDomains])
    return (
        <Stack>
            {
                domainFields?.data.map((domain: any) => {
                    return (
                        <div key={domain?.id} >
                            <Checkbox
                                id={domain?.id}
                                label={domain?.name}
                                checked={selectedDomains?.includes(domain?.id)}
                                onChange={() => { handleDomainsChange(domain?.id) }}
                                indeterminate={
                                    selectedSubDomains.some((subDomain) =>
                                        domain.subDomains.map((sub: any) => sub.id).includes(subDomain)
                                    ) && !selectedDomains?.includes(domain.id)
                                }
                            />
                            <Stack pl={"2rem"} spacing={4}>
                                {domain.subDomains && domain.subDomains.map((subDomain: any) => (
                                    <div key={subDomain?.id} style={{ paddingTop: "0.5rem" }}>
                                        <Checkbox
                                            value={subDomain?.id}
                                            label={subDomain?.name}
                                            checked={selectedSubDomains?.includes(subDomain?.id)}
                                            onChange={() => { handleSubDomainsChange(subDomain?.id) }}
                                        />
                                    </div>
                                ))}
                            </Stack>
                        </div>

                    )
                })
            }
        </Stack>
    )
}

export default DomainsFilter
