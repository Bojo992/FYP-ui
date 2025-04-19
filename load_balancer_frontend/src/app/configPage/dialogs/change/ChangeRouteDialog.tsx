import Dialog from "@mui/material/Dialog";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {fetchConfig} from "@/app/Controllers/LoadBalancerConfigController";
import LBConfigProps from "@/app/util/LBConfigProps";

export default function ChangeRouteDialog({handleClose, open, selectedRoute, configProps}: {
    handleClose: () => void,
    open: boolean,
    selectedRoute: { routeName: string; routeMatchPath: string, routeCluster: string },
    configProps: LBConfigProps
}) {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            slotProps={{
                paper: {
                    component: 'form',
                    onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();

                        const formData = new FormData(event.currentTarget);
                        const data = {
                            routeName: selectedRoute.routeName,
                            routeMatch: formData.get('routePath'),
                            clusterId: formData.get('clusterName'),
                        };

                        console.log(JSON.stringify(data));

                        try {
                            await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/update-route', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                            }).then(async (response) => {
                                    if (!response.ok) {
                                        throw new Error('Failed to add direction');
                                    }

                                    let config = await fetchConfig() as IConfig;

                                    console.log(JSON.stringify(response.body), config, "bojo");

                                    configProps.setConfig(config);
                                });

                            // Optionally show success message here
                            console.log('Direction added!');
                            handleClose();
                        } catch (error) {
                            console.error('Error adding direction:', error);
                        }
                    },
                },
            }}
        >
            <DialogTitle>Change {selectedRoute.routeName}</DialogTitle>
            <DialogContent>
                <TextField
                    required
                    margin="dense"
                    id="routePath"
                    name="routePath"
                    label="Route Path"
                    defaultValue={selectedRoute.routeMatchPath}
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    required
                    margin="dense"
                    id="clusterName"
                    name="clusterName"
                    label="Cluster Name"
                    defaultValue={selectedRoute.routeCluster}
                    type="text"
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Subscribe</Button>
            </DialogActions>
        </Dialog>
    );
}