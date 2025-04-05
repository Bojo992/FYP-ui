import Dialog from "@mui/material/Dialog";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function RemoveDirectionDialog({handleClose, open, selectedCluster}: {
    handleClose: () => void,
    open: boolean,
    selectedCluster: {
        clusterName: string,
        directionName: string
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

                        const data = {
                            clusterId: selectedCluster.clusterName,
                            directionId: selectedCluster.directionName
                        };

                        console.log(JSON.stringify(data));

                        try {
                            const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/remove-direction', {
                                method: 'DELETE',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify(data),
                            });

                            if (!response.ok) {
                                throw new Error('Failed to add direction');
                            }

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
            <DialogTitle>Remove Direction from {selectedCluster.clusterName}</DialogTitle>
            <DialogContent>
               Do you want to remove this Direction from the {selectedCluster.clusterName}?
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button type="submit">Accept</Button>
            </DialogActions>
        </Dialog>
    );
}