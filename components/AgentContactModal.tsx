import React, { useEffect, useState } from 'react';
import SmartAvatar from './SmartAvatar';
import { useLanguage } from '../contexts/LanguageContext';
import { Agent, ServiceItem } from '../types';

interface AgentContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  agent: Agent;
  services: ServiceItem[];
}

const AgentContactModal = ({ isOpen, onClose, agent, services }: AgentContactModalProps) => {
    const { t, language } = useLanguage();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        coverage: services[0]?.id || ''
    });
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setIsVisible(true), 10); // Animate in
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false); // Prepare for next open
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') {
              onClose();
           }
        };
        window.addEventListener('keydown', handleEsc);
        return () => {
           window.removeEventListener('keydown', handleEsc);
        };
    }, [onClose]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const selectedService = services.find(s => s.id === formData.coverage);
        
        const subject = `New Inquiry from ${formData.name}`;
        const body = `
A new contact request has been submitted through the website.

Client Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}

Coverage of Interest:
- ${selectedService ? selectedService.title[language] : 'Not specified'}

Please follow up with the client at your earliest convenience.
        `;

        const mailtoLink = `mailto:${agent.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body.trim())}`;
        
        window.location.href = mailtoLink;
        onClose();
    };
    
    if (!isOpen) return null;

  return (
    <div 
        className={`fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
    >
      <div 
        className={`bg-white rounded-xl shadow-2xl w-full max-w-lg relative transition-all duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        onClick={e => e.stopPropagation()}
      >
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
            aria-label="Close modal"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="p-8 text-center">
            <SmartAvatar name={agent.name} candidates={[`/agents/${agent.npn}.jpg`, agent.avatarUrl]} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover ring-4 ring-blue-100" size={80} />
            <h2 className="text-2xl font-bold text-brand-dark mb-1">{t.agent_contact_modal_title} {agent.name}</h2>
            <p className="text-gray-600">{agent.location[language]}</p>
        </div>

        <div className="p-8 pt-0">
            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="agent-name" className="block text-sm font-medium text-gray-700 mb-1">{t.form_full_name}</label>
                        <input type="text" id="agent-name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                    </div>
                    <div>
                        <label htmlFor="agent-email" className="block text-sm font-medium text-gray-700 mb-1">{t.form_email}</label>
                        <input type="email" id="agent-email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                    </div>
                    <div>
                        <label htmlFor="agent-phone" className="block text-sm font-medium text-gray-700 mb-1">{t.form_phone}</label>
                        <input type="tel" id="agent-phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                    </div>
                    <div>
                        <label htmlFor="agent-coverage" className="block text-sm font-medium text-gray-700 mb-1">{t.agent_contact_form_coverage}</label>
                        <select id="agent-coverage" name="coverage" value={formData.coverage} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white">
                           {services.map(service => (
                               <option key={service.id} value={service.id}>{service.title[language]}</option>
                           ))}
                        </select>
                    </div>
                    <div>
                        <button type="submit" className="w-full bg-brand-orange text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg">
                            {t.form_send_message}
                        </button>
                    </div>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
};

export default AgentContactModal;