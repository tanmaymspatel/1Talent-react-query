import { Loader, createStyles } from "@mantine/core";

const useStyle = createStyles(() => ({
    loader: {
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
}));
/**
 * @returns loader
 */
function LoadingComponent() {

    const { classes } = useStyle();
    return (
        <div className={classes.loader}>
            <Loader size="xl" />
        </div>
    )
};

export default LoadingComponent;
