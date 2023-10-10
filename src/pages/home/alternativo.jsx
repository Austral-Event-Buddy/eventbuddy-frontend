import {AddressAutofill} from "@mapbox/search-js-react";
import {Box, Modal} from "@mui/material";
import Typography from "../../components/common/Typography";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import React from "react";

const Alternativo = () => {

    return (
        <Modal>
            <Box>
                <Typography id="modal-title" variant="h5" children="Create an Event" />
                <div className='inputs-container'>
                    <TextField label="Name" name="name"
                              />
                    <form id="modal-form">
                        <AddressAutofill accessToken="pk.eyJ1IjoicGVkcm9wYW5vc3lhbiIsImEiOiJjbG5hdXR0NGwwNjIwMndvNmVha2lrZ3psIn0.8Fxs6YQcNsQLkPdJjiUCrA">
                            <input
                                name="address" placeholder="Address" type="text"
                                autoComplete="address-line1"
                            />
                        </AddressAutofill>
                        {/*<AddressAutofill accessToken={"pk.eyJ1IjoicGVkcm9wYW5vc3lhbiIsImEiOiJjbG5hdXR0NGwwNjIwMndvNmVha2lrZ3psIn0.8Fxs6YQcNsQLkPdJjiUCrA"}>*/}
                        {/*    <input name="location"*/}
                        {/*           value={event.location}*/}
                        {/*           onChange={(e) => handleChange({ location: e.target.value })}*/}
                        {/*          type={"text"}*/}
                        {/*           autoComplete="address-line1"/>*/}
                        {/*    /!*<TextField label="Location" name="location" value={event.location}*!/*/}
                        {/*    /!*           onChange={(e) => handleChange({ location: e.target.value })}/>*!/*/}
                        {/*</AddressAutofill>*/}
                        {/*<TextField label={"Description"} name="description" value={event.description}*/}
                        {/*           onChange={(e) => handleChange({ description: e.target.value })}/>*/}
                        {/*<TextField label="Date" name="date" type="date" value={event.date}*/}
                        {/*           onChange={(e) => handleChange({ date: e.target.value })}/>*/}
                        {/*<TextField label="Confirmation Deadline" name="confirmationDeadline" type="date" value={event.confirmationDeadline}*/}
                        {/*           onChange={(e) => handleChange({ confirmationDeadline: e.target.value })}/>*/}
                    </form>
                </div>
                <div className="button-container">
                    <Button variant="fullfilled" size="md" text="Create Event"/>
                </div>
            </Box>
        </Modal>
    );


}

export default Alternativo;