import React from 'react'
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Dashboard = () => {
  const [allUsersDetails, setallUsersDetails] = useState([]);
  const navigate = useNavigate();
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
    axios.get('http://127.0.0.1:5000/allUsersDetails')
      .then(response => {
        console.log(response.data);
        setallUsersDetails(response.data);  
      })
      .catch(error => {
        console.error('Error fetching user emails:', error);
      });
  }, []);
  
  const handleApproveUser = async () => {
    try {
      await console.log('hello world');
    } catch (error) {
      console.error('Approve user failed:', error);
    }
  };


  return (
    <>
      <h1>Dashboard</h1>
      <button onClick={handleLogout}>Log Out</button>
      <h2>User Emails</h2>
      <ul>
        {allUsersDetails.map((user, index) => (
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
    </>
  );
};

export default Dashboard;
