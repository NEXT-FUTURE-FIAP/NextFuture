import { useRef, useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import { SecLogin } from './styleLogon';
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const usuario = useRef();
    const senha = useRef();
    const [usuarios, setUsuarios] = useState([]);
    const [alertMessage, setAlertMessage] = useState(''); // Estado para mensagem de alerta
    const navigate = useNavigate();

    function validar() {
        for (let i = 0; i < usuarios.length; i++) {
            if (
                usuarios[i].usuario === usuario.current.value &&
                usuarios[i].senha === senha.current.value
            ) {
                return true;
            }
        }
        return false; // Adicionei isso para garantir que a função sempre retorne um valor booleano
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validar()) {
            let token =
                Math.random().toString(16).substring(2) +
                Math.random().toString(16).substring(2);
            localStorage.setItem("usuario", usuario.current.value);
            localStorage.setItem("senha", token);
            navigate("/");
        } else {
            setAlertMessage("Usuário/senha inválidos"); // Define a mensagem de alerta
        }
    };

    useEffect(() => {
        fetch("http://localhost:5000/usuarios")
            .then((res) => res.json())
            .then((res) => {
                setUsuarios(res);
            });
    }, []);

    const handleLoginSuccess = (response) => {
        const userObject = jwtDecode(response.credential);
        console.log('User:', userObject);
    };

    const handleLoginFailure = (error) => {
        console.error('Login falhou:', error);
    };

    return (
        <SecLogin>
            <section className="container">
                <div className="container-login">
                    <div className="login">
                        <form className="login-form" onSubmit={handleSubmit}>
                            <span className="titulo-login">FAÇA SEU LOGIN</span>

                            <div className="w-input">
                                <input
                                    type="text"
                                    className="input-form"
                                    id="usuario"
                                    ref={usuario}
                                />
                                <span placeholder="usuario">user</span>
                            </div>

                            <div className="w-input">
                                <input
                                    type="password"
                                    className="input-form"
                                    id="senha"
                                    ref={senha}
                                />
                                <span placeholder="senha">password</span>
                            </div>

                            {alertMessage && ( // Renderiza o alerta se houver uma mensagem
                                <div style={{ color: 'red', marginTop: '10px', marginBottom: '10px' }}>
                                    {alertMessage}
                                </div>
                            )}

                            <div className="login-btn">
                                <button type="submit" className="login-form-btn">Login</button>
                            </div>

                            <ul className="uteis">
                                <li>
                                    <span className="texto1">Não possui Conta?</span>
                                    <Link to="/cadastro">Criar</Link>
                                </li>
                            </ul>
                            <GoogleOAuthProvider clientId="487635748207-o1g7dm9rts3hm478k7k7u1suaootkgcq.apps.googleusercontent.com">
                                    <div className="App">
                                        <GoogleLogin
                                            onSuccess={handleLoginSuccess}
                                            onError={handleLoginFailure}
                                            useOneTap
                                        />
                                    </div>
                            </GoogleOAuthProvider>
                        </form>
                    </div>
                </div>
            </section>
        </SecLogin>
    );
}

export default Login;
