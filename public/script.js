if (typeof window.gameInitialized === "undefined") {
    window.gameInitialized = true; // Marca o jogo como inicializado
    
    const usuarioAtual = localStorage.getItem("usuario")
    const pointsElement = document.getElementById('points');

    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');

    const trackImg = new Image();
    trackImg.src = 'pista.png';  // Caminho da imagem da pista

    const carImages = [
        'carro.png',
        'carro2.png',
        'carro3.png'
    ];

    // Ajuste as coordenadas dos pontos do caminho (path) para porcentagens
    const path = [
        { x: 0.99, y: 0.89 },  // Ponto inicial (parte de baixo à direita)
        { x: 0.013, y: 0.89 },  // Mover-se para a esquerda na parte inferior
        { x: 0.013, y: 0.001 }, // Subir pelo lado esquerdo
        { x: 0.955, y: 0.001 },  // Mover-se para a direita na parte superior
        { x: 0.955, y: 0.89 },   // Descer pelo lado direito
    ];

    let currentCarImageIndex = 0;
    let up_price = {
        motorPrice: 10,
        efficiencyPrice: 20,
        batteryPrice: 20,
        rechargePrice: 200,
        timeOffPrice: 200,
        trackPrice: 2000
    };

    window.up = {
        battery: 0,
        efficiency: 0,
        motor: 0,
        power: 0,
        recharge: 0,
        timeOff: 0,
        track: 0,
    };

    let car = {
        x: canvas.width * 0.54,
        y: canvas.height * 0.89,
        width: 50,
        height: 100,
        speed: 10,
        points: 0, // Inicializado para 0
        laps: 0,
        battery: 1.5,
        efficiency: 1,
        maxbattery: 2.5,
        direction: 3 // Começa voltado para baixo
    };
    if (typeof window.lastSavedPoints === "undefined") {
        window.lastSavedPoints = 0;  // Inicializa com 0 se ainda não foi definido
    }

    if (typeof window.lastSavedUpgrades === "undefined") {
        window.lastSavedUpgrades = JSON.stringify({
            battery: 0,
            efficiency: 0,
            motor: 0,
            power: 0,
            recharge: 0,
            timeOff: 0,
            track: 0,
        }); // Inicializa com o estado inicial dos upgrades
    }

    let pause = false;
    let recharge = 5000;
    let currentTargetIndex = 1;
    function drawCar() {
        const carImg = new Image();
        carImg.src = carImages[currentCarImageIndex]; // Carrega a imagem do carro
        ctx.save();
        ctx.translate(car.x + car.width / 2, car.y + car.height / 2);
        ctx.rotate(car.direction * Math.PI / 2);
        ctx.drawImage(carImg, -car.width / 2, -car.height / 2, car.width, car.height);
        ctx.restore();
    }
    window.point ={
        points: car.points
    }

    fetch('/dados.json')
    .then((response) => {
      if (!response.ok) {
        throw new Error('Erro ao carregar o arquivo JSON');
      }
      return response.json();
    })
    .then((data) => {
      // 3. Encontrar o usuário no JSON usando o nome salvo no localStorage
      const usuario = data.usuarios.find(user => user.usuario === usuarioAtual);

      if (usuario) {
        // Aqui você pode fazer algo com o usuário, como atualizar os pontos
         // Exemplo de incremento de pontos
        car.points = usuario.points
        console.log('Pontos atualizados:', usuario.points);
      } else {
        alert('Usuário não encontrado');
      }
    })
    .catch((error) => {
      console.error('Erro:', error);
    });


    function drawTrack() {
        ctx.drawImage(trackImg, 0, 0, canvas.width, canvas.height);
    }

    function pos() {
        const target = {
            x: path[currentTargetIndex].x * canvas.width,
            y: path[currentTargetIndex].y * canvas.height,
        };

        const dx = target.x - car.x;
        const dy = target.y - car.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        return [target, dx, dy, distance];
    }

    function move() {
        let [target, dx, dy, distance] = pos();
        if (distance < car.speed) {
            car.x = target.x;
            car.y = target.y;
            currentTargetIndex++;
            if (currentTargetIndex >= path.length) {
                currentTargetIndex = 1; // Reinicia o caminho (ignora o ponto inicial)
            }

            const nextTarget = {
                x: path[currentTargetIndex].x * canvas.width,
                y: path[currentTargetIndex].y * canvas.height,
            };
            if (nextTarget.y < car.y) {
                car.direction = 0; // Up
            } else if (nextTarget.x > car.x) {
                car.direction = 1; // Right
            } else if (nextTarget.y > car.y) {
                car.direction = 2; // Down
            } else if (nextTarget.x < car.x) {
                car.direction = 3; // Left
            }
        } else {
            car.x += (dx / distance) * car.speed;
            car.y += (dy / distance) * car.speed;
        }

        if (Math.abs(car.x - canvas.width * 0.54) < 10 && Math.abs(car.y - canvas.height * 0.9) < 10) {
            car.points += 0.5;
            car.battery -= 0.5;
            pointsElement.innerText = formatNumber(car.points);
            if (car.battery === 0) {
                pitStop();
            }
        }
    }

    function pitStop() {
        pause = true;
        setTimeout(() => {
            car.battery = car.maxbattery * car.efficiency;
            pause = false;  // Despausa o carro
        }, recharge);
    }
    function upgrade(stat, priceKey, upgradeEffect) {
        const price = up_price[priceKey];
        
        if (car.points >= price) {
            car.points -= price;
            window.up[stat] += 1;
            up_price[priceKey] *= 1.20; // Multiplica o preço para a próxima compra
            document.getElementById(stat).innerText = formatNumber(up_price[priceKey]);
            document.getElementById('points').innerText = formatNumber(car.points);
            
            upgradeEffect(); // Executa o efeito específico do upgrade
            saveUserData(); // Salva os dados após uma compra
        }
    }

    function motorUpgrade() {
        upgrade('motor', 'motorPrice', () => {
            car.speed += 1;
        });
    }
    
    function batteryUpgrade() {
        upgrade('battery', 'batteryPrice', () => {
            car.battery += 1;
            car.maxbattery = car.battery; // Atualiza o valor máximo da battery
        });
    }
    
    function rechargeUpgrade() {
        upgrade('recharge', 'rechargePrice', () => {
            recharge *= 0.95; // Reduz o tempo de recharge

        });
    }
    

    function mudarSkin() {
        currentCarImageIndex = (currentCarImageIndex + 1) % carImages.length;
    }
    function money(){
        car.points +=10000000
    }
    // Função principal para atualizar o jogo
    let saveTimer;
    let saveInterval = 100; 
    function updateGame() {
        console.log(recharge)
        if (!pause) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawTrack();
            move();
        }
        if (car.points !== window.lastSavedPoints || JSON.stringify(window.up) !== window.lastSavedUpgrades) {
            window.lastSavedPoints = car.points;  // Atualiza os últimos pontos salvos
            window.lastSavedUpgrades = JSON.stringify(window.up);  // Atualiza os últimos upgrades salvos

            // Se já houver um timer ativo, limpa-o antes de criar um novo
            if (saveTimer) {
                clearTimeout(saveTimer);
            }

            // Define um novo timer para salvar os dados após o intervalo
            saveTimer = setTimeout(() => {
                saveUserData();
            }, saveInterval);
        }
        drawCar()

        requestAnimationFrame(updateGame);
    }

    // Iniciar o jogo quando a imagem da pista estiver carregada
    trackImg.onload = () => {
        loadUserData()
        updateGame();
    };
    // Adicionando os event listeners para os botões de upgrade

    // Salvar os dados automaticamente antes de sair da página
    window.addEventListener('beforeunload', () => {
        saveUserData();
    });
}

