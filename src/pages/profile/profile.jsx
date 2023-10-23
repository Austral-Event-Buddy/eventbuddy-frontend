import './profile.css';
import { useState } from "react";
import Button from '../../components/common/Button';


export default function Profile() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    return (
        <div>
            <div className="titulo">
                <h1>Profile</h1>
            </div>
            <div className="image">
                <svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192" fill="none">
                    <circle cx="96" cy="96" r="96" fill="#D9D9D9"/>
                </svg>
            </div>

            <div className="form">
                <form>
                    <div className="name-form">
                        <div className='label1'>
                            <label>Name</label>
                        </div>
                        <input height={'10px'} placeholder='Jane Doe' value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="username-form">
                        <div className='label2'>
                        <label>Username</label>
                        </div>
                        <input placeholder='jane.doe' value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="email-form">
                        <div className='label3'>
                        <label>Email</label>
                            </div>
                        <input placeholder='jane.doe@mail.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="password-form">
                        <div className='label4'>
                        <label>Password</label>
                        </div>
                        <input placeholder='Password123!' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                        <div className='button1'>
                            <Button size= {'md'} text='Save'/>
                        </div>
                        <div className='button2'>
                            <Button size= {'md'} variant={"outlined"} text = 'Close account' className='red-button'/>
                        </div>
                </form>
            </div>
        </div>
    );
}
