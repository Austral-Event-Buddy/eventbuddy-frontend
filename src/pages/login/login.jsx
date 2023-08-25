import './login.css'
import logo from '../../icons/eventBuddy-logo.svg'
import img from '../../images/login-register.svg'
import TextField from '../../components/TextField';
import Button from "../../components/Button";
import Typography from "../../components/Typography";

function Login() {

    return (
        <div className='login-container'>
            <div className='login-container--left'>
                <div className='login-container--left_form'>
                    <div className='login-container--left_brand'>
                        <img alt='logo' src={logo}/>
                        <h2>EventBuddy</h2>
                    </div>
                    <div className='login-container--left_inputs'>
                        <div className='login-container--left_inputs_title'>
                            <Typography variant='h5'>Welcome Back</Typography>
                        </div>
                        <TextField label='Email' placeholder='jane.doe@mail.com'/>
                        <TextField label='Password' placeholder='Password123!'/>
                        <div className='login-container--left_buttons'>
                            <Button size='lg' text='Log In'/>
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