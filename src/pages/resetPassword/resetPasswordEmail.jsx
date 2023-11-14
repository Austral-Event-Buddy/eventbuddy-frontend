import img from "../../images/login-register.svg";
import logo from "../../icons/eventBuddy-logo.svg";
import Typography from "../../components/common/Typography";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import {Routes} from "../../utils/routes";
import Toasterror from "../../components/common/Toast/toasterror";
import React, {useState} from "react";
import validator from "validator";
import {sendEmail} from "../../api/api";
import {toast} from "react-toastify";

const ResetPasswordEmail = () => {

    const [email, setEmail] = useState("");
    const validEmail = validator.isEmail(email);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        console.log(validEmail)
    }

    const handleSubmit = () => {
      console.log(email)
      sendEmail(email).then(() => {
          toast.success("Email sent successfully.");
      }).catch(() => {
          toast.error("Something went wrong");
      }).finally(() => {
            setEmail("");
      })
    }

    return (
        <div className="login-container">
            <div className="login-container--left">
                <div className="login-container--left_form">
                    <div style={{marginBottom: "56px"}} className="login-container--left_brand">
                        <img alt="logo" src={logo} />
                        <h2>EventBuddy</h2>
                    </div>
                    <div className="login-container--left_inputs">
                        <div className="login-container--left_inputs_title">
                            <Typography variant="h5">Reset your password</Typography>
                        </div>
                        <TextField
                            onChange={ (e) => handleEmailChange(e) }
                            value={email}
                            label="Email"
                            placeholder="jane.doe@mail.com"
                            error={!validEmail && email}
                            helperText={!validEmail && email? "Please enter a valid email address" : undefined}
                        />
                        <div className="login-container--left_buttons">
                            <Button
                                disabled={!validEmail}
                                onClick={handleSubmit}
                                size="lg"
                                text="Send recovery email"
                            />
                        </div>
                        <Toasterror />
                    </div>
                </div>
            </div>
            <div className="login-container--right">
                <div className="login-container--right_img">
                    <img alt="img" src={img} />
                </div>
            </div>
        </div>
    );
}

export default ResetPasswordEmail;