import React from 'react';
import './InsuranceLogos.css';

const logos = [
  { name: 'AmeriHealth', src: '/logos/AmeriHealth.png' },
  { name: 'Molina', src: '/logos/Molina.png' },
  { name: 'Oscar', src: '/logos/Oscar.png' },
  { name: 'United Health', src: '/logos/United_Health.png' },
];

const InsuranceLogos: React.FC = () => (
  <div className="insurance-logos">
    {logos.map((logo) => (
      <img
        key={logo.name}
        src={logo.src}
        alt={logo.name}
        className="insurance-logo"
        title={logo.name}
      />
    ))}
  </div>
);

export default InsuranceLogos;
