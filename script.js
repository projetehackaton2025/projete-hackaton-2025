// Scroll animado para menu
 document.querySelectorAll("nav ul li a").forEach(link => {
  link.addEventListener("click", function(event) {
    event.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth" });
  });
});

/********** QUIZ **********/
const quizData = [
  { question: "Qual seu principal objetivo agora?", options: ["Arrumar um emprego", "Melhorar estudos", "Aprender finanças", "Encontrar um mentor"] },
  { question: "Onde você sente mais dificuldade?", options: ["Currículo/Entrevista", "Organização de estudos", "Controle de dinheiro", "Falta de motivação"] },
  { question: "O que você mais gostaria de acessar?", options: ["Oficinas práticas", "Conteúdos educativos", "Mini-aulas de finanças", "Rede de oportunidades"] }
];

let currentQuestion = 0;
let answers = [];

const quizEl = document.getElementById("quiz");
const resultEl = document.getElementById("result");

function loadQuestion() {
  if (currentQuestion < quizData.length) {
    const q = quizData[currentQuestion];
    quizEl.innerHTML = `
      <div class="question">${q.question}</div>
      <div class="options">
        ${q.options.map(opt => `<button onclick="selectAnswer('${opt}')">${opt}</button>`).join("")}
      </div>
      <p>Pergunta ${currentQuestion+1} de ${quizData.length}</p>
    `;
  } else {
    showResult();
  }
}

function selectAnswer(answer) {
  answers.push(answer);
  localStorage.setItem("quizAnswers", JSON.stringify(answers));
  currentQuestion++;
  loadQuestion();
}

function showResult() {
  quizEl.style.display = "none";
  resultEl.style.display = "block";

  let trilha = "";
  if (answers.includes("Arrumar um emprego") || answers.includes("Currículo/Entrevista")) {
    trilha = "👉 Sua trilha é <b>Preparação Profissional</b>: oficinas de currículo, entrevistas e mercado de trabalho.";
  } else if (answers.includes("Melhorar estudos") || answers.includes("Organização de estudos")) {
    trilha = "📚 Sua trilha é <b>Aprendizado e Competências</b>: conteúdos educativos e desenvolvimento de habilidades.";
  } else if (answers.includes("Aprender finanças") || answers.includes("Controle de dinheiro")) {
    trilha = "💰 Sua trilha é <b>Educação Financeira</b>: mini-aulas para organizar e planejar seu dinheiro.";
  } else if (answers.includes("Encontrar um mentor") || answers.includes("Falta de motivação")) {
    trilha = "🤝 Sua trilha é <b>Mentoria e Apoio</b>: conexão com mentores e histórias inspiradoras.";
  } else {
    trilha = "🌟 Sua trilha é <b>Exploração Geral</b>: aproveite os diversos conteúdos disponíveis.";
  }

  resultEl.innerHTML = `
    <h3>Resultado do Quiz</h3>
    <p>${trilha}</p>
    <button onclick="restartQuiz()">🔄 Refazer Quiz</button>
  `;
}

function restartQuiz() {
  currentQuestion = 0;
  answers = [];
  localStorage.removeItem("quizAnswers");
  resultEl.style.display = "none";
  quizEl.style.display = "block";
  loadQuestion();
}

// Recuperar progresso do quiz
window.addEventListener("load", () => {
  const savedAnswers = JSON.parse(localStorage.getItem("quizAnswers"));
  if (savedAnswers && savedAnswers.length > 0) {
    answers = savedAnswers;
    currentQuestion = answers.length;
    loadQuestion();
  } else {
    loadQuestion();
  }
});

/********** ETAPA 4 - CONTEÚDOS **********/
function showContent(type) {
  const box = document.getElementById("content-4");
  
  // se já estiver mostrando esse conteúdo, fecha
  if (box.dataset.active === type) {
    box.innerHTML = "";
    box.dataset.active = "";
    box.classList.remove("show");
    return;
  }

  // mostra o conteúdo correspondente
  box.dataset.active = type;
  box.classList.remove("show");

  if (type === "mercado") {
    box.innerHTML = `
      <h3>📈 Mercado de trabalho</h3>
      <p>O mercado de trabalho está em constante mudança, influenciado pela tecnologia, globalização e novas formas de organização.</p>
      <p>Nessa seção, você aprenderá sobre tendências, profissões do futuro, habilidades mais valorizadas e como se preparar para conquistar boas oportunidades.</p>
      <p>Também vai encontrar dicas de como acompanhar mudanças econômicas e adaptar seu perfil profissional às novas demandas do mercado.</p>
    `;
  } else if (type === "saude") {
    box.innerHTML = `
      <h3>🧠 Saúde mental</h3>
      <p>Cuidar da saúde mental é essencial para alcançar equilíbrio e manter a motivação.</p>
      <p>Aqui você vai conhecer técnicas simples de respiração, foco e organização que ajudam a controlar ansiedade e estresse do dia a dia.</p>
      <p>Também falaremos sobre a importância de pedir ajuda, manter uma rotina saudável e como o autocuidado pode fortalecer sua jornada.</p>
    `;
  } else if (type === "competencias") {
    box.innerHTML = `
      <h3>💡 Competências</h3>
      <p>As competências comportamentais, como comunicação, resiliência, empatia e trabalho em equipe, são cada vez mais valorizadas.</p>
      <p>Nesta parte, você aprenderá formas práticas de desenvolver essas habilidades, aplicando-as em estudos, trabalho e na vida pessoal.</p>
      <p>Com exemplos e exercícios, você poderá treinar diariamente para se tornar mais preparado para os desafios do futuro.</p>
    `;
  }
  setTimeout(() => box.classList.add("show"), 50);
}

