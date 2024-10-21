import React, { useRef, useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"
import { useNavigate, useParams } from 'react-router-dom';

const LoginGoogle = () => {
  const navigate = useNavigate();
  let {id} =useParams();
  const usuario = useRef();
  // Estado para armazenar informações do usuário
  const [usuarios, setUsuarios] = useState({
    id: '',
    usuario: '',
    email: '',
    senha: '',
    points: usuario.points
  });

  function validar(){
    for( let  i=0; i <usuarios.length;i++){
        if(
            usuarios[i].usuario == usuario.current.value
        )
        return true
    }
}

  // Função para salvar o usuário no json-server
  const salvarUsuarioNoJsonServer = async (novoUsuario) => {
    try {
      const response = await fetch("http://localhost:5000/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(novoUsuario)
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar o usuário no servidor");
      }

      console.log("Usuário salvo com sucesso no json-server:", novoUsuario);
    } catch (error) {
      console.error("Erro ao salvar no json-server:", error);
    }
  };

  // Função que será chamada quando o login for bem-sucedido
  const handleLoginSuccess = async (response) => {
    if(validar){
      // Decodificar o token JWT retornado pelo Google
      const userObject = jwtDecode(response.credential);
      console.log('User:', userObject);

      // Armazenando os dados do usuário no localStorage
      localStorage.setItem("usuario", userObject.name);
      localStorage.setItem("id", userObject.sub); // ID único do Google para o usuário

      // Redirecionar para a página principal (ou outra página desejada)
      navigate("/");} else{
        const novoUsuario = {
          id: id, // ID único do Google
          usuario: userObject.name,
          email: userObject.email,
          senha: '', // Inicialmente vazio, pode ser definido de outra forma se necessário
          points: usuario.points // Inicialmente vazio
        };
  
        // Atualizando o estado de "usuarios"
        setUsuarios(novoUsuario);
  
        // Salvando no servidor diretamente os dados decodificados
        await salvarUsuarioNoJsonServer(novoUsuario);

      }
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
