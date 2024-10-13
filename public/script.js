if (typeof window.gameInitialized === "undefined") {
    window.gameInitialized = true; // Marca o jogo como inicializado

    const usuarioAtual = localStorage.getItem("usuario");
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
        powerOn:false,
        power:1.1,
        rechargingPower:false,
        direction: 3 // Começa voltado para baixo
    };
    let up_price = {
        motorPrice: 10,
        efficiencyPrice: 20,
        batteryPrice: 20,
        rechargePrice: 200,
        timeOffPrice: 200,
        trackPrice: 2000,
        powerUpgradePrice:5000,
        powerReUpgradePrice:4000,
        powerTeUpgradePrice:3000
    };

    window.up = {
        battery: 0,
        efficiency: 0,
        motor: 0,
        powerUpgrade: 0,
        recharge: 0,
        timeOff: 0,
        track: 0,
    };

    let track = {
        track:1,
        timeOff:24

    }

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
    let powerRecharge = 25000
    let powerTime = 5000
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

    function formatNumber(value) {
        if (value >= 1e9) {
            return (value / 1e9).toFixed(1) + 'B';  // Bilhões
        } else if (value >= 1e6) {
            return (value / 1e6).toFixed(1) + 'M';  // Milhões
        } else if (value >= 1e3) {
            return (value / 1e3).toFixed(1) + 'K';  // Milhares
        } else {
            return value.toFixed(2);  // Mantém o número como está
        }
    }
    

    // Função para carregar o usuário do JSON
    function loadUserData() {
        return fetch('/dados.json')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Erro na requisição: ' + response.status);
                }
                return response.json();
            })
            .then((data) => {
                const usuario = data.usuarios.find(user => user.usuario === usuarioAtual);
                if (usuario) {
                    // Carregar pontos e upgrades
                    car.points = usuario.points || 0;
                    const upgradeKeys = Object.keys(usuario.upgrades); // Pega as chaves de usuario.upgrades

                    // Atualizar valores de window.up
                    upgradeKeys.forEach(key => {
                        window.up[key] = usuario.upgrades[key] || 0;
                    });
                    
                    // Ajustar os preços dos upgrades com base nos valores já comprados
                    upgradeKeys.forEach(key => {
                        const priceKey = `${key}Price`; // Gera o nome da chave de preço correspondente
                        if (up_price[priceKey]) {
                            up_price[priceKey] *= Math.pow(1.20, window.up[key]);
                            document.getElementById(`${key}`).innerText = formatNumber(up_price[priceKey]);

                        }
                    });
                    
                    upgradeKeys.forEach(upgradeKey => {
                        for (let i = 0; i < window.up[upgradeKey]; i++) {
                            upgradeEffect(upgradeKey); // Aplica o efeito acumulado para cada nível de upgrade
                        }
                    });
    
    
                    pointsElement.innerText = formatNumber(car.points); // Atualiza o elemento HTML com os pontos
    
                    console.log('Dados carregados:', usuario);
                } else {
                    console.error('Usuário não encontrado, iniciando com valores padrão.');
                }
            })
            .catch((error) => {
                console.error('Erro ao carregar dados do usuário:', error);
            });
    }
    // Função para salvar dados do usuário no JSON
    function saveUserData() {
        // Primeiro, buscar o usuário atual no servidor
        
        fetch(`http://localhost:5000/usuarios?usuario=${usuarioAtual}`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    // Se o usuário existir, atualize os dados
                    const usuario = data[0];  // Como o servidor retorna uma array, o primeiro item é o usuário encontrado
    
                    // Atualizar os dados de pontos e upgrades
                    usuario.points = car.points;
                    usuario.upgrades = window.up;

    
                    // Fazer a requisição PUT para atualizar o usuário no servidor
                    fetch(`http://localhost:5000/usuarios/${usuario.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(usuario)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao salvar dados do usuário');
                        }
                        return response.json();
                    })
                    // .then(updatedUser => {
                    //     console.log('Dados do usuário atualizados com sucesso:', updatedUser);
                    // })
                    .catch(error => {
                        console.error('Erro ao salvar dados do usuário:', error);
                    });
    
                } else {
                    // Se o usuário não existir, criar um novo usuário
                    const newUser = {
                        usuario: usuarioAtual,
                        points: car.points,
                        upgrades: window.up
                    };
    
                    // Fazer a requisição POST para criar o novo usuário
                    fetch('http://localhost:5000/usuarios', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newUser)
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error('Erro ao criar novo usuário');
                        }
                        return response.json();
                    })
                    .then(createdUser => {
                        console.log('Novo usuário criado com sucesso:', createdUser);
                    })
                    .catch(error => {
                        console.error('Erro ao criar novo usuário:', error);
                    });
                }
            })
            .catch(error => {
                console.error('Erro ao buscar dados do usuário:', error);
            });
    }

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
    function turbo() {
        // console.log(car.powerOn)
        // console.log(car.rechargingPower)
        if (!car.powerOn && !car.rechargingPower) {  // Impede ativar o turbo se já estiver ligado
            car.powerOn = true;
            car.rechargingPower = true
            console.log(car.speed)
    
            // Armazena a velocidade original do carro
            const originalSpeed = car.speed;
    
            // Aumenta a velocidade do carro instantaneamente
            car.speed = car.speed * car.power;
    
            // Restaura a velocidade original após o tempo definido
            setTimeout(() => {
                car.speed = originalSpeed;  // Restaura a velocidade original
                car.powerOn = false;  // Desativa o turbo
                console.log("Turbo desativado. Velocidade restaurada:", car.speed);

                setTimeout(() => {
                    car.rechargingPower = false;  // Recarga concluída, turbo pode ser usado novamente
                    console.log("Turbo recarregado e pronto para uso.");
                }, powerRecharge); 
            }, powerTime);
        }
    }

 // Função upgrade geral (mesma lógica)
function upgrade(stat, priceKey) {
    const price = up_price[priceKey];

    if (car.points >= price) {
        car.points -= price; // Deduz os pontos
        window.up[stat] += 1; // Incrementa o nível do upgrade
        up_price[priceKey] *= 1.20; // Aumenta o preço para o próximo upgrade
        document.getElementById(stat).innerText = formatNumber(up_price[priceKey]);
        document.getElementById('points').innerText = formatNumber(car.points);
        
        upgradeEffect(stat); // Aplica o efeito específico do upgrade
        saveUserData(); // Salva os dados atualizados
    }
}


// Função upgradeEffect (permanecendo a mesma)
function upgradeEffect(upgradeKey) {
    switch (upgradeKey) {
        case 'motor':
            car.speed += 1;
            break;
        case 'battery':
            car.battery += 1;
            car.maxbattery = car.battery;
            break;
        case 'efficiency':
            car.efficiency *= Math.pow(1.2, window.up.efficiency);
            break;
        case 'recharge':
            recharge *= 0.95;
            break;
        case 'track':
            track.track += 1;
            up_price.trackPrice *= 1.6667;
            document.getElementById("track").innerText = formatNumber(up_price.trackPrice);
            break;
        case 'timeOff':
            track.timeOff += 1;
            break;
        case 'powerUpgrade':
            car.power *= 1.1;
            break;
        case 'powerTeUpgrade':
            powerTime *= 1.1;
            break;
        case 'powerReUpgrade':
            powerRecharge *= 0.975;
            break;
        default:
            console.log(`Upgrade não reconhecido: ${upgradeKey}`);
    }
}

    function mudarSkin() {
        currentCarImageIndex = (currentCarImageIndex + 1) % carImages.length;
    }
    function power() {
        turbo()
    }
    function money(){
        car.points +=10000000
    }
    function stat0(){
        window.up = window.up*0
    }
    // Função principal para atualizar o jogo
    let saveTimer;
    let saveInterval = 100; 
    function updateGame() {
        console.log(car.speed)
        // console.log(powerTime)
        // console.log(powerRecharge)
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


