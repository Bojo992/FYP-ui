import Dialog from "@mui/material/Dialog";
import * as React from "react";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

export default function AddDirectionDialog({handleClickClose, open, clusterId}: {
    handleClickClose: () => void,
    open: boolean,
    clusterId: string
}) {
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClickClose}
                slotProps={{
                    paper: {
                        component: 'form',
                        onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
                            event.preventDefault();

                            const formData = new FormData(event.currentTarget);
                            const data = {
                                clusterId: clusterId,
                                directionName: formData.get('directionName'),
                                directionPath: formData.get('directionPath'),
                            };

                            console.log(JSON.stringify(data));

                            try {
                                const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/add-direction', {
                                    method: 'POST',
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
                                handleClickClose();
                            } catch (error) {
                                console.error('Error adding direction:', error);
                            }
                        },
                    },
                }}
            >
                <DialogTitle>Add Direction to {clusterId}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="directionName"
                        name="directionName"
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
                        label="Direction Path"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClickClose}>Cancel</Button>
                    <Button type="submit">Subscribe</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}