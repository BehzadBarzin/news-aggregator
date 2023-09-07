import styles from "../constants/styles";
import logo from '../assets/logo.svg';
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants/Constants";
import { useSignIn } from "react-auth-kit";
import { useNavigate } from "react-router-dom";

type FormState = {
  name?: string,
  email?: string,
  password?: string,
  password_confirmation?: string
};


function Login() {
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const [formState, setFormState] = useState<FormState>({});
  const signIn = useSignIn();
  const navigate = useNavigate();

  const changeRegister = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setIsRegister(true);
    } else {
      setIsRegister(false);
    }
  }

  const onFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      }
    });
  }

  const submit = useCallback(async () => {
    if (!isRegister) {
      const res = await axios.post(`${API_URL}/login`, {
        email: formState.email,
        password: formState.password
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      signIn({
        token: res.data.token,
        tokenType: 'Bearer',
        expiresIn: 7 * 24 * 60 * 60,
        authState: res.data.user
      });

      navigate('/');
      
    } else {
      const res = await axios.post(`${API_URL}/register`, {
        name: formState.name,
        email: formState.email,
        password: formState.password,
        password_confirmation: formState.password_confirmation
      }, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });

      signIn({
        token: res.data.token,
        tokenType: 'Bearer',
        expiresIn: 7 * 24 * 60 * 60,
        authState: res.data.user
      });

      navigate('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRegister, formState]);
  
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    submit();
  }

  return (
    <div className={`${styles.boxWidth} h-screen ${styles.flexStart} ${styles.padding} text-white`}>
      <div className="flex flex-col justify-start items-center">
        {/* Logo */}
        <img
          src={logo}
          alt="news-aggregator-logo"
          className="w-[266px] h-[72x] object-contain"
        />
        {/* htmlForm */}
        <div className={`m-3 p-3 border-t-[1px] w-[400px] border-t-[#3F3E45] flex-col justify-center items-center`}>
          {/* Register toggle */}
          <div className={`${styles.flexCenter}`}>
            <label className="relative inline-flex items-center cursor-pointer mb-4">
              <input type="checkbox" onChange={changeRegister} value="" className="sr-only peer" />
              <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              <span className="ml-3 font-poppins font-normal xs:text-[18px] text-[16px] xs:leading-[24px] leading-[14px] text-gradient uppercase">Register</span>
            </label>
          </div>
          <form onSubmit={onSubmit}>
            {/* Name */}
            {
              isRegister ? 
                        (<div className="mb-6">
                          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                          <input type="text" id="name" name="name" onChange={onFormChange} value={formState.name} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required />
                        </div> )
                      : null
            }
            

            {/* Email */}
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email address</label>
              <input type="email" id="email" name="email" onChange={onFormChange} value={formState.email} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="john.doe@company.com" required />
            </div> 
            {/* Password */}
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" id="password" name="password" onChange={onFormChange} value={formState.password} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
            </div> 
            {/* Password Confirm */}
            {
              isRegister ?
                      (
                        <div className="mb-6">
                            <label htmlFor="confirm_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <input type="password" id="confirm_password" name="password_confirmation" onChange={onFormChange} value={formState.password_confirmation} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="•••••••••" required />
                        </div>
                      ) : null
            }
            {/* Submit */}
            <div className={`${styles.flexCenter}`}>
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {isRegister ? 'Register' : 'Login'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;