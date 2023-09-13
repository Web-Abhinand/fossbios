import  { useEffect, useState } from 'react';
import styles from './LeaveRequestForm.module.css'; 
import jwt_decode from 'jwt-decode';
import axios from 'axios';

function LeaveRequestForm() {
  const [studentEmail, setStudentEmail] = useState('');
  const [reason, setReason] = useState('');
  const [leaveDates, setLeaveDates] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const { email } = decodedToken;
    console.log('Student Email:', email);
    console.log('Reason:', reason);
    console.log('Leave Dates:', leaveDates);
    try {
      console.log('Token:', token);
      const response = await axios.post(
        'http://127.0.0.1:5000/leave-request',
        {
          email,
          reason,
          leaveDates,
        },
        { 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        console.log('Leave request sent successfully');
      }
    } catch (error) {
      console.error('Error sending leave request:', error);
    }
  };

 
    const token = localStorage.getItem('token');
    const decodedToken = jwt_decode(token);
    console.log(decodedToken);
    const { email } = decodedToken;
    console.log(email);


  return (
    <div className={styles.leaveRequestForm}>
      <h2>Leave Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="studentEmail">Student Email:</label>
          <input
            type="email"
            id="studentEmail"
            value={email}
            onChange={(e) => setStudentEmail(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="reason">Reason:</label>
          <input
            type="text"
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="leaveDates">Leave Request Dates:</label>
          <input
            type="text"
            id="leaveDates"
            value={leaveDates}
            onChange={(e) => setLeaveDates(e.target.value)}
            required
            className={styles.inputField}
          />
        </div>
        <div className={styles.submitButton}>
          <button type="submit">Send Leave Request</button>
        </div>
      </form>
    </div>
  );
}

export default LeaveRequestForm;
