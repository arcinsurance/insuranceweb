import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import Logo from './Logo';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// IMPORTANT: This is the base URL. Query params will be added dynamically.
const SCHEDULING_URL_BASE = "https://calendly.com/arc-insurancemultiservices/30min";

const AppointmentModal = ({ isOpen, onClose }: AppointmentModalProps) => {
    const { t, language } = useLanguage();
    const { addAppointment, services } = useData();
    const [isVisible, setIsVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [submittedData, setSubmittedData] = useState<{name: string; email: string} | null>(null);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setIsVisible(true), 10);
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false);
            const timer = setTimeout(() => {
                setSubmitted(false);
                setSubmittedData(null); // Reset data on close
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
           if (event.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        
        addAppointment({
            name,
            email,
            phone: formData.get('phone') as string,
            serviceOfInterest: formData.get('service') as string,
        });
        
        setSubmittedData({ name, email });
        setSubmitted(true);
    };

    const getSchedulingUrlWithParams = () => {
        if (!submittedData) {
            return SCHEDULING_URL_BASE;
        }
        const params = new URLSearchParams();
        params.append('name', submittedData.name);
        params.append('email', submittedData.email);
        // Phone number is not a standard pre-fill field for Calendly, 
        // so we only pass name and email for reliability.
        return `${SCHEDULING_URL_BASE}?${params.toString()}`;
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="p-8 text-center">
            <div className="flex justify-center items-center space-x-3 mb-4">
                <Logo className="h-10 w-10"/>
                <div>
                  <h1 className="text-xl font-bold text-brand-blue">INSURANCE</h1>
                  <p className="text-sm font-semibold text-brand-orange -mt-1">MULTISERVICES</p>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-brand-dark mb-2">{t.appointment_modal_title}</h2>
            <p className="text-gray-600 mb-6">{t.appointment_modal_subtitle}</p>
        </div>

        <div className="p-8 pt-0">
             {submitted ? (
                <div className="text-center p-8 bg-green-100 text-green-800 rounded-lg">
                    <h3 className="text-xl font-bold">{t.appointment_modal_success_title}</h3>
                    <p className="mt-2 mb-6">{t.appointment_modal_success_body}</p>
                    <a 
                        href={getSchedulingUrlWithParams()} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="inline-block w-full bg-brand-green text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg"
                        onClick={onClose}
                    >
                        {t.appointment_modal_confirm_button}
                    </a>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="app-name" className="block text-sm font-medium text-gray-700 mb-1">{t.form_full_name}</label>
                            <input type="text" id="app-name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                        </div>
                        <div>
                            <label htmlFor="app-email" className="block text-sm font-medium text-gray-700 mb-1">{t.form_email}</label>
                            <input type="email" id="app-email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                        </div>
                        <div>
                            <label htmlFor="app-phone" className="block text-sm font-medium text-gray-700 mb-1">{t.form_phone}</label>
                            <input type="tel" id="app-phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                        </div>
                        <div>
                            <label htmlFor="app-service" className="block text-sm font-medium text-gray-700 mb-1">{t.form_service_interest}</label>
                            <select id="app-service" name="service" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white">
                                <option value="">{t.app_select}</option>
                                {services.map(service => (
                                    <option key={service.id} value={service.title[language]}>{service.title[language]}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-brand-blue text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg">
                               {t.schedule_appointment}
                            </button>
                        </div>
                    </div>
                </form>
            )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;
