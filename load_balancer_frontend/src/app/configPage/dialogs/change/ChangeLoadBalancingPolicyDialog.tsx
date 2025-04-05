import Dialog from "@mui/material/Dialog";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function ChangeLoadBalancingPolicyDialog({handleClose, open, selectedCluster}: {
    handleClose: () => void,
    open: boolean,
    selectedCluster: {
        clusterName: string,
        clusterLoadBalancingPolicy: string
    }
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
                            clusterId: selectedCluster.clusterName,
                            directionPath: formData.get('loadBalancingPolicy'),
                        };

                        console.log(JSON.stringify(data));

                        try {
                            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/update-cluster-load-balancing-policy', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                            });

                            if (!response.ok) {
                                throw new Error('Failed to add direction');
                            }

                            console.log('Direction added!');
                            handleClose();
                        } catch (error) {
                            console.error('Error adding direction:', error);
                        }
                    },
                },
            }}
        >
            <DialogTitle>Add Cluster</DialogTitle>
            <DialogContent>
                {/*ToDo change it to the drop down and add selection of the load balancer*/}
                <TextField
                    autoFocus
                    required
                    margin="dense"
                    id="loadBalancingPolicy"
                    name="loadBalancingPolicy"
                    label="Load Balancing Policy"
                    value={selectedCluster.clusterLoadBalancingPolicy}
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