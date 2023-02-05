import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const LoginForm = (props) => {
    const navigate = useNavigate();
    const initialState = {
        email: "",
        password: ""
    };
    const [log, setLog] = useState(initialState);

    const handleInputChange = (e) => {
        setLog({
            ...log,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()
        axios.post('http://localhost:8000/api/login', log, { withCredentials: true })
            .then(res => {
                navigate("/")
            })
            .catch(err => { console.log(err.response) })
    }


    return (
        <div className="w-50 p-4 rounded mx-auto shadow">
            <h3>Login</h3>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label className="h6">Email:</label>
                    <input
                        name='email'
                        type="text"
                        className='form-control'
                        onChange={
                            handleInputChange
                        } value={log.email} />
                </div>
                <div className=" profile-pic form-group">
                    <label className="h6">Password:</label>
                    <input
                        name='password'
                        type="password"
                        className='form-control'
                        onChange={
                            handleInputChange
                        } value={log.password} />
                </div>
                <input type="submit" className='btn btn-dark btn-outline-success' />
            </form>

        </div>
    )



}

export default LoginForm;