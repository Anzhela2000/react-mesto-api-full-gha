
export default function AuthForm({ handleSubmit, handleChange, formValue, title, buttonTitle }) {

  return (
    <>
      <main className="main">
        <section className="authorization">
          <h1 className="authorization__title">{title}</h1>
          <form className="autorization__form" onSubmit={handleSubmit}>
            <input className="autorization__input autorization__input_type_email" name="email" onChange={handleChange} value={formValue.email} type="Email" placeholder="Email" />
            <input className="autorization__input autorization__input_type_email" name="password" onChange={handleChange} value={formValue.password} type="password" placeholder="Пароль" />
            <button className="autorization__button" >{buttonTitle}</button>
          </form>
        </section>
      </main>
    </>
  );
}