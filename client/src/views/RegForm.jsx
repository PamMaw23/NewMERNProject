import axios from 'axios'
const { useState } = require("react")



const RegForm = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const submitHandler = (e) => {
        e.preventDefault()
        const newUser = { firstname, lastname, email, password, confirmPassword }
        axios.post('http://localhost:8000/api/register', newUser, { withCredentials: true })
        .then(res => {
            console.log(res)
            setFirstName("")
            setLastName("")
            setEmail("")
            setPassword("")
            setConfirmPassword("")
        })
            .catch(err => { console.log(err) })
    }
    return (
        <div className="w-50 p-4 rounded mx-auto shadow">
            <h3>Register</h3>
            <form onSubmit={submitHandler}>
                <div className="=form-group">
                    <label className="h6">First Name:</label>
                    <input
                        type="text"
                        className='form-control'
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        } value={firstname} />
                </div>
                <div className="=form-group">
                    <label className="h6">Last Name:</label>
                    <input
                        type="text"
                        className='form-control'
                        onChange={(e) =>
                            setLastName(e.target.value)
                        } value={lastname} />
                </div>
                <div className="=form-group">
                    <label className="h6">Email:</label>
                    <input
                        type="text"
                        className='form-control'
                        onChange={(e) =>
                            setEmail(e.target.value)
                        } value={email} />
                </div>
                <div className="=form-group">
                    <label className="h6">Password:</label>
                    <input
                        type="password"
                        className='form-control'
                        onChange={(e) =>
                            setPassword(e.target.value)
                        } value={password} />
                </div>
                <div className="=form-group">
                    <label className="h6">Confirm Password:</label>
                    <input
                        type="password"
                        className='form-control'
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        } value={confirmPassword} />
                </div>
                <input type="submit" className='btn btn-dark btn-outline-success' />
            </form>
        </div>
        
            )

}

export default RegForm;