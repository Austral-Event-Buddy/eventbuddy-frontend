import './login.css'
import logo from '../../icons/eventBuddy-logo.svg'
import img from '../../images/login-register.svg'
import TextField from '../../components/TextField';
import Button from "../../components/Button";
import Typography from '../../components/Typography';
import {useState} from 'react';
import axios from 'axios';
import validator from 'validator';

function Login() {

    const [disable, setDisable] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleDisable = () => {
        if (validator.isEmail(email) && password.length > 8) {
            setDisable(false)
        }
        else { setDisable(true) }
    }
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
        handleDisable();
    };
    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
        handleDisable();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = {
            email: email,
            password: password
        };
        axios.post('http://localhost:8080/api/auth/login', form)
            .then((response) => {
                console.log(response)
            })
            .catch((error) => {
                console.error(error);
            });
    }




    return (
        <div className='login-container'>
            <div className='login-container--left'>
                <div className='login-container--left_form'>
                    <div className='login-container--left_brand'>
                        <img alt='logo' src={logo} />
                        <h2>EventBuddy</h2>
                    </div>
                    <div className='login-container--left_inputs'>
                        <div className='login-container--left_inputs_title'>
                            <Typography variant='h5'>Welcome Back</Typography>
                        </div>
                        <TextField onChange={handleEmailChange} label='Email' placeholder='jane.doe@mail.com'/>
                        <TextField onChange={handlePasswordChange} label='Password' placeholder='Password123!'/>
                        <div className='login-container--left_buttons'>
                            <Button disabled={disable} onClick={handleSubmit} size='lg' text='Log In'/>
                            <Button variant='ghost' size='lg' text='Register'/>
                        </div>
                    </div>
                </div>
            </div>
            <div className='login-container--right'>
                <div className='login-container--right_img'>
                    <img alt='img' src={img}/>
                </div>
            </div>
        </div>
    )


}

export default Login;