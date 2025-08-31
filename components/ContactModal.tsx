import React, { useEffect, useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';
import Logo from './Logo';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
    const { t } = useLanguage();
    const { addLead } = useData();
    const [isVisible, setIsVisible] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => setIsVisible(true), 10); // Animate in
            return () => clearTimeout(timer);
        } else {
            setIsVisible(false); // Prepare for next open
            const timer = setTimeout(() => setSubmitted(false), 300); // Reset submitted state after closing
            return () => clearTimeout(timer);
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        addLead({
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            message: formData.get('message') as string,
            source: formData.get('source') as string,
            type: 'General'
        });
        setSubmitted(true);
        (e.target as HTMLFormElement).reset();
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
            <div className="flex justify-center items-center space-x-3 mb-4">
                <Logo className="h-10 w-10"/>
                <div>
                  <h1 className="text-xl font-bold text-brand-blue">INSURANCE</h1>
                  <p className="text-sm font-semibold text-brand-orange -mt-1">MULTISERVICES</p>
                </div>
            </div>
            <h2 className="text-2xl font-bold text-brand-dark mb-2">{t.form_title}</h2>
            <p className="text-gray-600 mb-6">{t.form_subtitle}</p>
        </div>

        <div className="p-8 pt-0">
             {submitted ? (
                <div className="text-center p-8 bg-green-100 text-green-800 rounded-lg">
                    <h3 className="text-xl font-bold">{t.form_thank_you}</h3>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="modal-name" className="block text-sm font-medium text-gray-700 mb-1">{t.form_full_name}</label>
                            <input type="text" id="modal-name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                        </div>
                        <div>
                            <label htmlFor="modal-email" className="block text-sm font-medium text-gray-700 mb-1">{t.form_email}</label>
                            <input type="email" id="modal-email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                        </div>
                        <div>
                            <label htmlFor="modal-phone" className="block text-sm font-medium text-gray-700 mb-1">{t.form_phone}</label>
                            <input type="tel" id="modal-phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                        </div>
                        <div>
                            <label htmlFor="modal-source" className="block text-sm font-medium text-gray-700 mb-1">{t.form_how_did_you_hear}</label>
                            <select id="modal-source" name="source" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white">
                                <option value="">{t.app_select}</option>
                                <option value="Website">Website</option>
                                <option value="Referral">Referral</option>
                                <option value="Facebook">Facebook</option>
                                <option value="TikTok">TikTok</option>
                                <option value="Instagram">Instagram</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="modal-message" className="block text-sm font-medium text-gray-700 mb-1">{t.form_message_label}</label>
                            <textarea id="modal-message" name="message" rows={3} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-brand-orange text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg">
                                {t.form_send_message}
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

export default ContactModal;