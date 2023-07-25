import { Link } from 'react-router-dom';
import AuthForm from './AuthForm';
import Header from './Header.js';

const Register = ({ handleSubmit, handleChange, formValue }) => {

  return (
    <>
      <Header enter={'/signin'} enterTitle={"Войти"} />
      <AuthForm handleSubmit={handleSubmit} handleChange={handleChange} formValue={formValue} title={"Регистрация"} buttonTitle={"Зарегистрироваться"} />
      <p className='autorization__question' >Уже зарегистрированы?<Link to={'/signin'} className='autorization__question'>Войти</Link></p>
    </>);
}

export default Register;