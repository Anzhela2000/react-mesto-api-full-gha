import Header from "./Header";
import React from 'react';
import AuthForm from "./AuthForm";

function Login({ handleSubmit, handleChange, formValue }) {

  return (
    <>
      <Header enter={'/signup'} enterTitle={'Регистрация'} />
      <AuthForm handleSubmit={handleSubmit} handleChange={handleChange} formValue={formValue} title={"Вход"} buttonTitle={"Войти"} />
    </>
  );
}

export default Login;