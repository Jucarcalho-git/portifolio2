import { useState, useEffect, useRef } from 'react';

import perfilImg from './assets/perfil.jpeg'; // <-- imagem de perfil importada
import ProjectCard from './assets/components/ProjectCard';
import './index.css';

function App() {
  // Estados
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '' });
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const toastTimeoutRef = useRef(null);

  // Dados dos projetos
  const projetosData = [
    { 
      titulo: "Projeto Site", 
      descricao: "Site institucional em desenvolvimento", 
      techs: ["HTML", "CSS", "JS"], 
      icone: "fas fa-rocket",
      linkDemo: "#"
    },
    // Adicione mais projetos aqui
  ];

  // Função para exibir toast
  const showToast = (message, duration = 3000) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ show: true, message });
    toastTimeoutRef.current = setTimeout(() => {
      setToast({ show: false, message: '' });
    }, duration);
  };

  // Envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();

    if (!nome || !email || !mensagem) {
      showToast('⚠️ Preencha todos os campos!', 2500);
      return;
    }
    if (!email.includes('@') || !email.includes('.')) {
      showToast('📧 Digite um e-mail válido.', 2500);
      return;
    }
    showToast(`✅ Obrigado ${nome}! Sua mensagem foi enviada com sucesso.`, 4000);
    form.reset();
  };

  // Efeito: navbar scroll e menu ativo
  useEffect(() => {
    const handleScroll = () => {
      // Scroll effect
      setScrolled(window.scrollY > 50);

      // Active menu on scroll
      const sections = document.querySelectorAll('section');
      let current = '';
      const scrollPos = window.scrollY + 150;
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // chamada inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Efeito: Intersection Observer para fade-up
  useEffect(() => {
    const fadeElements = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });
    fadeElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Efeito: animação das skills com delay
  useEffect(() => {
    const skills = document.querySelectorAll('.skill-tag');
    skills.forEach((tag, index) => {
      tag.style.animationDelay = `${index * 0.05}s`;
    });
  }, []);

  // Fechar menu ao clicar em link
  const handleNavLinkClick = (e, targetId) => {
    e.preventDefault();
    setMenuOpen(false);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Navbar */}
      <div className={`navbar ${scrolled ? 'scrolled' : ''}`} id="navbar">
        <div className="container nav-container">
          <div className="logo">Portifolio</div>
          <div 
            className="menu-toggle" 
            id="menuToggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fas fa-bars"></i>
          </div>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`} id="navLinks">
            <li>
              <a 
                href="#sobre" 
                className={`nav-link ${activeSection === 'sobre' ? 'active' : ''}`}
                onClick={(e) => handleNavLinkClick(e, 'sobre')}
              >
                Sobre
              </a>
            </li>
            <li>
              <a 
                href="#projetos" 
                className={`nav-link ${activeSection === 'projetos' ? 'active' : ''}`}
                onClick={(e) => handleNavLinkClick(e, 'projetos')}
              >
                Projetos
              </a>
            </li>
            <li>
              <a 
                href="#contato" 
                className={`nav-link ${activeSection === 'contato' ? 'active' : ''}`}
                onClick={(e) => handleNavLinkClick(e, 'contato')}
              >
                Contato
              </a>
            </li>
          </ul>
        </div>
      </div>

      <main>
        {/* SEÇÃO SOBRE MIM */}
        <section id="sobre">
          <div className="container">
            <div className="sobre-grid">
              <div className="perfil-img">
                <img src={perfilImg} alt="Foto de perfil" id="perfilImage" />
                <p style={{ marginTop: '12px', fontSize: '0.75rem', color: '#16d11f' }}>
                  <i className="fas fa-camera"></i>
                </p>
              </div>
              <div className="sobre-texto">
                <h3>Olá, eu sou <span style={{ color: '#2b48ca' }}>Juscelino Carvalho</span></h3>
                <div className="badge">TSI em formação</div>
                <p>
                  Meu nome é Juscelino Carvalho das Chagas, tenho 43 anos e sou residente no município de Barro
                  Duro, no estado do Piauí. Sou casado há 20 anos e tenho dois filhos, que são a base da minha
                  vida e a minha maior motivação para seguir em frente com dedicação e responsabilidade.
                </p>
                <p>
                  Atualmente, trabalho na Vigilância Sanitária do município de Barro Duro, onde desempenho
                  minhas funções com compromisso e zelo pela saúde pública, contribuindo para o bem-estar da
                  população.
                </p>
                <p>
                  Sou formado em bacharelado em Teologia pela Faculdade FAEPI, o que reforça minha busca por
                  conhecimento espiritual e humano. Também participei de cursos de aperfeiçoamento, como o de
                  Educação Inclusiva, realizado pela APYNTEC, e o curso de formação de vigilante (volante)
                  pelo Centro de Formação Forme-Seg.
                </p>
                <p>
                  Procuro, ao longo da minha trajetória, agir com responsabilidade, ética e dedicação, tanto
                  na minha vida profissional quanto pessoal, sempre buscando contribuir de forma positiva para
                  a sociedade e para a minha comunidade.
                </p>
                <div className="skills">
                  <span className="skill-tag">HTML</span>
                  <span className="skill-tag">CSS</span>
                  <span className="skill-tag">JS</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SEÇÃO PROJETOS */}
        <section id="projetos">
          <div className="container">
            <h2 className="section-title fade-up">Meus Projetos</h2>
            <div className="projetos-grid">
              {projetosData.map((proj, idx) => (
                <ProjectCard key={idx} {...proj} />
              ))}
            </div>
          </div>
        </section>

        {/* SEÇÃO CONTATO */}
        <section id="contato">
          <div className="container">
            <h2 className="section-title fade-up">📬 Contato</h2>
            <div className="contato-wrapper fade-up">
              <div className="contato-info">
                <h3>Vamos criar algo incrível?</h3>
                <p>Disponível para colaborações e oportunidades. Mande uma mensagem!</p>
                <div className="contato-detalhe">
                  <i className="fas fa-envelope"></i>
                  <span>juscelinocarvalhodaschaga@gmail.com</span>
                </div>
                <div className="contato-detalhe">
                  <i className="fas fa-phone-alt"></i>
                  <span>+55 86 99847-5286</span>
                </div>
                <div className="contato-detalhe">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>Barro Duro, PI</span>
                </div>
                <div className="social-links">
                  <a href="https://github.com/Jucarcalho-git/portifolio" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
                  </a>
                  <a href="https://wa.me/5586998475286" target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
              <div className="contato-form">
                <form id="formContato" onSubmit={handleSubmit}>
                  <div className="input-group">
                    <input type="text" name="nome" placeholder="Seu nome completo" required />
                  </div>
                  <div className="input-group">
                    <input type="email" name="email" placeholder="Seu melhor e-mail" required />
                  </div>
                  <div className="input-group">
                    <textarea rows="4" name="mensagem" placeholder="Sua mensagem..." required></textarea>
                  </div>
                  <button type="submit" className="btn-enviar">
                    <i className="fas fa-paper-plane"></i> Enviar mensagem
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© 2026 Juscelino Carvalho das Chagas • Todos os direitos reservados</p>
        </div>
      </footer>

      {/* Toast message */}
      {toast.show && (
        <div id="toastMsg" className="toast-msg show">
          {toast.message}
        </div>
      )}
    </>
  );
}

export default App;