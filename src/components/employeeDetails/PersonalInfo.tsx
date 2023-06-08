import { useQuery } from "@tanstack/react-query";
import employeeServices from "../../shared/services/employeeServices";
import { Avatar, Group, Text, createStyles, useMantineTheme } from "@mantine/core";
import { IconAt, IconBalloon, IconBuilding, IconCalendarEvent, IconMail, IconPhone, IconPhoneCall } from "@tabler/icons-react";
import utilityServices from "../../shared/services/utilityServices";

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },
}));

function PersonalInfo({ id }: any) {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const { getPersonalInfoById } = employeeServices;
    const { getFormattedDate } = utilityServices;
    const { data: personaInfo } = useQuery(['personal-info', id], () => getPersonalInfoById(id as string), {
        staleTime: 60000
    })

    return (
        <Group noWrap spacing={"2rem"}>
            <Avatar src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80" size={94} radius={50} />
            <div>
                <Text fz="xs" tt="uppercase" fw={700} color={theme.colors.gray[5]}>
                    {personaInfo?.userCode}
                </Text>

                <Text fz="xl" fw={500}>
                    {personaInfo?.name}
                </Text>
                <Text fz="lg" fw={500} color={theme.colors.gray[6]}>
                    {personaInfo?.designation?.name} | {personaInfo?.domain?.subDomain ? personaInfo?.domain?.subDomain?.name : personaInfo?.domain?.name}
                </Text>

                <Group spacing={"20px"}>
                    <Group noWrap spacing={5} mt={3}>
                        <IconMail stroke={1.5} size="1.25rem" className={classes.icon} color={theme.colors.blue[9]} />
                        <Text fz={"1rem"} c="dimmed">
                            {personaInfo?.email}
                        </Text>
                    </Group>

                    <Group noWrap spacing={5} mt={5}>
                        <IconPhone stroke={1.5} size="1.25rem" className={classes.icon} color={theme.colors.green[9]} />
                        <Text fz={"1rem"} c="dimmed">
                            +91 {personaInfo?.mobileNumber}
                        </Text>
                    </Group>
                    <Group noWrap spacing={5} mt={5}>
                        <IconBalloon stroke={1.5} size="1.25rem" className={classes.icon} color={theme.colors.violet[7]} />
                        <Text fz={"1rem"} c="dimmed">
                            Born {getFormattedDate(personaInfo?.birthDate)}
                        </Text>
                    </Group>
                    <Group noWrap spacing={5} mt={5}>
                        <IconCalendarEvent stroke={1.5} size="1.25rem" className={classes.icon} color={theme.colors.orange[6]} />
                        <Text fz={"1rem"} c="dimmed">
                            Joining {getFormattedDate(personaInfo?.dateOfJoining)}
                        </Text>
                    </Group>
                    <Group noWrap spacing={5} mt={5}>
                        <IconBuilding stroke={1.5} size="1.25rem" className={classes.icon} color={theme.colors.green[6]} />
                        <Text fz={"1rem"} c="dimmed">
                            {personaInfo?.reportingOffice?.reportingOffice}, Gujarat
                        </Text>
                    </Group>
                </Group >
            </div>
        </Group >
    )
}

export default PersonalInfo
