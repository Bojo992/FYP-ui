import Dialog from "@mui/material/Dialog";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {fetchConfig} from "@/app/Controllers/LoadBalancerConfigController";
import LBConfigProps from "@/app/util/LBConfigProps";

export default function RemoveClusterDialog({handleClose, open, clusterName, configProps}: {
    handleClose: () => void,
    open: boolean,
    clusterName: string,
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

                        const data = {
                            clusterId: clusterName
                        };

                        console.log(JSON.stringify(data));

                        try {
                            await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/remove-cluster', {
                                method: 'DELETE',
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
            <DialogTitle>Remove {clusterName}</DialogTitle>
            <DialogContent>
               Do you want to remove {clusterName}? Cluster? This might effect some of the routes.
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Accept</Button>
            </DialogActions>
        </Dialog>
    );
}