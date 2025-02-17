import React, { useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditUserProfile.css';
import mangoLogo from '../../assets/Logo_white.png';
import userProfileImg from '../../assets/profile.jpg';
import { UserContext } from '../../UserContext';

const EditUserProfile = () => {
    const navigate = useNavigate();
    const { userInfo, setUserInfo } = useContext(UserContext);
    const [profileImage, setProfileImage] = useState(userInfo.profileImage || userProfileImg);
    const [errorMessage, setErrorMessage] = useState('');
    const handleRemoveBackground = useCallback(() => navigate('/removebackground'), [navigate]);
    const handlemainhome = useCallback(() => navigate('/mainhome'), [navigate]);

    const handleResize = useCallback(() => {
        navigate('/resize');
    }, [navigate]);

    const handleNavigation = useCallback((path) => () => navigate(path), [navigate]);

    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [name]: value }));
    }, [setUserInfo]);

    const handleImageUpload = useCallback((e) => {
        const file = e.target.files[0];
        if (file) {
            const imageURL = URL.createObjectURL(file);
            setProfileImage(imageURL);
            setUserInfo((prevUserInfo) => ({ ...prevUserInfo, profileImage: imageURL }));
        }
    }, [setUserInfo]);

    const handleSave = useCallback(() => {
        const requiredFields = ['name', 'email', 'phone', 'country'];
        const missingFields = requiredFields.filter((field) => !userInfo[field]);

        if (missingFields.length > 0) {
            setErrorMessage(`The following fields cannot be blank: ${missingFields.join(', ')}`);
            return;
        }

        setErrorMessage('');
        navigate(-1); // Go back to the previous page
    }, [userInfo, navigate]);

    return (
        <div className="edit-page">
            <nav className="profile">
                <div className="profile-brand">
                    <img src={mangoLogo} alt="Mango Logo" className="manger-logo" onClick={handlemainhome}/>
                </div>
                <div className="navbar-links">
                    <button className="profile-link" onClick={() => navigate('/dashboard')}>Dashboard</button>
                    <button className="profile-link" onClick={() => navigate('/bruiseareacalculation')}>Bruised Area Calculation</button>
                    <button className="profile-link" onClick={() => navigate('/featureanalysis')}>Feature Analysis</button>
                    <button className="profile-link" onClick={handleResize}>Resize</button>
                    <button className="navbar-link" onClick={handleRemoveBackground}>Remove Background</button>
                    <button className="profile-link" onClick={() => navigate('/aboutus')}>About Us</button>
                    <button className="profile-link" onClick={() => navigate('/contactus')}>Contact Us</button>
                </div>
                <div className="navbar-profile">
                    <img src={userInfo.profileImage || userProfileImg} alt="User Profile" className="user-profile" onClick={() => navigate('/userprofilepage')} />
                </div>
            </nav>

            <div className="edit-profile-content">
                <h2 className="edit-title">Edit User Information</h2>
                <div className="edit-container">
                    <div className="profile-section">
                        <img src={profileImage} alt="Profile" className="profile-image" />
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="image-upload" />
                    </div>
                    <div className="edit-info">
                        <div className="edit-info-row">
                            <label>
                                <strong>Name:</strong>
                                <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} className="edit-input" />
                            </label>
                            <label>
                                <strong>Email:</strong>
                                <input type="email" name="email" value={userInfo.email} onChange={handleInputChange} className="edit-input" />
                            </label>
                        </div>
                        <div className="edit-info-row">
                            <label>
                                <strong>Phone Number:</strong>
                                <input type="tel" name="phone" value={userInfo.phone} onChange={handleInputChange} className="edit-input" />
                            </label>
                            <label>
                                <strong>Country:</strong>
                                <input type="text" name="country" value={userInfo.country} onChange={handleInputChange} className="edit-input" />
                            </label>
                        </div>

                        {errorMessage && <div className="error-message">{errorMessage}</div>}

                        <div className="edit-buttons">
                            <button className="edit-button" onClick={handleNavigation(-1)}>Back</button>
                            <button className="change-password-button" onClick={handleSave}>Save</button>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="footer-userprofilepage">
                <div className="footer-address">
                    <p>Mae Fah Luang University 333 Moo 1, Thasud, Muang, Chiang Rai 57100</p>
                </div>
            </footer>
        </div>
    );
};

export default EditUserProfile;
