import { useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Registration = () =>{

    // const navigate = useNavigate();
    const [values, setValues] = useState({
        fio:'',
        login: '',
        password: ''
    })
    const handleSubmit = (e) =>{
        e.preventDefault();
        axios.post('http://localhost:8081/api/registration', values)
        .then(res => {
            // localStorage.setItem("secret-key", res.data.token);
            // console.log(11,localStorage.getItem('secret-key'))
            // navigate("/home");
        })
        .then(err => console.log(err))
    }
    return <div>
        <form onSubmit={handleSubmit}>
        <label>FIO</label>
        <input type="text" onChange={e => setValues({...values, fio: e.target.value})}></input>
        <label>Login</label>
        <input type="text" onChange={e => setValues({...values, login: e.target.value})}></input>
        <label>Password</label>
        <input type="password" onChange={e => setValues({...values, password: e.target.value})}></input>
        <button>Register</button>
        </form>
    </div>
}