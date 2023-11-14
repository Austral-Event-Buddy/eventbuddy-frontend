import './profile.css';
import {useEffect, useState} from "react";
import Button from '../../components/common/Button';
import {deleteProfile, getMe, updateProfileData} from "../../api/api";
import {useNavigate} from "react-router-dom";
import {Routes} from "../../utils/routes";
import {removeToken} from "../../api/token";

export default function Profile() {
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();


    useEffect(() => {
        getMe()
            .then((data) => {
                setProfileData(data);
            })
            .catch((error) => {
                console.error("Error obtaining data from backend:", error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault()

        const updatedProfileData = {
            name: profileData.name,
            email: profileData.email,
            password: profileData.password,
        };

        updateProfileData(updatedProfileData)
            .catch((error) => {
                console.error("Error updating profile data:", error);
            });

        setProfileData({...profileData, password: ''})
    };
    const handleDelete = () => {
        deleteProfile()
            .then((response) => {
                navigate(Routes.Login);
                removeToken();
            })
            .catch((error) => {
                console.error("Error deleting profile data:", error);
            });
    }
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
                        <label>Name</label>
                        <input
                            placeholder='Jane Doe'
                            value={profileData.name}
                            onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        />
                    </div>
                    <div className="username-form">
                        <label>Username</label>
                        <input
                            placeholder='jane.doe'
                            value={profileData.username}
                            onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                            disabled
                        />
                    </div>
                    <div className="email-form">
                        <label>Email</label>
                        <input
                            placeholder='jane.doe@mail.com'
                            value={profileData.email}
                            onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        />
                    </div>
                    <div className="password-form">
                        <label>Password</label>
                        <input
                            placeholder='Password123!'
                            value={profileData.password}
                            type='password'
                            onChange={(e) => setProfileData({ ...profileData, password: e.target.value })}
                        />
                    </div>
                        <div className='button1'>
                            <Button onClick={handleSubmit} size={'md'} text='Save'/>
                        </div>
                        <div className='button2'>
                            <Button onClick={handleDelete} size= {'md'} variant={"outlined"} text = 'Close account' className='red-button'/>
                        </div>
                </form>
            </div>
        </div>
    );
}
