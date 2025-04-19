import Dialog from "@mui/material/Dialog";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {fetchConfig} from "@/app/Controllers/LoadBalancerConfigController";
import LBConfigProps from "@/app/util/LBConfigProps";

export default function ChangeDirectionDialog({handleClose, open, selectedDirection, configProps}: {
    handleClose: () => void,
    open: boolean,
    selectedDirection: { clusterName: string, directionName: string, directionPath: string },
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
                            clusterId: selectedDirection.clusterName,
                            directionName: formData.get('directionName'),
                            directionPath: formData.get('directionPath'),
                            originalDirectionName: selectedDirection.directionName,
                        };

                        console.log(JSON.stringify(data));

                        try {
                            await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/update-cluster-directions', {
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

                            console.log('Direction added!');
                            handleClose();
                        } catch (error) {
                            console.error('Error adding direction:', error);
                        }
                    },
                },
            }}
        >
            <DialogTitle>
                Change direction {selectedDirection.directionName?.slice(0, 20)}{selectedDirection.directionName?.length > 20 && '...'} in {selectedDirection.clusterName?.slice(0, 20)}{selectedDirection.clusterName?.length > 20 && '...'}
            </DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="directionName"
                    name="directionName"
                    defaultValue={selectedDirection.directionName}
                    label="Direction name"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="directionPath"
                    name="directionPath"
                    defaultValue={selectedDirection.directionPath}
                    label="Direction Path"
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