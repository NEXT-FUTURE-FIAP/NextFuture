import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Forum() {
  const [topicos, setTopicos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/topicos")
      .then(res => res.json())
      .then(data => setTopicos(data));
        
    }, []);

  return (
    <div>
      <h1>Fórum</h1>
      <ul>
        {topicos.map(topico => (
          <li key={topico.id}>
            {sessionStorage.setItem("topicID", topico.id)}
            <Link to={`/topico/${topico.id}`}>{topico.titulo}</Link>
          </li>
        ))}
      </ul>
      <Link to="/novotopico">Criar Novo Tópico</Link>
    </div>
  );
}

export default Forum;
