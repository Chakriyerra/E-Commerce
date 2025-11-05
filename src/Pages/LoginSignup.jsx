import React from 'react'
import './CSS/LoginSignup.css'
import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom';

const LoginSignup = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const registerUser = async (formValues) => {
    try {
      // get all users from localStorage (if any)
      const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

      // check if user already exists
      const userExists = storedUsers.some(user => user.email === formValues.email);
      if (userExists) {
        alert("User already registered with this email!");
        return;
      }

      // create new user object
      const newUser = {
        name: formValues.name,
        email: formValues.email,
        password: formValues.password
      };

      // save new user in localStorage
      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));

      alert("User registered successfully!");
      navigate('/signin'); // go to login page after registration
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(registerUser)}>
      <div className='loginsignup'>
        <div className="loginsignup-container">
          <h1>Register</h1>
          <div className="loginsignup-fields">
            <input type="text" placeholder='Full Name' {...register('name', { required: true })} />
            <input type="email" placeholder='Email Address' {...register('email', { required: true })} />
            <input type="password" placeholder='Password' {...register('password', { required: true })} />
          </div>
          <button type="submit">Register</button>
          <p className="loginsignup-login">
            Already have an account?{' '}
            <span>
              <Link to='/signin' style={{ textDecoration: "none" }}>Login here</Link>
            </span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginSignup;
