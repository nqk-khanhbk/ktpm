import React from 'react';
import { useAuth } from '../hooks/useAuth';

const Profile = () => {
    const { user } = useAuth();

    return (
        <div className="profile">
            <h1>User Profile</h1>
            {user ? (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>ID:</strong> {user.id}</p>
                </div>
            ) : (
                <p>No user information available.</p>
            )}
        </div>
    );
};

export default Profile;