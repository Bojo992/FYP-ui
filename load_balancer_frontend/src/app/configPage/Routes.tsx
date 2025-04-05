import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Accordion from "@mui/material/Accordion";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import LBConfigProps from "@/app/util/LBConfigProps";
import AddRouteDialog from "@/app/configPage/dialogs/add/AddRouteDialog";
import {useState} from "react";
import ChangeRouteDialog from "@/app/configPage/dialogs/change/ChangeRouteDialog";
import RemoveRouteDialog from "@/app/configPage/dialogs/remove/RemoveRouteDialog";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

export default function Routes({lb_config}: { lb_config: LBConfigProps }) {
    let itr = 1;
    const [openAddRouteDialog, setOpenAddRouteDialog] = useState(false);
    const [openChangeRouteDialog, setOpenChangeRouteDialog] = useState(false);
    const [openRemoveRouteDialog, setOpenRemoveRouteDialog] = useState(false);
    const [selectedRouteName, setSelectedRouteName] = useState<string>("");
    const [selectedRoutePath, setSelectedRoutePath] = useState<string>("");
    const [selectedRouteCluster, setSelectedRouteCluster] = useState<string>("");

    const handleOpenAddRouteDialog = () => {
        setOpenAddRouteDialog(true);
    };

    const handleCloseAddRouteDialog = () => {
        setOpenAddRouteDialog(false);
    };

    const handleOpenChangeRouteDialog = (routeName: string, routePath: string, clusterId: string) => {
        setSelectedRouteName(routeName);
        setSelectedRoutePath(routePath);
        setSelectedRouteCluster(clusterId);
        setOpenChangeRouteDialog(true);
    };

    const handleCloseChangeRouteDialog = () => {
        setOpenChangeRouteDialog(false);
        setSelectedRouteName("");
        setSelectedRoutePath("");
    };

    const handleOpenRemoveRouteDialog = (routeName: string) => {
        setSelectedRouteName(routeName)
        setOpenRemoveRouteDialog(true);
    };

    const handleCloseRemoveRouteDialog = () => {
        setOpenRemoveRouteDialog(false);
    };

    return (
        <div className={"grid grid-cols-1 gap-y-2"}>
            <Accordion className={"border border-gray-300 shadow-xl"}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel2-content"
                    id="panel2-header"
                >
                    <Typography component="span">Routes</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {lb_config.lb_config.routes.map((route: IRoute) => (
                        <div key={route.routeId + " " + itr++} className={"p-1"}>
                            <Accordion key={route.routeId + " " + itr++} className={"border border-gray-300 shadow-xl"}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span">{route.routeId}</Typography>
                                </AccordionSummary>


                                <AccordionDetails>
                                    <Box>
                                        <List>
                                            <ListItem key={route.routeId + "_sub"} disablePadding>
                                                <ListItemButton onClick={() => handleOpenChangeRouteDialog(route.routeId!, route.match.path!, route.clusterId!)}>
                                                    <ListItemText primary={route.match.path}
                                                                  secondary={route.clusterId}/>
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider/>
                                        </List>
                                    </Box>

                                    <Stack spacing={2} direction="row">
                                        <Button variant={"contained"} color={"error"}
                                                onClick={() => handleOpenRemoveRouteDialog(route.routeId!)}>Remove
                                            Cluster</Button>
                                    </Stack>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))}
                    <Box>
                        <List>
                            <ListItem key={"addRoute"} disablePadding className={"bg-gray-100"}>
                                <ListItemButton onClick={() => {
                                    handleOpenAddRouteDialog()
                                }}>
                                    <ListItemIcon>
                                        <AddIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={"Add Route"}/>
                                </ListItemButton>
                            </ListItem>
                            <Divider/>
                        </List>
                    </Box>
                </AccordionDetails>
            </Accordion>

            <div>
                <AddRouteDialog handleClickClose={handleCloseAddRouteDialog} open={openAddRouteDialog}/>
                <ChangeRouteDialog handleClose={handleCloseChangeRouteDialog} open={openChangeRouteDialog} selectedRoute={{routeName: selectedRouteName, routeMatchPath: selectedRoutePath, routeCluster: selectedRouteCluster}} />
                <RemoveRouteDialog handleClose={handleCloseRemoveRouteDialog} open={openRemoveRouteDialog}
                                   routeName={selectedRouteName!}/>
            </div>
        </div>
    );
}