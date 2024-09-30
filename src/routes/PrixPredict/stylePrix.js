import styled from "styled-components";

export const MainPrix = styled.main`
    width: 100%;
    font-family: "Rajdhani", sans-serif;

    



    .quebra{
        
        width: 100%; 
        margin: 0; 
        padding: 0; 
    }

    .como_funciona_titulo{ 
        padding-bottom: 60px;
        color: #00C0F9;
        text-align: center;
        font-family: "Rajdhani", sans-serif;
        font-size: 3rem;
        margin-top: 2rem;
        letter-spacing: 2px;
    }

    .como_funciona_container {
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 3rem;
        padding: 2rem;
        background-color: transparent;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        
    }

    .card {
        width: 100%;
        max-width: 800px;
        background-color: rgba(255, 255, 255, 0.8); /* Fundo transparente */
        border: 1px solid #00C0F9;
        border-radius: 10px;
        margin: 10px 0;
        padding: 1rem;
        cursor: pointer;
        transition: transform 0.3s ease, background-color 0.3s ease;
        overflow: hidden;
    }

    .card:hover {
        transform: scale(1.02); /* Expande ligeiramente ao passar o mouse */
    }

    .cardTitle {
        font-family: "Rajdhani", sans-serif;
        color: #00C0F9;
        font-size: 1.5rem;
    }

    .cardContent {
        font-family: "Rajdhani", sans-serif;
        color: #00A1D8; /* Variação da cor do título */
        font-size: 1rem;
        line-height: 1.6rem;
        margin-top: 1rem;
        height: 0;
        opacity: 0;
        transition: height 0.3s ease, opacity 0.3s ease;
    }

    .card.expanded .cardContent {
        height: auto;
        opacity: 1;
    }

    /* Estilização do título do pódio */
    .podio_title {
        
        padding-bottom: 20px;
        color: #00C0F9;
        font-family: "Rajdhani", sans-serif;
        font-size: 2.5rem;
        margin-bottom: 2rem;
        text-align: center; /* Centraliza o texto */
    }

    /* Estilização do pódio */
    .podio {
        display: flex;
        flex-wrap: wrap; /* Permite que as colocações se movam para uma nova linha */
        justify-content: center; /* Centraliza os elementos na linha */
        width: 100%;
        max-width: 100%; /* Ajusta para ocupar toda a largura */
        margin-top: 2rem; /* Adiciona margem superior para espaçamento */
    }

    /* Estilos para cada colocação */
    .placement {
        width: 20%; /* Largura reduzida para acomodar até 5 colocações lado a lado */
        height: 100px; /* Aumenta a altura do placement */
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 10px; /* Margem entre os placements */
        font-family: "Rajdhani", sans-serif;
        font-size: 1.5rem;
        color: white;
        border-radius: 10px;
        transition: transform 0.3s ease, background-color 0.3s ease;
        cursor: pointer;
        text-align: center;
        position: relative; /* Para o efeito do texto degradê */
        overflow: hidden; /* Para que o degradê do texto não extrapole */
    }

    /* Degradê para as colocações */
    .first {
        background: linear-gradient(45deg, #312c9f, #5753e3);
    }

    .second {
        background: linear-gradient(45deg, #4140a3, #6a69e4);
    }

    .third {
        background: linear-gradient(45deg, #5253a7, #7c7de5);
    }

    .fourth {
        background: linear-gradient(45deg, #6366ab, #8f90e7);
    }

    .fifth {
        background: linear-gradient(45deg, #7478af, #a1a2e9);
    }

    .sixth {
        background: linear-gradient(45deg, #858cbe, #b1b4e7);
    }

    .seventh {
        background: linear-gradient(45deg, #969fbf, #c2c6e8);
    }

    .eighth {
        background: linear-gradient(45deg, #a1b3d0, #d0d8f0);
    }

    .ninth {
        background: linear-gradient(45deg, #b1c5d5, #e0ebf5);
    }

    .tenth {
        background: linear-gradient(45deg, #c2d8e0, #f0f4f9);
    }

    /* Efeito hover para as colocações */
    .placement:hover {
        transform: scale(1.05);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Efeito de sombra ao passar o mouse */
    }

    /* Degradê no texto */
    .placement::after {
        content: attr(data-position); /* Utiliza o conteúdo do atributo data-position */
        position: absolute; /* Posiciona o texto sobre o fundo */
        top: 50%; /* Centraliza verticalmente */
        left: 50%; /* Centraliza horizontalmente */
        transform: translate(-50%, -50%); /* Ajusta para o centro */
        font-size: 1.5rem; /* Tamanho do texto */
        color: transparent; /* Faz o texto ficar invisível */
        background: linear-gradient(45deg, #00C0F9, #00A1D8); /* Degradê para o texto */
        -webkit-background-clip: text; /* Clipa o fundo para o texto */
        background-clip: text; /* Clipa o fundo para o texto */
        transition: color 0.3s ease; /* Transição suave para o efeito de hover */
    }

    .placement:hover::after {
        color: transparent; /* Mantém o texto invisível ao passar o mouse */
    }
    .view-full-list {
    background-color: #00C0F9; /* Cor de fundo */
    color: white; /* Cor do texto */
    padding: 10px 20px; /* Espaçamento interno */
    border: none; /* Sem borda */
    border-radius: 5px; /* Bordas arredondadas */
    cursor: pointer; /* Muda o cursor para indicar que é clicável */
    font-size: 1.2rem; /* Tamanho da fonte */
    margin: 20px auto; /* Margem superior e inferior */
    display: block; /* Faz com que o botão ocupe toda a linha */
    text-align: center; /* Centraliza o texto no botão */
}

.view-full-list:hover {
    background-color: #0094c4; /* Cor ao passar o mouse */
    transform: scale(1.05); /* Efeito de aumento ao passar o mouse */
    transition: background-color 0.3s ease, transform 0.3s ease; /* Transição suave */
}
.predictions {
    margin-top: 70px;
    display: flex;
    flex-wrap: wrap;
    gap: 20px; /* Espaçamento entre os cards */
    justify-content: center; /* Centraliza os cards na página */

  }

  .team-card {
    background-color: #f5f5f5; /* Cor de fundo do card */
    border: 1px solid #ccc; /* Borda do card */
    border-radius: 10px; /* Arredondamento dos cantos */
    padding: 15px; /* Espaçamento interno do card */
    width: 250px; /* Largura do card */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Sombra do card */
    transition: transform 0.2s; /* Efeito de transição ao passar o mouse */
    
    &:hover {
      transform: scale(1.05); /* Efeito de zoom ao passar o mouse */
    }
  }

  .team-logo img {
    max-width: 100%; /* A imagem se ajusta ao tamanho do card */
    border-radius: 10px; /* Arredondamento da imagem */
  }

  .team-info {
    text-align: center; /* Centraliza o texto */
    margin-top: 10px; /* Espaçamento acima do texto */
  }

  .bet-amount {
    width: 80%; /* Largura do input */
    padding: 8px; /* Espaçamento interno do input */
    margin-bottom: 10px; /* Espaçamento abaixo do input */
    border: 1px solid #ccc; /* Borda do input */
    border-radius: 5px; /* Arredondamento do input */
  }

  .yes, .no {
    padding: 10px 15px; /* Espaçamento interno dos botões */
    border: none; /* Remove a borda padrão */
    border-radius: 5px; /* Arredondamento dos botões */
    color: white; /* Cor do texto dos botões */
    cursor: pointer; /* Muda o cursor para pointer ao passar o mouse */
  }

  .yes {
    background-color: #4CAF50; /* Cor do botão "sim" */
  }

  .no {
    background-color: #f44336; /* Cor do botão "não" */
  }
  .predictions_title {
    margin-top: 80px;
    padding-bottom: 0px;
    color: #00C0F9;
    font-family: "Rajdhani", sans-serif;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: left;
`;


