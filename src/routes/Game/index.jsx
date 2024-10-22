import React, { useEffect, useState } from 'react';
import { MainGame } from './styledGame';

const Game = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  useEffect(() => {
    // Verifica se o jogo já foi iniciado
    const gameStarted = localStorage.getItem('gameStarted') === 'true';
    setIsGameStarted(gameStarted);

    // Carregar o script do jogo
    const script = document.createElement('script');
    script.src = 'script.js';
    script.async = true;
    document.body.appendChild(script);

    const canvas = document.getElementById('game-canvas-id');

    // Função para ajustar a resolução interna do canvas
    const resizeCanvas = () => {
      const { offsetWidth, offsetHeight } = canvas;
      // Define a resolução interna do canvas para corresponder ao tamanho exibido
      canvas.width = offsetWidth;
      canvas.height = offsetHeight;
    };

    // Chama a função de ajuste ao carregar e em cada resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      document.body.removeChild(script);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const handleStartGame = () => {
    localStorage.setItem('gameStarted', 'true');
    window.location.reload();
  };

  return (
   <MainGame> 
          <div className="game-container" >
        <canvas className="game-canvas" id="game-canvas-id"></canvas>
        <div className="controls">
          {!isGameStarted && (
            <div className="upgrade-button" onClick={handleStartGame}>
              <p>Start</p>
            </div>
          )}
          {isGameStarted && (// começou
            <>
              <div className="points-container">
                <p>
                  Pontos: <span id="points">0</span>
                  <img src="pontos.png" alt="Icone Pontos" className="pointsIcon" />
                </p>
              </div>
              <div className="upgrade-button" onClick={() => upgrade('motor', 'motorPrice')}>
                <p>Melhorar motor = <span id="motor">10</span></p>
              </div>
              <div className="upgrade-button" onClick={() => upgrade('battery', 'batteryPrice')}>
                <p>Melhorar battery = <span id="battery">10</span></p>
              </div>
              <div className="upgrade-button" onClick={() => upgrade('recharge', 'rechargePrice')}>
                <p>Melhorar recharge = <span id="recharge">10</span></p>
              </div>
              <div className="upgrade-button" onClick={() => upgrade('efficiency', 'efficiencyPrice')}>
                <p>Melhorar efficiency = <span id="efficiency">10</span></p>
              </div>
              <div className="upgrade-button" onClick={() => upgrade('track', 'trackPrice')}>
                <p>Melhorar track = <span id="track">10</span></p>
              </div>
              <div className="upgrade-button" onClick={() => upgrade('timeOff', 'timeOffPrice')}>
                <p>Melhorar timeOff = <span id="timeOff">10</span></p>
              </div>
              <div className="upgrade-button" onClick={() => upgrade('powerUpgrade', 'powerUpgradePrice')}>
                <p>Melhorar powerUpgrade = <span id="powerUpgrade">10</span></p>
              </div>
              <div className="upgrade-button" onClick={() => upgrade('powerTeUpgrade', 'powerTeUpgradePrice')}>
                <p>Melhorar powerTeUpgrade = <span id="powerTeUpgrade">10</span></p>
              </div>
              <div className="upgrade-button" onClick={() => upgrade('powerReUpgrade', 'powerReUpgradePrice')}>
                <p>Melhorar powerReUpgrade = <span id="powerReUpgrade">10</span></p>
              </div>
              <div className="upgrade-button" onClick={() => window.power()}>
                <p>Turbo</p>
              </div>
              <div className="upgrade-button" onClick={() => window.changeSkin()}>
                <p>Mudar aparência</p>
              </div>
              <div className="upgrade-button" onClick={() => window.changeTrack()}>
                <p>Mudar pista</p>
              </div>
              <div className="upgrade-button" onClick={() => window.money()}>
                <p>Muito ponto</p>
              </div>
              <div className="upgrade-button" onClick={() => window.stat0()}>
                <p>Rest</p>
              </div>
            </>
          )}
        </div>
      </div>
  </MainGame>   
  );
};

export default Game;
