import React from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";


const LoginGoogle = () => {

  // Função que será chamada quando o login for bem-sucedido
  const handleLoginSuccess = (response) => {
    // Decodificar o token JWT retornado pelo Google
    const userObject = jwtDecode(response.credential);
    console.log('User:', userObject);

    // Aqui você pode armazenar os dados do usuário em um estado global ou em um sistema de autenticação
  };

  // Função que será chamada quando houver falha no login
  const handleLoginFailure = (error) => {
    console.error('Login falhou:', error);
  };

  return (
    <GoogleOAuthProvider clientId="487635748207-o1g7dm9rts3hm478k7k7u1suaootkgcq.apps.googleusercontent.com">
      <div className="App">
        <h2>Login com Google</h2>
        
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginFailure}
          useOneTap
        />
      </div>
    </GoogleOAuthProvider>
  );
};

export default LoginGoogle;