/********** ETAPA 5 - OFICINAS **********/
function showWorkshop(type) {
  const box = document.getElementById("content-5");

  if (box.dataset.active === type) {
    box.innerHTML = "";
    box.dataset.active = "";
    box.classList.remove("show");
    return;
  }

  box.dataset.active = type;
  box.classList.remove("show");

  if (type === "curriculo") {
    box.innerHTML = `
      <h3>📝 Como montar um currículo</h3>
      <p>Um bom currículo deve ser claro e objetivo, destacando suas principais experiências, habilidades e conquistas.</p>
      <p>Aqui você vai aprender a estruturar seu currículo, escolher palavras-chave importantes e personalizar o documento para cada vaga.</p>
      <p>Também falaremos sobre os erros mais comuns e como evitá-los para aumentar suas chances de ser chamado para entrevistas.</p>
    `;
  } else if (type === "entrevista") {
    box.innerHTML = `
      <h3>🎤 Dicas para entrevistas</h3>
      <p>As entrevistas de emprego são momentos decisivos, e a preparação é essencial para se sair bem.</p>
      <p>Nesta oficina, você vai conhecer técnicas para responder às perguntas mais comuns, mostrar confiança e transmitir credibilidade.</p>
      <p>Além disso, abordaremos como se vestir de forma adequada, controlar a ansiedade e demonstrar interesse genuíno pela vaga.</p>
    `;
  }
  setTimeout(() => box.classList.add("show"), 50);
}

/********** ETAPA 6 - EDUCAÇÃO FINANCEIRA **********/
function showFinance(type) {
  const box = document.getElementById("content-6");

  if (box.dataset.active === type) {
    box.innerHTML = "";
    box.dataset.active = "";
    box.classList.remove("show");
    return;
  }

  box.dataset.active = type;
  box.classList.remove("show");

  if (type === "basico") {
    box.innerHTML = `
      <h3>💰 Conceitos básicos</h3>
      <p>Entender o básico das finanças é o primeiro passo para conquistar independência.</p>
      <p>Aqui você aprenderá a diferença entre gastos fixos e variáveis, como organizar uma planilha simples e identificar onde pode economizar.</p>
      <p>Também falaremos sobre como evitar dívidas e tomar melhores decisões de consumo.</p>
    `;
  } else if (type === "planejamento") {
    box.innerHTML = `
      <h3>📊 Planejamento financeiro</h3>
      <p>O planejamento financeiro é a chave para conquistar seus objetivos e ter mais tranquilidade.</p>
      <p>Nesta seção, você vai aprender a definir metas realistas, criar um orçamento mensal e acompanhar seus gastos de forma organizada.</p>
      <p>Com exemplos práticos, será mais fácil manter disciplina e alcançar seus sonhos sem comprometer suas necessidades básicas.</p>
    `;
  } else if (type === "investimentos") {
    box.innerHTML = `
      <h3>📈 Primeiros investimentos</h3>
      <p>Depois de organizar seu orçamento, é hora de fazer o dinheiro trabalhar para você.</p>
      <p>Aqui você vai aprender os principais tipos de investimentos seguros para iniciantes, como Tesouro Direto, CDBs e fundos de renda fixa.</p>
      <p>Também vamos explicar conceitos básicos de risco e retorno, para que você invista com mais segurança e confiança.</p>
    `;
  }
  setTimeout(() => box.classList.add("show"), 50);
}


/********** BOTÃO VOLTAR AO TOPO **********/
const btnTop = document.getElementById("btn-top");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
});

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

/********** ANIMAÇÃO DE ENTRADA **********/
const faders = document.querySelectorAll(".fade-in");

const appearOptions = {
  threshold: 0.2
};

const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    } else {
      entry.target.classList.add("appear");
      appearOnScroll.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);
});

/********** GLOSSÁRIO **********/
function toggleGlossario(el) {
  const p = el.querySelector("p");
  p.classList.toggle("hidden");
}

/********** NEWSLETTER **********/
const newsletterForm = document.getElementById("newsletter");
const newsletterMsg = document.getElementById("newsletter-msg");

newsletterForm.addEventListener("submit", function(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  newsletterMsg.textContent = `✅ Obrigado por se cadastrar, ${email}! Você começará a receber nossas dicas.`;
  newsletterForm.reset();
});

