import React, { useEffect, useState } from 'react';
import './Game.css'; // Para estilos se necessário
import BannerGame from "../../assets/bGame.png"

const Game = () => {
  const [points, setPoints] = useState(0);
  const userName= localStorage.getItem("usuario") // Exemplo de ID do usuário a ser atualizado

  // Função para atualizar os pontos no arquivo JSON
  const updatePointsInJson = async (newPoints) => {
    try {
        // Buscar o usuário pelo nome usando query params
        const response = await fetch(`http://localhost:5000/usuarios?usuario=${userName}`);
        const data = await response.json();

        // Verificar se o usuário foi encontrado
        if (data.length > 0) {
            const user = data[0]; // Pega o primeiro usuário encontrado com o nome
            user.points = newPoints || user.points;

            // Fazer a requisição PUT para atualizar o usuário
            await fetch(`http://localhost:5000/usuarios/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });

            // console.log(`Pontos atualizados para o usuário ${userName}: ${user.points}`);
        } else {
            alert('Usuário não encontrado');
        }
    } catch (error) {
        console.error('Erro ao atualizar pontos no JSON:', error);
    }
};

  // Função chamada quando os pontos forem atualizados no jogo
  const handlePointsUpdate = (newPoints) => {
    setPoints(newPoints);
    updatePointsInJson(newPoints); // Atualiza os pontos no backend
  };

  useEffect(() => {
    // Carregar o script do jogo
    const script = document.createElement('script');
    script.src = 'script.js'; // Caminho relativo para o script na mesma pasta
    script.async = true;
    document.body.appendChild(script);

    // Simulação de atualização de pontos a partir do script do jogo
    const interval = setInterval(() => {
      const pointsFromGame = parseFloat(document.getElementById('points').textContent);
      handlePointsUpdate(pointsFromGame);
    }, 5000); // Atualiza a cada 5 segundos (exemplo)

    return () => {
      // Remover o script ao desmontar o componente
      document.body.removeChild(script);
      clearInterval(interval); // Limpa o intervalo ao desmontar o componente
    };
  }, []);

  return (
    <main>
      <img id='bannerimg' src={BannerGame} alt="" />
      <div id="game-container">
        <canvas id="game-canvas" width="1486" height="849"></canvas>
        <div id="controls">
          <div id="points-container">
            <p>
              Pontos: <span id="points">0</span>
              <img src="pontos.png" alt="Icone Pontos" id="pointsIcon" />
            </p>
          </div>
          <div id="upgrade-button" onClick={() => window.motorUpgrade()}>
            <p>Melhorar motor = <span id="motor">10</span></p>
          </div>
          <div id="upgrade-button" onClick={() => window.bateiraUpgrade()}>
            <p>Melhorar bateria = <span id="bateria">20</span></p>
          </div>
          <div id="upgrade-button" onClick={() => window.recargaUpgrade()}>
            <p>Melhorar recarga = <span id="recarga">200</span></p>
          </div>
          <div id="upgrade-button" onClick={() => window.mudarSkin()}>
            <p>Mudar aparência</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Game;
