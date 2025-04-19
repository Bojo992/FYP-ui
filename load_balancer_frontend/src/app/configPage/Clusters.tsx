import LBConfigProps from "@/app/util/LBConfigProps"
import {useState} from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from "@mui/icons-material/Add";
import * as React from "react";
import AddDirectionDialog from "@/app/configPage/dialogs/add/AddDirectionDialog";
import AddClusterDialog from "@/app/configPage/dialogs/add/AddClusterDialog";
import ChangeDirectionDialog from "@/app/configPage/dialogs/change/ChangeDirectionDialog";
import ChangeLoadBalancingPolicyDialog from "@/app/configPage/dialogs/change/ChangeLoadBalancingPolicyDialog";
import RemoveClusterDialog from "@/app/configPage/dialogs/remove/RemoveClusterDialog";
import RemoveDirectionDialog from "@/app/configPage/dialogs/remove/RemoveDirectionDialog";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function Clusters({lb_config}: { lb_config: LBConfigProps }) {
    let itr = 1;
    const [openAddClusterDialog, setOpenAddClusterDialog] = useState(false);
    const [openAddDirectionDialog, setOpenAddDirectionDialog] = useState(false);
    const [openChangeDirectionDialog, setOpenChangeDirectionDialog] = useState(false);
    const [openChangeLoadBalancingPolicyDialog, setOpenChangeLoadBalancingPolicyDialog] = useState(false);
    const [openRemoveClusterDialog, setOpenRemoveClusterDialog] = useState(false);
    const [openRemoveDirectionDialog, setOpenRemoveDirectionDialog] = useState(false);
    const [selectedClusterName, setSelectedClusterName] = useState<string>("test");
    const [selectedDirectionName, setSelectedDirectionName] = useState<string>("test");
    const [selectedDirectionPath, setSelectedDirectionPath] = useState<string>("test");
    const [selectedLoadBalancingPolicy, setSelectedLoadBalancingPolicy] = useState<string>("test");

    const handleOpenAddClusterDialog = () => {
        setOpenAddClusterDialog(true);
    }
    const handleCloseAddClusterDialog = () => {
        setOpenAddClusterDialog(false);
    }
    const handleOpenAddDirectionDialog = (clusterId: string) => {
        setSelectedClusterName(clusterId);
        setOpenAddDirectionDialog(true);
    };
    const handleCloseAddDirectionDialog = () => {
        setOpenAddDirectionDialog(false);
        setSelectedClusterName("");
    };
    const handleOpenChangeDirectionDialog = (clusterId: string, directionName: string, directionPath: string) => {
        setSelectedClusterName(clusterId);
        setSelectedDirectionName(directionName);
        setSelectedDirectionPath(directionPath);
        setOpenChangeDirectionDialog(true);
    };
    const handleCloseChangeDirectionDialog = () => {
        setOpenChangeDirectionDialog(false);
        setSelectedClusterName("");
        setSelectedDirectionName("");
        setSelectedDirectionPath("");
    };
    const handleOpenChangeLoadBalancingPolicyDialog = (clusterId: string, clusterLoadBalancingPolicy: string) => {
        setSelectedClusterName(clusterId);
        setSelectedLoadBalancingPolicy(clusterLoadBalancingPolicy);
        setOpenChangeLoadBalancingPolicyDialog(true);
    };
    const handleCloseChangeLoadBalancingPolicyDialog = () => {
        setOpenChangeLoadBalancingPolicyDialog(false);
        setSelectedClusterName("");
        setSelectedLoadBalancingPolicy("");
    };
    const handleOpenRemoveClusterDialog = (clusterId: string) => {
        setSelectedClusterName(clusterId);
        setOpenRemoveClusterDialog(true);
    };
    const handleCloseRemoveClusterDialog = () => {
        setOpenRemoveClusterDialog(false);
        setSelectedClusterName("");
    };
    const handleOpenRemoveDirectionsDialog = (clusterId: string, directionName: string) => {
        setSelectedClusterName(clusterId);
        setSelectedDirectionName(directionName);
        setOpenRemoveDirectionDialog(true);
    };
    const handleCloseRemoveDirectionsDialog = () => {
        setOpenRemoveDirectionDialog(false);
        setSelectedClusterName("");
        setSelectedDirectionName("");
    };

    return (
        <div className={"grid grid-cols-1 gap-y-2"}>
            <Accordion className={"p-1 rounded-4xl border border-gray-300"}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <Typography component="span">Clusters</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {lb_config.lb_config.clusters.map((cluster: ICluster) => (
                        <div key={cluster.clusterId + " " + itr++} className={"p-1"}>
                            <Accordion className={"border border-gray-300 shadow-xl"}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon/>}
                                    aria-controls="panel1-content"
                                    id="panel1-header"
                                >
                                    <Typography component="span">{cluster.clusterId} / {cluster.loadBalancingPolicy}</Typography>
                                </AccordionSummary>

                                <AccordionDetails>
                                    <Stack spacing={2} direction="row">
                                        <Button variant={"outlined"}
                                                onClick={() => handleOpenChangeLoadBalancingPolicyDialog(cluster.clusterId!, cluster.loadBalancingPolicy!)}>Change
                                            Policy</Button>
                                        <Button variant={"contained"} color={"error"}
                                                onClick={() => handleOpenRemoveClusterDialog(cluster.clusterId!)}>Remove
                                            Cluster</Button>
                                    </Stack>

                                    <Box>
                                        <List>
                                            {Object.entries(cluster.destinations).map(([name, destination]: [string, IDestination], index: number) => (
                                                <div key={cluster.clusterId + " " + itr++}>
                                                    <ListItem key={itr++} disablePadding>
                                                        <ListItemButton
                                                            onClick={() => handleOpenChangeDirectionDialog(cluster.clusterId!, name, destination.address!)}>
                                                            <ListItemText primary={name}
                                                                          secondary={destination.address}/>
                                                        </ListItemButton>
                                                        <Button variant={"contained"} color={"error"}
                                                                onClick={() => handleOpenRemoveDirectionsDialog(cluster.clusterId!, name)}>Remove</Button>
                                                    </ListItem>
                                                    <Divider/>
                                                </div>
                                            ))}

                                            <ListItem key={"addDestination1"} disablePadding
                                                      className={"bg-gray-100"}>
                                                <ListItemButton onClick={() => {
                                                    handleOpenAddDirectionDialog(cluster.clusterId!)
                                                }}>

                                                    <ListItemIcon>
                                                        <AddIcon/>
                                                    </ListItemIcon>

                                                    <ListItemText primary={"Add Direction"}/>
                                                </ListItemButton>
                                            </ListItem>
                                            <Divider/>
                                        </List>
                                    </Box>
                                </AccordionDetails>
                            </Accordion>
                        </div>
                    ))}
                </AccordionDetails>

                <Box>
                    <List>
                        <ListItem key={"addCluster"} disablePadding className={"bg-gray-100"}>
                            <ListItemButton onClick={() => {
                                handleOpenAddClusterDialog();
                            }}>
                                <ListItemIcon>
                                    <AddIcon/>
                                </ListItemIcon>
                                <ListItemText primary={"Add Cluster"}/>
                            </ListItemButton>
                        </ListItem>
                        <Divider/>
                    </List>
                </Box>
            </Accordion>

            <div>
                <AddDirectionDialog handleClickClose={handleCloseAddDirectionDialog} open={openAddDirectionDialog}
                                    clusterId={selectedClusterName} configProps={lb_config}/>
                <AddClusterDialog handleClose={handleCloseAddClusterDialog} open={openAddClusterDialog} configProps={lb_config}/>

                <ChangeDirectionDialog handleClose={handleCloseChangeDirectionDialog} open={openChangeDirectionDialog}
                                       selectedDirection={{
                                           clusterName: selectedClusterName,
                                           directionName: selectedDirectionName,
                                           directionPath: selectedDirectionPath
                                       }}
                                       configProps={lb_config}
                />

                <ChangeLoadBalancingPolicyDialog handleClose={handleCloseChangeLoadBalancingPolicyDialog}
                                                 open={openChangeLoadBalancingPolicyDialog} selectedCluster={{
                    clusterName: selectedClusterName,
                    clusterLoadBalancingPolicy: selectedLoadBalancingPolicy
                }}
                                                 configProps={lb_config}

                />

                <RemoveClusterDialog handleClose={handleCloseRemoveClusterDialog} open={openRemoveClusterDialog}
                                     clusterName={selectedClusterName}
                                     configProps={lb_config}
                />

                <RemoveDirectionDialog handleClose={handleCloseRemoveDirectionsDialog} open={openRemoveDirectionDialog}
                                       selectedCluster={{
                                           clusterName: selectedClusterName,
                                           directionName: selectedDirectionName
                                       }}
                                       configProps={lb_config}
                />
            </div>
        </div>
    );
}