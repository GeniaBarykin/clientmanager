import { FC, useState, useContext } from "react";
import {Context} from "../index"
import { observer } from "mobx-react-lite";
import './LoginForm.css';

const LoginForm: FC = () =>{
    const [firstTime, setFirstTime] = useState<boolean>(false)
    const[login, setLogin] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [fio, setFio] = useState<string>('')
    const {store } = useContext(Context);
    return (
        <div className="login-main-div">
            <div>
            <input 
                onChange = {e => setLogin(e.target.value)}
                value={login}
                type="text"
                placeholder="Login"
            />
            <input 
                onChange = {e => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
            />
            </div>
            <div>
                {firstTime ? <div>
                    <input 
                    onChange = {e => setFio(e.target.value)}
                    value={fio}
                    type="fio"
                    placeholder="Фамилия Имя Отчество"
                    />
                    <button onClick={() => store.register(fio,login,password)}>
                    Зарегестрироваться
                    </button>
                    <button onClick={() => setFirstTime(false)}>
                    Залогиниться
                    </button>
                </div> : <div>
                    <button onClick={() => store.login(login,password)}>
                    Залогиниться
                    </button>
                    <button onClick={() => setFirstTime(true)}>
                    Зарегестрироваться
                    </button>
                </div>}
            </div>
        </div>
    )
}

export default observer(LoginForm);