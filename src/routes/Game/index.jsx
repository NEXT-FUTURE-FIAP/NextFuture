import React, { useEffect, useState } from 'react';
import './Game.css'; // Para estilos se necessário
import BannerGame from "../../assets/bGame.png"

const Game = () => {
  

  useEffect(() => {
    // Carregar o script do jogo
    const script = document.createElement('script');
    script.src = 'script.js'; // Caminho relativo para o script na mesma pasta
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
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
          <div id="upgrade-button" onClick={() => window.batteryUpgrade()}>
            <p>Melhorar bateria = <span id="battery">20</span></p>
          </div>
          <div id="upgrade-button" onClick={() => window.rechargeUpgrade()}>
            <p>Melhorar recarga = <span id="recharge">200</span></p>
          </div>
          <div id="upgrade-button" onClick={() => window.mudarSkin()}>
            <p id = "mudarSkin">Mudar aparência</p>
          </div>
          <div id="upgrade-button" onClick={() => window.money()}>
            <p id = "money">muito ponto </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Game;
