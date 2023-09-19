import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import LeaveRequestForm from './LeaveRequestForm';
import Header from './Header';
import styles from './Dashboard.module.css';
import avatar from './assets/avatar.svg';
const Dashboard = () => {
  const [allUsersDetails, setallUsersDetails] = useState([]);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [Email, setEmail] = useState('');
  const [CurrentUserLeaveDetails, setCurrentUserLeaveDetails] = useState([]);


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
    //code to fetch curren user's leave requests details
    axios.get(`http://127.0.0.1:5000/currentUserLeaveRequests/${email}`)
      .then(response => {
        console.log(response.data, 'current user leave details response');
        setCurrentUserLeaveDetails(response.data);
        console.log(CurrentUserLeaveDetails, 'current user leave details');
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
      <div className={styles.container}>
        <Header handleLogout={handleLogout} />
        <div>
          <div style={{width:'20%',margin:'3rem auto'}}>
            <img src={avatar} alt="avatar" />
            <h2 style={{textAlign:'center',padding:0,margin:0}}>User: {Email}</h2>
          </div>
          <LeaveRequestForm />
          <div style={{width:'80%',margin:'0 auto'}}>
            <h2>User Approval Details</h2>
          </div>
          {userRole === 'lead' || userRole === 'category_lead' ? (
            <ul className={styles.userList} style={{width:'80%',margin:'0 auto'}}>
              {filteredUsers.map((user, index) => (
                <li className={styles.userListItem} key={index}>
                  Email: {user.email}{' '}
                  {user.approved ? (
                    <span className={styles.approvedLabel}>Approved</span>
                  ) : (
                    <button
                      className={styles.approveButton}
                      onClick={() => handleApproveUser(user.email)}
                    >
                      Approve
                    </button>
                  )}
                </li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className={styles.leaveRequestContainer} style={{width:'80%',margin:'3rem auto'}}>
          {CurrentUserLeaveDetails.map((leaveRequest, index) => (
            <div className={styles.leaveRequestDetails} key={index}>
              <h3 className={styles.leaveRequestHeading}>Leave Request Details</h3>
              <p>Leave Date: {leaveRequest.date}</p>
              <p>Reason: {leaveRequest.reason}</p>
              <p>
                Status:{' '}
                {leaveRequest.leaveApproved ? (
                  <span className={styles.approvedLabel}>Approved</span>
                ) : (
                  <span className={styles.notApprovedLabel}>Not Approved</span>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
