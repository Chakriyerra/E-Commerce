import React from 'react'
import './CSS/LoginSignIn.css'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';

const LoginSignIn = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const loginUser = async (formValues) => {
    try {
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      const foundUser = storedUsers.find(
        user => user.email === formValues.email && user.password === formValues.password
      );

      if (foundUser) {
        alert("Successfully Logged In!");
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", foundUser.email);
        localStorage.setItem("userName", foundUser.name);
        navigate('/');
        window.location.reload(); // refresh UI
      } else {
        alert("Incorrect email or password!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(loginUser)}>
      <div className='loginsignIn'>
        <div className="loginsignIn-container">
          <h1>Sign In</h1>
          <div className="loginsignIn-fields">
            <input type="email" placeholder='Email Address' {...register('email')} />
            <input type="password" placeholder='Password' {...register('password')} />
          </div>
          <button type="submit">Login</button>
          <p className="loginsignIn-login">
            Don't have an account?{" "}
            <span>
              <Link to='/login' style={{ textDecoration: "none" }}>Register here.</Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginSignIn;
