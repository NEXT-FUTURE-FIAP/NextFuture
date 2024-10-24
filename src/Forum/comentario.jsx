import React, { useState } from "react";
import { useParams } from "react-router-dom";

function Comentario() {
    
    const ban= ["coisa", "coisa2"]
    const normalizeText = (text) => {
        return text
          .toLowerCase() // Converte para minúsculas
          .normalize("NFD") // Normaliza o texto, decompondo acentos
          .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
          .replace(/4/g, "a") // Substitui o número 4 por "a"
          .replace(/3/g, "e") // Substitui o número 3 por "e"
          .replace(/1/g, "i") // Substitui o número 1 por "i"
          .replace(/0/g, "o") // Substitui o número 0 por "o"
          .replace(/[^a-zA-Z0-9\s]/g, ""); // Remove caracteres especiais
      };

  const [conteudo, setConteudo] = useState("");
  let { id } = useParams();
  const idTopico = sessionStorage.getItem("topicID")
  const user =localStorage.getItem("usuario")
  const userId = localStorage.getItem("id") 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const comentario = {
      id:id,  // ou outra forma de gerar um ID único
      conteudo:normalizeText(conteudo),
      user: user,
      userId: userId, // Ajustar para o usuário autenticado
      data: new Date().toISOString(),
    };
  
    const conteudoInvalido = ban.some((palavra) =>
        comentario.conteudo.includes(palavra)
      );
    if(conteudoInvalido){
        alert("Palavras proibidas")
   }else{
     try {
      const response = await fetch(`http://localhost:5000/topicos/${idTopico}`);
      const topico = await response.json();
  
      const novosComentarios = [...topico.comentarios, comentario]; // Adiciona o novo comentário ao array existente
  
      await fetch(`http://localhost:5000/topicos/${idTopico}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          comentarios: novosComentarios  // Atualiza o array de comentários no tópico
        })
      });
  
      setConteudo(""); // Limpa o campo de conteúdo após enviar
        } catch (error) {
      console.error("Er}ro ao enviar o comentário:", error);
            }
    };
    }
  return (
    <form onSubmit={handleSubmit}>
      <h1>Criar comentario</h1>
      <textarea
        value={conteudo}
        onChange={(e) => setConteudo(e.target.value)}
        placeholder="Conteúdo"
        required
      />
      <button type="submit">Criar</button>
    </form>
  );
}

export default Comentario;
