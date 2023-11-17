import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Input } from "../../../components/input"
import { Button } from "../../../components/button"
import { addUser } from '../../features/registeredUsers/registeredUsersSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import registeredUsersSlice from '../../features/registeredUsers/registeredUsersSlice';

export const Signup = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users)
    //const users = useSelector(state => state.users);
    console.log("Registered Users:", users)

    const navigate = useNavigate();
    //let [registeredUsers, setRegisteredUsers] = useState([]);
    let [errorInEmail, setErrorInEmail] = useState("");
    let [errorInPassword, setErrorInPassword] = useState("");
    let [errorInConfirmPassword, setErrorInConfirmPassword] = useState("");


    const handleAddRegisteredUser = (e) => {
        e.preventDefault();
        let obj = {
            id: nanoid,
            email: e.target.email.value,
            password: e.target.password.value,
            confirm_password: e.target.confirm_password.value
        }
        if (obj.email == "") {
            setErrorInEmail("Email cannot be empty")
        }
        else {
            if (obj.password == "") {
                setErrorInPassword("Password cannot be empty")
            }

            else {
                if (obj.confirm_password == "") {
                    setErrorInConfirmPassword("Must re-type password to confirm password")
                }
                else {
                    if (obj.confirm_password == obj.password) {
                        if (users) {
                            let usermatched = users.find(user => user.email == obj.email)
                            console.log("usermatched", usermatched)
                            if (usermatched) {
                                setErrorInEmail("Email already registered")
                            }
                            else {
                                dispatch(addUser(obj));
                                //setRegisteredUsers([...registeredUsers]);
                                // localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
                                navigate("/");
                            }
                        }
                        else {
                            console.log("No users found")
                        }
                    }
                    else {
                        setErrorInPassword("Passwords do not match");
                        setErrorInConfirmPassword("Passwords do not match");
                    }

                }
            }
        }
    }

    // registeredUsers = localStorage.getItem("registeredUsers")
    // if (registeredUsers) {
    //     registeredUsers = JSON.parse(registeredUsers)
    // }
    // else {
    //registeredUsers = [];
    // }

    // let handleSignup = (event) => {
    //     event.preventDefault();
    //     console.log(registeredUsers)
    //     let obj = {
    //         email: event.target.email.value,
    //         password: event.target.password.value,
    //         confirm_password: event.target.confirm_password.value
    //     }
    //     if (obj.email == "") {
    //         setErrorInEmail("Email cannot be empty")
    //     }
    //     else {
    //         if (obj.password == "") {
    //             setErrorInPassword("Password cannot be empty")
    //         }

    //         else {
    //             if (obj.confirm_password == "") {
    //                 setErrorInConfirmPassword("Must re-type password to confirm password")
    //             }
    //             else {
    //                 if (obj.confirm_password == obj.password) {
    //                     let usermatched = registeredUsers.filter(user => user.email == obj.email)
    //                     if (usermatched) {
    //                         setErrorInEmail("Email already registered")
    //                     }
    //                     else {
    //                         registeredUsers.push(obj);
    //                         //setRegisteredUsers([...registeredUsers]);
    //                         //localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    //                         navigate("/");
    //                     }
    //                 }
    //                 else {
    //                     setErrorInPassword("Passwords do not match");
    //                     setErrorInConfirmPassword("Passwords do not match");
    //                 }

    //             }
    //         }
    //     }
    // }

    function reset_errors() {
        setErrorInEmail("");
        setErrorInPassword("");
    }

    return (
        <div>
            {console.log(users ? "true" : "false")}
            <section className="bg-white-50 dark:bg-white-900">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
                    <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                                Sign Up
                            </h1>
                            <form onSubmit={handleAddRegisteredUser} className="space-y-4 md:space-y-6" >
                                <div>
                                    <Input error={errorInEmail} simpleInputField={true} className={"focus:outline-none bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} id="email" type="email" name="email" placeholder="Email" />
                                </div>
                                <div>
                                    <Input error={errorInPassword} id="password" name="password" placeholder="Password" className={"focus:outline-none bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  dark:text-white"} divStyling="flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                                </div>
                                <div>
                                    <Input error={errorInConfirmPassword} id="confirm_password" name="confirm_password" placeholder="Confirm Password" className={"focus:outline-none bg-gray-50 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5  dark:text-white"} divStyling="flex items-center justify-center bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg  block w-full dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                                </div>

                                <Button className="w-full text-white bg-black hover:bg-black-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mt-1"
                                    type="submit"
                                    size="large"
                                    variant="primary"
                                    onClick={reset_errors}
                                    text="Signup"></Button>

                                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                                    Already have an account? <Link to={"/login"}><a href="#" className="font-medium text-primary hover:underline dark:text-primary">Log In</a></Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
