// src/pages/auth/Login.tsx

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { setUser, setToken, setRole } from '@/features/auth/authSlice';
import toast from 'react-hot-toast';
import styled from 'styled-components';
import logo from '@/assets/logo.svg';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, #1a1a1a 0%, #000000 100%);
`;

const BackgroundOverlay = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background-image: url('https://images.unsplash.com/photo-1492684223066-81342ee5ff30');
  background-size: cover;
  background-position: center;
  opacity: 0.2;
`;

const GlassCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 500px;
  margin: 0 1rem;
  position: relative;
  z-index: 10;
`;

const LogoCircle = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fa383e;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(250, 56, 62, 0.4);
    }
    70% {
      transform: scale(1.05);
      box-shadow: 0 0 0 10px rgba(250, 56, 62, 0);
    }
    100% {
      transform: scale(1);
      box-shadow: 0 0 0 0 rgba(250, 56, 62, 0);
    }
  }
`;

const LogoContainer = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const LogoImage = styled.img`
  width: 80px;
  height: 80px;
  margin: 0 auto;
`;

const BrandName = styled.h1`
  color: white;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 1rem 0;
  background: #fa383e;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const SubTitle = styled.p`
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  margin-bottom: 2rem;
`;


const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  role: Yup.string().required('Role is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (values: any) => {
    try {
      dispatch(setUser({ id: '1', email: values.email }));
      dispatch(setRole(values.role));
      dispatch(setToken('dummy-token'));
      toast.success('Login successful!');
      navigate('/');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <LoginContainer>
      <BackgroundOverlay />
      <GlassCard>
      <LogoContainer>
          <LogoCircle>
            <LogoImage src={logo} alt="WalkInn Logo" />
          </LogoCircle>
          <BrandName>WalkInn</BrandName>
          <SubTitle>Your Premier Event Management Solution</SubTitle>
        </LogoContainer>
        <LogoCircle>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </LogoCircle>

        <h2 className="text-3xl font-bold text-center text-white mb-8">Welcome Back</h2>

        <Formik
          initialValues={{
            email: '',
            password: '',
            role: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div>
                <Field
                  name="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-300 border-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fa383e] focus:border-transparent transition duration-200"
                  placeholder="Email address"
                />
                {errors.email && touched.email && (
                  <p className="mt-1 text-red-400 text-sm">{errors.email}</p>
                )}
              </div>

              <div>
                <Field
                  name="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-300 border-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fa383e] focus:border-transparent transition duration-200"
                  placeholder="Password"
                />
                {errors.password && touched.password && (
                  <p className="mt-1 text-red-400 text-sm">{errors.password}</p>
                )}
              </div>

              <div>
                <Field
                  as="select"
                  name="role"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-300 border-opacity-20 text-white focus:outline-none focus:ring-2 focus:ring-[#fa383e] focus:border-transparent transition duration-200"
                >
                  <option value="" className="text-gray-900">Select Role</option>
                  <option value="admin" className="text-gray-900">Admin</option>
                  <option value="user" className="text-gray-900">User</option>
                  <option value="agent" className="text-gray-900">Agent</option>
                  <option value="scanner" className="text-gray-900">Scanner</option>
                </Field>
                {errors.role && touched.role && (
                  <p className="mt-1 text-red-400 text-sm">{errors.role}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-[#fa383e] text-white rounded-lg hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#fa383e] transition duration-200 transform hover:scale-105"
              >
                Sign In
              </button>

              <div className="text-center mt-4">
                <Link
                  to="/forgot-password"
                  className="text-sm text-gray-300 hover:text-white transition duration-200"
                >
                  Forgot your password?
                </Link>
              </div>

              <div className="text-center">
                <Link
                  to="/register"
                  className="text-sm text-[#fa383e] hover:text-white transition duration-200"
                >
                  Don't have an account? Sign up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </GlassCard>
    </LoginContainer>
  );
};

export default Login;