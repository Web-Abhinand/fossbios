import React from 'react'
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LeaveRequestForm from './LeaveRequestForm';

const Dashboard = () => {
  const [allUsersDetails, setallUsersDetails] = useState([]);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [Email, setEmail] = useState('');
  const handleLogout = async () => {
    try {
      await axios.post('http://127.0.0.1:5000/logout');
      navigate('/'); // Redirect to the login page
      localStorage.removeItem('token');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    //code to fetch all user details
    axios.get('http://127.0.0.1:5000/allUsersDetails')
      .then(response => {
        console.log(response.data);
        setallUsersDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching user emails:', error);
      });
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    const { email } = decodedToken;
    console.log(email);
    setEmail(email);

    //code to fetch user role
    axios.get(`http://127.0.0.1:5000/getUserRole/${email}`)
      .then(response => {
        const { role } = response.data;
        setUserRole(role);
      })
      .catch(error => {
        console.error('Error fetching user role:', error);
      });
    console.log(userRole);

    //code to fetch current user details
    axios.get(`http://127.0.0.1:5000/currentUserDetails/${email}`)
      .then(response => {
        console.log(response.data);
        setCurrentUser(response.data);
      })
      .catch(error => {
        console.error('Error fetching user role:', error);
      });
    console.log(currentUser);
  }, []);


  const handleApproveUser = async (email) => {
    try {
      // Send a PUT request to your server to approve the user based on email 
      const response = await axios.put(`http://127.0.0.1:5000/approveUser/${email}`);
      // Check if the approval was successful
      if (response.status === 200) {
        // Update the local state to reflect the approval change
        setallUsersDetails((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email ? { ...user, approved: true } : user
          )
        );
      } else {
        console.error('User approval failed:', response.data.message);
      }
    } catch (error) {
      console.error('User approval failed:', error);
    }
  };

   // Filter users based on the role of the logged-in user
   const filteredUsers = allUsersDetails.filter(user => {
    if (userRole === 'lead') {
      // Show all other users except the logged-in user
      return user.email !== Email && user.role !== 'lead';
    } else if (userRole === 'category_lead') {
      // Show only users with the role 'member' and exclude the logged-in user
      return user.email !== Email && user.role === 'member';
    }
    return false;
  });

  return (
    <>
      <h1>{Email}</h1>
      <button onClick={handleLogout}>Log Out</button>
      <h2>User Emails</h2>
      {userRole === 'lead' || userRole === 'category_lead' ? (
        <ul>
          {filteredUsers.map((user, index) => (
            <li key={index}>
              Email: {user.email}{' '}
              {user.approved ? (
                <span>Approved</span>
              ) : (
                <button onClick={() => handleApproveUser(user.email)}>Approve</button>
              )}
            </li>
          ))}
        </ul>
      ) : (null)}
      <LeaveRequestForm />
    </>
  );
};

export default Dashboard;
