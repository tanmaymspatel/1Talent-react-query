import { Burger, Header, MediaQuery, Title, useMantineTheme } from '@mantine/core'

function MainHeader({ opened, setOpened }: any) {
    const theme = useMantineTheme();
    return (
        <Header height={{ base: 50, md: 70 }} p="md">
            <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o: any) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                </MediaQuery>
                <Title order={3}>1Rivet</Title>
            </div>
        </Header>
    )
}

export default MainHeader;
