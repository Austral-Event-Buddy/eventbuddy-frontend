import img from "../../images/login-register.svg";
import logo from "../../icons/eventBuddy-logo.svg";
import Typography from "../../components/common/Typography";
import TextField from "../../components/common/TextField";
import Button from "../../components/common/Button";
import Toasterror from "../../components/common/Toast/toasterror";
import React, {useEffect, useState} from "react";
import {api, resetPassword} from "../../api/api";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const ResetPassword = () => {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");

    const validPassword = password.length >= 8;
    const validRepeatPassword = password === repeatPassword;

    const handlePasswordChange = (e) => { setPassword(e.target.value) }
    const handleRepeatPasswordChange = (e) => { setRepeatPassword(e.target.value) }

    function extractTokenFromURL(url) {
        const urlParams = new URLSearchParams(new URL(url).search);
        return urlParams.get('token');
    }

    useEffect(() => {
        const token = extractTokenFromURL(window.location.href);
        localStorage.setItem("token", token);
    }, []);


    const handleSubmit = async () => {
        if (validPassword && validRepeatPassword) {
            try {
                await resetPassword({ token: localStorage.getItem("token"), newPassword: password });
                toast.success("Password reseted successfully.");
                navigate("/login");
            } catch (error) {
                toast.error("Something went wrong");
            } finally {
                setPassword("");
                setRepeatPassword("");
            }
        }
    };

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
                            onChange={(e) => handlePasswordChange(e)}
                            value={password}
                            type={"password"}
                            label="New password"
                            placeholder="Password123!"
                        />
                        <TextField
                            onChange={(e) => handleRepeatPasswordChange(e)}
                            value={repeatPassword}
                            type={"password"}
                            label="Repeat new password"
                            placeholder="Password123!"
                        />
                        <div className="login-container--left_buttons">
                            <Button
                                onClick={handleSubmit}
                                disabled={!(validPassword && validRepeatPassword)}
                                size="lg"
                                text="Reset password"
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

export default ResetPassword;