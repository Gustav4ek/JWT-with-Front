import React, { FC, useEffect, useContext, useState } from "react";
import LoginForm from "./components/LoginForm";
import { Context } from "./index";
import { observer } from "mobx-react-lite";
import IUser from "../models/IUser";
import UserService from "./services/UserServise";

const App: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getUsers() {
    try {
      const response = await UserService.fetchUsers();
      setUsers(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  if (store.isLoading) {
    return <div className="loading-container">
      <div className="loading"></div>
      </div>;
  }

  if (!store.isAuth) {
    return (
      <div className="container">
        <LoginForm className="login-form" />
      </div>
    );
  }

  return (
    <div className="containerApp">
      <h1>
        {store.isAuth
          ? `Пользователь авторизован ${store.user.email}`
          : "Авторизуйтесь"}
      </h1>
      <h1>
        {store.user.isActivated
          ? `Почта подтверждена`
          : "Ссылка на подтверждение аккаунта отправлена на почту"}
      </h1>
      <button className="button logout-button" onClick={() => { store.logout() }}>
        Выйти
      </button>
      <div>
        <button className="button" id="btnGet" onClick={getUsers}>
          Получить список пользователей
        </button>
      </div>
      <div className="user-list">
        {users.map(user => (
          <div className="user-item" key={user.email}>
            {user.email}
          </div>
        ))}
      </div>
    </div>
  );
};

export default observer(App);