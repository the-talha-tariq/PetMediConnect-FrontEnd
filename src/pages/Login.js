import React, { useState } from 'react';
import '../styles/LoginStyle.css';
import axios from '../axiosInstance'
import { message } from 'antd';
import { Link ,useNavigate} from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/v1/user/login', formData);
      if (res.data.success) {
        localStorage.setItem("token",res.data.token)
        message.success('Login Successfully');
        console.log("Token:",res.data.token)
        navigate('/');
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      message.error('Something went wrong');
    }
  };

  return (
    <>
      <div className="form-container">
        <h1>Login Page</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <Link to='/register'>Click here to Register</Link>
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
