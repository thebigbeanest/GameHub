import React from 'react';

const UserProfilePage = ({ user }) => {
    return (
        <div>
            <h1>{user.username}'s Profile</h1>
            <p>Email: {user.email}</p>
            {/* Additional user information and actions can be added here */}
        </div>
    );
};

export default UserProfilePage;
