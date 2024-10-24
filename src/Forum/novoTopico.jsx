import React, { useState } from "react";
import { useParams } from "react-router-dom";

function NovoTopico() {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  let { id } = useParams();
  const user =localStorage.getItem("usuario")
  const userId = localStorage.getItem("id")
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const novoTopico = {
      id: id,  
      titulo:normalizeText(titulo),
      conteudo:normalizeText(conteudo),
      user: user,
      userId:userId, // Pegar o autor autenticado
      data: new Date().toISOString(),
      comentarios: []
    };
    const conteudoInvalido = ban.some((palavra) =>
        novoTopico.conteudo.includes(palavra) || novoTopico.titulo.includes(palavra)
      );

      if (conteudoInvalido) {
        alert("Palavras proibidas");
      }else{
        try{
            fetch("http://localhost:5000/topicos", {
                method: "POST",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(novoTopico)
            }).then(() => {
                setTitulo("");
                setConteudo("");
            });
            }catch(error){console.error(error)};
        }    
        
    }
        
  return (
    <form onSubmit={handleSubmit}>
      <h1>Criar Novo Tópico</h1>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        placeholder="Título"
        required
      />
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

export default NovoTopico;
