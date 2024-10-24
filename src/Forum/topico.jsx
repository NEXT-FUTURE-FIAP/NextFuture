import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Topico() {
  const { id } = useParams();
  const [topico, setTopico] = useState(null);


  useEffect(() => {
    fetch(`http://localhost:5000/topicos/${id}`)
      .then(res => res.json())
      .then(data => setTopico(data));
  }, [id]);

  if (!topico) return <p>Carregando...</p>;

  return (
    <div>
      <h1>{topico.titulo} dasdasd</h1>
      <p>{topico.conteudo}</p>
      <h2>Comentários</h2>
      <ul>
        {topico.comentarios.map(comentario => (
          <li key={comentario.id}>{comentario.conteudo}</li>
        ))}
      </ul>
      {sessionStorage.setItem("comentID", id)}
      <Link to={`/comentario/${id}`}>Adicionar Comentário</Link>
    </div>
  );
}

export default Topico;
