import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveUser } from '../../app/features/registeredUsers/registeredUsersSlice';
export const Login = () => {
    const dispatch = useDispatch();
    let users = useSelector(state => state.users.users)
    console.log("users", users)
    // let registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"))
    // console.log(registeredUsers)

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    let [errorInEmail, setErrorInEmail] = useState('');
    let [errorInPassword, setErrorInPassword] = useState('');
    const navigate = useNavigate();
    const handleLogin = (event) => {
        event.preventDefault();
        const foundUser = users.find(user => user.email == event.target.email.value);
        if (event.target.email.value == "") {
            setErrorInEmail("Email cannot be empty");
        }
        else if (event.target.password.value == "") {
            setErrorInPassword("Password cannot be empty");
        }
        else if (foundUser) {
            if (foundUser.password == event.target.password.value) {
                dispatch(setActiveUser(foundUser.email))

                navigate("/home")
            }
            else {
                setErrorInPassword("Incorrect password");
            }
        }
        else {
            setErrorInEmail('Email not found');
        }

    };
    function reset_error() {
        setErrorInEmail("");
        setErrorInPassword("")
    }

    return (
        <div>
            <section className=" bg-white-50 dark:bg-white-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                Log In
                            </h1>
                            <form onSubmit={handleLogin} className="space-y-4 md:space-y-6" >
                                <div>
                                    <Input error={errorInEmail} simpleInputField={true} id="email" name="email" placeholder="Email" className={"focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} />
                                </div>
                                <div>
                                    <Input error={errorInPassword} id="password" name="password" placeholder="Password" className={"focus:outline-none bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  dark:text-white"} divStyling="flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                                </div>
                                <Button onClick={reset_error} className="w-full text-white bg-black hover:bg-black-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-1"
                                    type="submit"
                                    size="large"
                                    variant="primary"
                                    text="Login"></Button>
                                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet? <Link to={"/signup"}><a href="#" className="font-medium text-primary hover:underline dark:text-primary">Sign up</a></Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
