import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Recaptcha from '../../captcha/ReCAPTCHA';
import { ToastContainer } from 'react-toastify';
import google from '../../assets/icons/google.png'
import github from '../../assets/icons/github.png'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserRegister = () => {
    const [formData, setFormData] = useState({
        fullName: {
            firstName: '',
            lastName: ''
        },
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });


    const [captchaToken, setCaptchaToken] = useState(null);
    const [isChecked, setIsChecked] = useState(false);
    const navigate = useNavigate();
    const validateField = (id, value) => {
        let error = '';
        switch (id) {
            case 'firstName':
                if (value.length <= 2) {
                    error = `${id} is too short`;
                }
                break;
            case 'lastName':
                if (value.length < 1) {
                    error = `${id} is too short`;
                }
                break;
            case 'email':
                if (!value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                    error = 'please Enter a valid email';
                }
                break;
            case 'password':
                if (value.length < 6) {
                    error = 'Password is too short (minimum 6 characters)';
                }
                break;
            default:
                break;
        }
        return error;
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;

        // Validate field
        const error = validateField(id, value);
        setErrors(prev => ({
            ...prev,
            [id]: error
        }));

        // Update form data
        if (id === 'firstName' || id === 'lastName') {
            setFormData(prev => ({
                ...prev,
                fullName: {
                    ...prev.fullName,
                    [id]: value
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [id]: value
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.fullName.firstName  || !formData.fullName.lastName || !formData.email || !formData.password) {
            toast.error("Please fill in all fields");
            return;
        }

        // Captcha and terms validation
        if (!captchaToken) {
            toast.error("Please verify the captcha");
            return;
        }
        if (!isChecked) {
            toast.error("Please accept the terms");
            return;
        }

        try {
            const response = await fetch('http://localhost:4444/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Registration successful!");
                localStorage.setItem('token', data.token);
                navigate('/userlogin');
            } else {
                toast.error(data.message || "Registration failed");
            }
        } catch (error) {
            console.error('Registration error:', error);
            toast.error("Registration failed. Please try again.");
        }
    };

    return (
        <div className='h-screen overflow-hidden text-gray-100 bg-gradient-to-t from-zinc-800 to-gray-900'>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto px-8 py-6 mt-6 rounded-lg shadow-md border-[.5px] border-zinc-500">
                <h2 className="text-3xl text-center font-bold mb-6">Create an account</h2>
                <div className='flex gap-4'>
                    <div className="mb-4">
                        <label className="block text-gray-100 text-sm font-bold mb-2" htmlFor="firstName">
                            First Name*
                        </label>
                        <input
                            value={formData.fullName.firstName}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className={`bg-transparent shadow appearance-none rounded w-full py-2 px-3 text-gray-100 border-[.5px] ${errors.firstName ? 'border-red-500' : 'border-zinc-500'
                                } leading-tight focus:outline-none focus:shadow-outline`}
                            id="firstName"
                            type="text"
                            placeholder="First Name"
                        />
                        {errors.firstName && (
                            <div className='w-44 text-center'>
                                <p className="text-red-500 font-bold text-[10px] italic mt-1">{errors.firstName}</p>
                            </div>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-100   text-sm font-bold mb-2" htmlFor="lastName">
                            Last Name*
                        </label>
                        <input
                            value={formData.fullName.lastName}
                            onChange={handleInputChange}
                            autoComplete="off"
                            className={`bg-transparent shadow appearance-none rounded w-full py-2 px-3 text-gray-100 border-[.5px] ${errors.lastName ? 'border-red-500' : 'border-zinc-500'
                                } leading-tight focus:outline-none focus:shadow-outline`}
                            id="lastName"
                            type="text"
                            placeholder="Last Name"
                        />
                        {errors.lastName && (
                            <div className='w-44 text-center'>
                                <p className="text-red-500 font-bold text-[10px] italic mt-1">{errors.lastName}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-100   text-sm font-bold mb-2" htmlFor="email">
                        Email*
                    </label>
                    <input
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className={`bg-transparent shadow appearance-none rounded w-full py-2 px-3 text-gray-100 border-[.5px] ${errors.email ? 'border-red-500' : 'border-zinc-500'
                        } leading-tight focus:outline-none focus:shadow-outline`}
                        id="email"
                        type="email"
                        placeholder="Email"
                    />
                      {errors.email && (
                            <div className='w-44 text-start'>
                                <p className="text-red-500 font-bold text-[10px] italic mt-1">{errors.email}</p>
                            </div>
                        )}
                </div>
                <div>
                    <label className="block text-gray-100    text-sm font-bold mb-2" htmlFor="password">
                        Password*
                    </label>
                    <input
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete="off"
                        className={`bg-transparent shadow appearance-none rounded w-full py-2 px-3 text-gray-100 border-[.5px] ${errors.password ? 'border-red-500' : 'border-zinc-500'
                        } leading-tight focus:outline-none focus:shadow-outline`}
                        id="password"
                        type="password"
                        placeholder="Password"
                    />
                       {errors.password && (
                            <div className='w-54 text-start'>
                                <p className="text-red-500 font-bold text-[10px] italic mt-1">{errors.password}</p>
                            </div>
                        )}
                </div>

                <div className='flex items-center text-center justify-center mt-2'>
                    <p className='text-xs' > Already have an account? <Link to={'/userlogin'} className='text-xs text-[#1d4ed8]'>Sign In</Link></p>
                </div>


                <div className='flex items-center justify-between mt-6'>
                    <p className="text-gray-200 text-sm text-start">  <input type="checkbox"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)} /> I agree to the creation of a Adi's Uber® account. No further action will be taken. Please see our <Link className='text-[#1d4ed8]'>Cookie Policy</Link> and <Link className='text-[#1d4ed8]'>Privacy Policy.</Link></p>
                </div>


                <div className="mt-6">
                    <Recaptcha onVerify={setCaptchaToken} />
                </div>
                <div className="flex items-center justify-between mt-5">
                    <button
                        type="submit"
                        className={`${!captchaToken || !isChecked || !formData.email || !formData.password ||   formData.fullName.firstName.length <= 2 || formData.fullName.lastName.length <= 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100'} bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96 transition-opacity`}
                        disabled={!captchaToken || !isChecked || !formData.email || !formData.password ||   formData.fullName.firstName.length <= 2 || formData.fullName.lastName.length <= 1}
                    >
                        Register
                    </button>
                </div>


                <div className='flex justify-center w-full items-center mt-5'>
                    <span className='text-xs' > OR </span>
                </div>
                <div className='w-full gap-9 justify-center flex items-center py-2'>
                    <Link className='text-xs text-[#1d4ed8]'><img src={google} alt="Arrow Icon" className="ml-1 w-8 h-8" /> </Link>
                    <Link className='text-xs text-[#1d4ed8]'><img src={github} alt="Arrow Icon" className="ml-1 w-8 h-8" /> </Link>
                </div>
            </form>
            <ToastContainer />
        </div>
    )
}

export default UserRegister
