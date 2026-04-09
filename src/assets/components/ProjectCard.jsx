// ProjectCard.jsx
import React from 'react';

function ProjectCard({ titulo, descricao, techs, icone, linkDemo }) {
  return (
    <div className="card-projeto">
      <div className="card-img">
        <i className={icone} style={{ fontSize: '3.5rem' }}></i>
      </div>
      <div className="card-conteudo">
        <h3>{titulo}</h3>
        <p>{descricao}</p>
        <div className="tecnologias">
          {techs.map((tech, idx) => (
            <span key={idx} className="tech">{tech}</span>
          ))}
        </div>
        <button 
          className="btn-projeto"
          onClick={() => alert(`🔍 Projeto "${titulo}" - Demo em breve! Fique ligado(a).`)}
        >
          ver codigo <i className="fas fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;