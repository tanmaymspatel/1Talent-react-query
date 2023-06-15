import { Avatar, Group, Text, createStyles, useMantineTheme } from "@mantine/core";
import { IconBalloon, IconBuilding, IconCalendarEvent, IconMail, IconPhone } from "@tabler/icons-react";

import utilityServices from "../../shared/services/utilityServices";

const useStyles = createStyles((theme) => ({
    icon: {
        color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
    },
}));

function PersonalInfo({ personaInfo }: any) {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const { getFormattedDate } = utilityServices;

    return (
        <Group noWrap spacing={"2rem"}>
            <Avatar src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80" size={94} radius={50} />
            <div>
                <Text fz="xs" tt="uppercase" fw={700} color={theme.colors.gray[5]}>
                    {personaInfo?.userCode ? personaInfo?.userCode : "N/A"}
                </Text>

                <Text fz="xl" fw={500}>
                    {personaInfo?.name}
                </Text>
                <Text fz="lg" fw={500} color={theme.colors.gray[6]}>
                    {personaInfo?.designation ? personaInfo?.designation?.name : "N/A"} | {personaInfo?.domain ? (personaInfo?.domain?.subDomain ? personaInfo?.domain?.subDomain?.name : personaInfo?.domain?.name) : "N/A"}
                </Text>

                <Group spacing="0.25rem">
                    <Group noWrap spacing={5} mt={3}>
                        <IconMail stroke={1.5} size="1rem" className={classes.icon} color={theme.colors.blue[9]} />
                        <Text fz={"1rem"} c="dimmed">
                            {personaInfo?.email}
                        </Text>
                    </Group>

                    <Group noWrap spacing={5} mt={5}>
                        <IconPhone stroke={1.5} size="1rem" className={classes.icon} color={theme.colors.green[9]} />
                        <Text fz={"1rem"} c="dimmed">
                            {personaInfo?.mobileNumber ? `+91 ${personaInfo?.mobileNumber}` : "N/A"}
                        </Text>
                    </Group>
                    <Group noWrap spacing={5} mt={5}>
                        <IconBalloon stroke={1.5} size="1rem" className={classes.icon} color={theme.colors.violet[7]} />
                        <Text fz={"1rem"} c="dimmed">
                            {personaInfo?.birthDate ? `Born ${getFormattedDate(personaInfo?.birthDate)}` : "N/A"}
                        </Text>
                    </Group>
                    <Group noWrap spacing={5} mt={5}>
                        <IconCalendarEvent stroke={1.5} size="1rem" className={classes.icon} color={theme.colors.orange[6]} />
                        <Text fz={"1rem"} c="dimmed">
                            {personaInfo?.dateOfJoining ? `Joining ${getFormattedDate(personaInfo?.dateOfJoining)}` : "N/A"}
                        </Text>
                    </Group>
                    <Group noWrap spacing={5} mt={5}>
                        <IconBuilding stroke={1.5} size="1rem" className={classes.icon} color={theme.colors.green[6]} />
                        <Text fz={"1rem"} c="dimmed">
                            {personaInfo?.reportingOffice ? `${personaInfo?.reportingOffice?.reportingOffice}, Gujarat` : "N/A"}
                        </Text>
                    </Group>
                </Group >
            </div>
        </Group >
    )
}

export default PersonalInfo
