import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './components/LoginForm';
import { Context } from './index';
import { observer } from 'mobx-react-lite';
import { Client } from './models/Client';
import ClientService from './services/ClientService';

function App() {
  const {store} = useContext(Context);
  const [clients, setClients] = useState <Client[]>([])
  useEffect(()=> {
    if (localStorage.getItem('token')){
      store.checkAuth()
    }
  },[])

  if (store.isLoading){
    return <img src={logo} className="App-logo" alt="logo" />
  }
  if (!store.isAuth) {
    return (
      <LoginForm/>
    )
  } else {
    getClients(store.user.fio)
  }

  async function getClients(fio_responsible: string){
    try {
      const response = await ClientService.fetchClients(fio_responsible);
      setClients(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  async function changeStatus(nomer_scheta: number, status: number, fio_responsible: string){
    try {
      const response = await ClientService.changeStatus(nomer_scheta, status, fio_responsible);
      setClients(response.data)
    } catch (error) {
      console.log(error)
    }
  }

function showStatus(status: number) : string {
  if (status===0){
    return "В работе"
  } else if (status===1){
    return "Отказ"
  } else if (status===2){
    return "Сделка закрыта"
  } else {
    return "Ошибка"
  }

}

  return (
    <div className="App">
      <h1>{store.isAuth ? `Привет ${store.user.fio}` : "Не залогинен" }</h1>
      <button onClick={() => store.logout()}>Выйти</button>
      {clients.map((client: Client) => 
        <div className="client-table-div" key={client.nomer_scheta}>
          <table className="client-table">
            <tr>
              <td>Имя </td>
              <td>{client.imya}</td>
            </tr>
            <tr>
              <td>Фамилия:  </td>
              <td>{client.familiya} </td>
            </tr>
            <tr>
              <td>Отчество:  </td>
              <td>{client.otchestvo} </td>
            </tr>
            <tr>
              <td>Дата рождения:  </td>
              <td>{client.dateofbirth} </td>
            </tr>
            <tr>
              <td>Инн:  </td>
              <td>{client.inn} </td>
            </tr>
            <tr>
              <td>Ответственный:  </td>
              <td>{client.fio_responsible} </td>
            </tr>
            <tr>
              <td>Статус:  </td>
              <td>{showStatus(client.status)} <br/>
                <button onClick={() => changeStatus(client.nomer_scheta,0,store.user.fio)}>
                  В работе
                  </button> 
                <button onClick={() => changeStatus(client.nomer_scheta,1,store.user.fio)}>
                  Отказ
                </button>
                <button onClick={() => changeStatus(client.nomer_scheta,2,store.user.fio)}>
                  Сделка закрыта
                </button> </td>
            </tr>
          </table>
        </div>)}
    </div>
  );
}

export default observer(App);
