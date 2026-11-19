// =================================
// LINHA NOX - QUIZ INVESTIGATIVO
// =================================

document.addEventListener("DOMContentLoaded", function () {

    // Localiza os elementos do quiz no HTML
    const quiz = document.getElementById("quiz");

    // Se não houver quiz nesta página, encerra o código
    if (!quiz) return;

    const etapa = quiz.querySelector("span");
    const perguntaElemento = document.getElementById("quiz-pergunta");
    const opcoesElemento = document.getElementById("quiz-opcoes");
    const feedbackElemento = document.getElementById("quiz-feedback");

    // Perguntas e respostas do desafio
    const perguntas = [
        {
            pergunta: "Qual palavra foi encontrada na colônia perdida de Roanoke?",
            opcoes: ["CROATOAN", "ROANOKE", "JAMESTOWN"],
            correta: 0
        },
        {
            pergunta: "Em que condição o Mary Celeste foi encontrado?",
            opcoes: [
                "Abandonado, sem a tripulação",
                "Afundado no fundo do oceano",
                "Com todos os tripulantes a bordo"
            ],
            correta: 0
        },
        {
            pergunta: "O que torna o Manuscrito Voynich tão misterioso?",
            opcoes: [
                "Suas páginas estão em branco",
                "Sua escrita ainda não foi decifrada",
                "Ele não possui ilustrações"
            ],
            correta: 1
        }
    ];

    // Controla a pergunta atual e a pontuação
    let perguntaAtual = 0;
    let pontuacao = 0;

    // Mostra uma pergunta na tela
    function mostrarPergunta() {

        const atual = perguntas[perguntaAtual];

        etapa.textContent =
            `PERGUNTA ${perguntaAtual + 1} DE ${perguntas.length}`;

        perguntaElemento.textContent = atual.pergunta;

        feedbackElemento.textContent = "";
        opcoesElemento.innerHTML = "";

        atual.opcoes.forEach(function (opcao, indice) {

            const botao = document.createElement("button");

            botao.type = "button";
            botao.className = "botao opcao-quiz";
            botao.textContent = opcao;

            botao.addEventListener("click", function () {
                verificarResposta(indice);
            });

            opcoesElemento.appendChild(botao);
        });
    }

    // Verifica se a resposta escolhida está correta
    function verificarResposta(escolhida) {

        const atual = perguntas[perguntaAtual];
        const botoes = opcoesElemento.querySelectorAll("button");

        botoes.forEach(function (botao, indice) {

            botao.disabled = true;

            if (indice === atual.correta) {
                botao.style.borderColor = "var(--vermelho-claro)";
            }
        });

        if (escolhida === atual.correta) {

            pontuacao++;

            feedbackElemento.textContent =
                "Correto! Você conhece bem esse mistério.";

        } else {

            feedbackElemento.textContent =
                "Resposta incorreta. A resposta certa era: " +
                atual.opcoes[atual.correta] + ".";
        }

        // Cria o botão para avançar
        const proximo = document.createElement("button");

        proximo.type = "button";
        proximo.className = "botao";
        proximo.textContent =
            perguntaAtual === perguntas.length - 1
                ? "VER RESULTADO"
                : "PRÓXIMA PERGUNTA";

        proximo.style.marginTop = "20px";

        proximo.addEventListener("click", function () {

            perguntaAtual++;

            if (perguntaAtual < perguntas.length) {
                mostrarPergunta();
            } else {
                mostrarResultado();
            }
        });

        opcoesElemento.appendChild(proximo);
    }

    // Apresenta a pontuação final
    function mostrarResultado() {

        etapa.textContent = "DESAFIO CONCLUÍDO";

        perguntaElemento.textContent =
            `Você acertou ${pontuacao} de ${perguntas.length} perguntas!`;

        opcoesElemento.innerHTML = "";

        if (pontuacao === 3) {
            feedbackElemento.textContent =
                "Excelente! Você é um verdadeiro investigador!";
        } else if (pontuacao >= 1) {
            feedbackElemento.textContent =
                "Bom trabalho! Continue investigando os arquivos.";
        } else {
            feedbackElemento.textContent =
                "Que tal explorar as histórias e tentar novamente?";
        }

        // Botão para reiniciar o quiz
        const reiniciar = document.createElement("button");

        reiniciar.type = "button";
        reiniciar.className = "botao";
        reiniciar.textContent = "TENTAR NOVAMENTE";
        reiniciar.style.marginTop = "20px";

        reiniciar.addEventListener("click", function () {

            perguntaAtual = 0;
            pontuacao = 0;

            mostrarPergunta();
        });

        opcoesElemento.appendChild(reiniciar);
    }

    // Inicia o quiz
    mostrarPergunta();

});