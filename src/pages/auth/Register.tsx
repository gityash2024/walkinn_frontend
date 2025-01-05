// src/pages/auth/Register.tsx

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import styled from 'styled-components';

const RegisterContainer = styled.div`
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
  width: 80px;
  height: 80px;
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


const RegisterSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
  role: Yup.string().required('Role is required'),
});

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values: any) => {
    try {
      console.log('Register values:', values);
      toast.success('Registration successful! Please check your email for verification.');
      navigate('/login');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    }
  };

  return (
    <RegisterContainer>
      <BackgroundOverlay />
      <GlassCard>
        <LogoCircle>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </LogoCircle>

        <h2 className="text-3xl font-bold text-center text-white mb-8">Create Account</h2>

        <Formik
          initialValues={{
            email: '',
            password: '',
            confirmPassword: '',
            role: '',
          }}
          validationSchema={RegisterSchema}
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
                  name="confirmPassword"
                  type="password"
                  className="w-full px-4 py-3 rounded-lg bg-white bg-opacity-20 border border-gray-300 border-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#fa383e] focus:border-transparent transition duration-200"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <p className="mt-1 text-red-400 text-sm">{errors.confirmPassword}</p>
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
                Create Account
              </button>

              <div className="text-center mt-4">
                <div className="flex items-center justify-center space-x-2 mb-4">
                  <div className="h-px bg-gray-600 w-14"></div>
                  <span className="text-sm text-gray-400">Or continue with</span>
                  <div className="h-px bg-gray-600 w-14"></div>
                </div>
                
                <div className="flex justify-center space-x-4">
                  <button
                    type="button"
                    className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-200"
                    onClick={() => toast.info('Google sign up coming soon!')}
                  >
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                      />
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-200"
                    onClick={() => toast.info('GitHub sign up coming soon!')}
                  >
                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="text-center mt-6">
                <Link
                  to="/login"
                  className="text-sm text-[#fa383e] hover:text-white transition duration-200"
                >
                  Already have an account? Sign in
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </GlassCard>
    </RegisterContainer>
  );
};

export default Register;