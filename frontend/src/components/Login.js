import Header from "./Header";
import React from 'react';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as auth from '../utils/auth.js';
import AuthForm from "./AuthForm";
import InfoTooltip from "./InfoTooltip";

function Login({ handleSubmit, handleChange, formValue }) {

  return (
    <>
      <Header enter={'/sign-up'} enterTitle={'Регистрация'} />
      <AuthForm handleSubmit={handleSubmit} handleChange={handleChange} formValue={formValue} title={"Вход"} buttonTitle={"Войти"} />
    </>
  );
}

export default Login;