import React, { useState, useEffect } from 'react';
import Logo from './components/Logo';
import { CARRIERS, REVIEWS, SERVICE_ICONS, FEATURE_ICONS } from './constants';
import { ServiceItem, Agent, Review, KeyFeature } from './types';
import AIAssistant from './components/AIAssistant';
import { useLanguage } from './contexts/LanguageContext';
import { useData } from './contexts/DataContext';
import LanguageSwitcher from './components/LanguageSwitcher';
import ContactModal from './components/ContactModal';
import AgentContactModal from './components/AgentContactModal';
import AgentApplicationForm from './components/AgentApplicationForm';
import { useAuth } from './contexts/AuthContext';
import LoginPage from './components/LoginPage';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLeads from './components/admin/AdminLeads';
import AdminApplications from './components/admin/AdminApplications';
import AdminAgents from './components/admin/AdminAgents';
import AdminServices from './components/admin/AdminServices';
import AdminAppointments from './components/admin/AdminAppointments';
import AppointmentModal from './components/AppointmentModal';


// Keep public components here
const Header = ({ onQuoteClick, onAppointmentClick, onNavClick, onMobileMenuToggle }: { onQuoteClick: () => void, onAppointmentClick: () => void, onNavClick: (pageId: string, anchor?: string) => void, onMobileMenuToggle: () => void }) => {
  const { t, language } = useLanguage();
  const { services } = useData();
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  let servicesMenuTimeout: number;

  const handleMouseEnter = () => {
    clearTimeout(servicesMenuTimeout);
    setIsServicesOpen(true);
  };

  const handleMouseLeave = () => {
    servicesMenuTimeout = window.setTimeout(() => {
      setIsServicesOpen(false);
    }, 200);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-30 shadow-sm">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a href="#" onClick={(e) => { e.preventDefault(); onNavClick('home'); }} className="flex items-center space-x-3 cursor-pointer">
          <Logo className="h-12 w-12" />
          <div>
              <h1 className="text-xl font-bold text-brand-blue">INSURANCE</h1>
              <p className="text-sm font-semibold text-brand-orange -mt-1">MULTISERVICES</p>
          </div>
        </a>
        <nav className="hidden md:flex space-x-8 items-center">
          <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
              <a href="#services" onClick={(e) => { e.preventDefault(); onNavClick('home', '#services'); }} className="text-gray-600 hover:text-brand-blue transition-colors flex items-center">
                {t.nav_services}
                <svg className={`w-4 h-4 ml-1 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </a>
              {isServicesOpen && (
                <div className="absolute top-full left-0 mt-0 pt-2 w-56 bg-white rounded-md shadow-lg py-1 ring-1 ring-black ring-opacity-5">
                    {services.map(service => (
                        <a key={service.id} href={`#${service.id}`} onClick={(e) => { e.preventDefault(); onNavClick(service.id); setIsServicesOpen(false); }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">{service.title[language]}</a>
                    ))}
                </div>
              )}
          </div>
          <a href="#about" onClick={(e) => { e.preventDefault(); onNavClick('home', '#about'); }} className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav_about}</a>
          <a href="#agents" onClick={(e) => { e.preventDefault(); onNavClick('home', '#agents'); }} className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav_agents}</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavClick('login'); }} className="text-gray-600 hover:text-brand-blue transition-colors">{t.nav_agent_login}</a>
          <button onClick={onAppointmentClick} className="text-gray-600 hover:text-brand-blue transition-colors font-medium">
            {t.schedule_appointment}
          </button>
          <button onClick={onQuoteClick} className="bg-brand-orange text-white px-5 py-2 rounded-full font-semibold hover:bg-orange-600 transition-all transform hover:scale-105">
            {t.get_a_quote}
          </button>
          <LanguageSwitcher />
        </nav>
        <div className="md:hidden flex items-center space-x-4">
            <LanguageSwitcher />
            <button onClick={onMobileMenuToggle} className="text-gray-600 hover:text-brand-blue" aria-label="Open navigation menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
        </div>
      </div>
    </header>
  );
};

const MobileMenu = ({ isOpen, onClose, onNavClick, onQuoteClick, onAppointmentClick }: { isOpen: boolean, onClose: () => void, onNavClick: (pageId: string, anchor?: string) => void, onQuoteClick: () => void, onAppointmentClick: () => void }) => {
    const { t, language } = useLanguage();
    const { services } = useData();
    
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen]);

    return (
        <div className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${isOpen ? 'bg-black bg-opacity-50' : 'opacity-0 pointer-events-none'}`} onClick={onClose}>
            <div className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg p-6 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-lg font-semibold">{t.nav_services}</h2>
                    <button onClick={onClose} aria-label={t.mobile_menu_close}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <nav className="flex flex-col space-y-4">
                    {services.map(service => (
                        <a key={service.id} href={`#${service.id}`} onClick={(e) => { e.preventDefault(); onNavClick(service.id); onClose(); }} className="text-gray-700 hover:text-brand-blue py-2">{service.title[language]}</a>
                    ))}
                    <hr className="my-4"/>
                     <a href="#about" onClick={(e) => { e.preventDefault(); onNavClick('home', '#about'); onClose(); }} className="text-gray-700 hover:text-brand-blue py-2">{t.nav_about}</a>
                     <a href="#agents" onClick={(e) => { e.preventDefault(); onNavClick('home', '#agents'); onClose(); }} className="text-gray-700 hover:text-brand-blue py-2">{t.nav_agents}</a>
                     
                    <a href="#" onClick={(e) => { e.preventDefault(); onNavClick('login'); onClose(); }} className="text-left text-gray-700 hover:text-brand-blue py-2">{t.nav_agent_login}</a>

                     <button onClick={() => { onAppointmentClick(); onClose(); }} className="w-full bg-brand-blue text-white mt-4 px-5 py-3 rounded-full font-semibold hover:bg-blue-700 transition-all">
                        {t.schedule_appointment}
                    </button>
                    <button onClick={() => { onQuoteClick(); onClose(); }} className="w-full bg-brand-orange text-white mt-2 px-5 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all">
                        {t.get_a_quote}
                    </button>
                </nav>
            </div>
        </div>
    );
};

const Hero = ({ onQuoteClick }: { onQuoteClick: () => void }) => {
  const { t } = useLanguage();
  return (
    <section className="relative text-white py-24 md:py-32 bg-brand-dark">
        <div className="absolute inset-0">
            <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECCP/EACIQAAEDAwQDAAAAAAAAAAAAAAECAwQABREGEiETFDFBYf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDae4yYsp5DL0hlDi/pSo4zUe231iQ2VvLbZGeApeCaq7622/cGlupCylOCDjI5rA2gG6PAYGPkKAf/9k=" alt="Doctor showing information on a tablet" className="w-full h-full object-cover opacity-30"/>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/70 to-transparent"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">{t.hero_title}</h2>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-gray-300">
                {t.hero_subtitle}
            </p>
            <button onClick={onQuoteClick} className="bg-brand-blue text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 transition-all transform hover:scale-105 inline-block shadow-lg">
                {t.hero_cta}
            </button>
        </div>
    </section>
  );
};

const ServiceCard = ({ service, onClick }: { service: ServiceItem, onClick: () => void }) => {
    const { language } = useLanguage();
    const { title, description, brandColor, icon } = service;

    const colorClasses = {
        blue: { bg: 'bg-blue-100', text: 'text-brand-blue' },
        orange: { bg: 'bg-orange-100', text: 'text-brand-orange' },
        green: { bg: 'bg-green-100', text: 'text-brand-green' },
    };
    const selectedColor = colorClasses[brandColor];
    
    const IconComponent = SERVICE_ICONS[icon] || SERVICE_ICONS.default;

    return (
        <div onClick={onClick} className="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer group">
            <div className={`${selectedColor.bg} p-4 rounded-full mb-6 transition-transform group-hover:scale-110`}>
                <IconComponent className={selectedColor.text} />
            </div>
            <h3 className="text-xl font-bold text-brand-dark mb-2">{title[language]}</h3>
            <p className="text-gray-600 leading-relaxed">{description[language]}</p>
        </div>
    );
};


const ServicesSection = ({ onServiceClick }: { onServiceClick: (id: string) => void }) => {
  const { t } = useLanguage();
  const { services } = useData();
  return (
    <section id="services" className="py-20 bg-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brand-dark">{t.services_title}</h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">{t.services_subtitle}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} onClick={() => onServiceClick(service.id)} />
          ))}
        </div>
      </div>
    </section>
  );
};

const CarriersSection = () => {
    const { t } = useLanguage();
    return (
        <section id="carriers" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold text-brand-dark">{t.carriers_title}</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">{t.carriers_subtitle}</p>
            <div className="relative mt-12 h-24 overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
            <div className="absolute left-0 flex w-max animate-scroll">
                {[...CARRIERS, ...CARRIERS].map((carrier, index) => (
                    <div key={index} className="flex-shrink-0 w-48 h-24 flex items-center justify-center p-4" title={carrier.name}>
                    <img src={carrier.logoUrl} alt={carrier.name} className="max-h-12 max-w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-300" />
                    </div>
                ))}
            </div>
            </div>
        </div>
        </section>
    );
};

const StarIcon = ({ className = "w-5 h-5", filled = true }: { className?: string, filled?: boolean }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`${className} ${filled ? 'text-yellow-400' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const StarRating = ({ rating, className = "" }: { rating: number, className?: string }) => {
    return (
        <div className={`flex ${className}`}>
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} filled={i < rating} />
            ))}
        </div>
    );
};

const ReviewCard = ({ review }: { review: Review }) => {
    const { language, t } = useLanguage();
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 text-left transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
                <StarRating rating={review.stars} />
                <span className="text-xs font-semibold text-gray-500">{review.service[language]}</span>
            </div>
            <blockquote className="text-gray-700 leading-relaxed mb-4">"{review.quote[language]}"</blockquote>
            <div>
                <p className="font-bold text-brand-dark">{review.name}</p>
                <p className="text-sm text-gray-500">{t.reviews_agent_assisted} {review.agent}</p>
            </div>
        </div>
    );
};

const ReviewsSection = ({ onSeeAllClick }: { onSeeAllClick: () => void }) => {
    const { t } = useLanguage();
    const averageRating = (REVIEWS.reduce((acc, review) => acc + review.stars, 0) / REVIEWS.length).toFixed(1);
    const [visibleReviews, setVisibleReviews] = useState<Review[]>([]);

    useEffect(() => {
        const updateReviews = () => {
            const shuffled = [...REVIEWS].sort(() => 0.5 - Math.random());
            setVisibleReviews(shuffled.slice(0, 4));
        };
        updateReviews();
        const intervalId = setInterval(updateReviews, 3 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <section id="reviews" className="py-20 bg-blue-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-brand-dark">{t.reviews_title}</h2>
                    <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">{t.reviews_subtitle}</p>
                    <div className="flex items-center justify-center mt-6 space-x-2">
                        <StarRating rating={parseFloat(averageRating)} />
                        <span className="font-bold text-xl text-gray-800">{averageRating}</span>
                        <span className="text-gray-600">{t.reviews_based_on} {REVIEWS.length} {t.reviews_from}</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {visibleReviews.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                </div>
                <div className="text-center mt-12">
                    <button
                        onClick={onSeeAllClick}
                        className="bg-brand-orange text-white px-6 py-3 rounded-full font-semibold hover:bg-orange-600 transition-all transform hover:scale-105"
                    >
                        {t.reviews_see_all}
                    </button>
                </div>
            </div>
        </section>
    );
};

const ReviewsPage = ({ onGoHome }: { onGoHome: () => void }) => {
    const { t } = useLanguage();
    const averageRating = (REVIEWS.reduce((acc, review) => acc + review.stars, 0) / REVIEWS.length).toFixed(1);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="py-20 bg-brand-light">
            <div className="container mx-auto px-6">
                <button onClick={onGoHome} className="mb-8 text-brand-blue hover:underline font-semibold">&larr; {t.back_to_home}</button>
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">{t.reviews_page_title}</h1>
                     <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">{t.reviews_page_subtitle}</p>
                    <div className="flex items-center justify-center mt-6 space-x-2">
                        <StarRating rating={parseFloat(averageRating)} />
                        <span className="font-bold text-xl text-gray-800">{averageRating}</span>
                        <span className="text-gray-600">{t.reviews_based_on} {REVIEWS.length} {t.reviews_from}</span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {REVIEWS.map((review, index) => (
                        <ReviewCard key={index} review={review} />
                    ))}
                </div>
                 <div className="text-center mt-12">
                     <button onClick={onGoHome} className="text-brand-blue hover:underline font-semibold">&larr; {t.back_to_home}</button>
                </div>
            </div>
        </div>
    );
};


const AboutSection = () => {
    const { t } = useLanguage();
    return (
        <section id="about" className="py-20 bg-white">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
                <div className="md:w-1/2">
                    <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=800&fit=crop&q=80" alt="Our team collaborating" className="rounded-xl shadow-2xl w-full" />
                </div>
                <div className="md:w-1/2 text-center md:text-left">
                    <h2 className="text-4xl font-bold text-brand-dark mb-4">{t.about_title}</h2>
                    <p className="text-gray-600 text-lg mb-6">
                        {t.about_p1}
                    </p>
                    <div className="flex justify-center md:justify-start space-x-6">
                        <div className="text-center">
                            <p className="text-3xl font-bold text-brand-blue">10+</p>
                            <p className="text-gray-500">{t.about_stat1_title}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-brand-green">98%</p>
                            <p className="text-gray-500">{t.about_stat2_title}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-3xl font-bold text-brand-orange">1000+</p>
                            <p className="text-gray-500">{t.about_stat3_title}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-5.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);

const AgentCard = ({ agent, onContact }: { agent: Agent, onContact: (agent: Agent) => void }) => {
    const { language, t } = useLanguage();
    const { name, location, avatarUrl, title } = agent;
    return (
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">
            <img src={avatarUrl} alt={`Avatar for ${name}`} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover ring-4 ring-blue-100" />
            <h3 className="text-xl font-bold text-brand-dark mb-1">{name}</h3>
            {title && <p className="text-sm font-semibold text-brand-orange mb-2">{title[language]}</p>}
            <div className="flex items-center justify-center text-gray-600 mb-4">
                <LocationIcon />
                <span className="text-left">{location[language]}</span>
            </div>
            
            <div className="mt-auto pt-4 border-t w-full flex justify-center">
                <button onClick={() => onContact(agent)} className="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand-blue hover:bg-blue-700 transition-colors">
                    {t.agent_card_contact}
                </button>
            </div>
        </div>
    );
};

const AgentsSection = ({ onAgentContact }: { onAgentContact: (agent: Agent) => void }) => {
    const { t } = useLanguage();
    const { agents } = useData();
    return (
        <section id="agents" className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-dark">{t.agents_title}</h2>
            <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">{t.agents_subtitle}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {agents.map((agent) => (
                <AgentCard key={agent.npn} agent={agent} onContact={onAgentContact} />
            ))}
            </div>
        </div>
        </section>
    );
};

const JoinTeamSection = ({ onApplyClick }: { onApplyClick: () => void }) => {
    const { t } = useLanguage();
    return (
        <section id="join" className="py-20 bg-brand-dark text-white">
            <div className="container mx-auto px-6 text-center">
                <h2 className="text-4xl font-bold mb-4">{t.join_team_title}</h2>
                <p className="text-lg text-gray-300 mt-4 max-w-2xl mx-auto mb-8">{t.join_team_subtitle}</p>
                <button onClick={onApplyClick} className="bg-brand-green text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-green-700 transition-all transform hover:scale-105 shadow-lg">
                    {t.join_team_cta}
                </button>
            </div>
        </section>
    );
};

const ServiceContactForm = ({ serviceName }: { serviceName: string }) => {
    const { t } = useLanguage();
    const { addLead } = useData();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        
        addLead({
            name,
            email,
            phone,
            type: 'Service',
            target: serviceName,
            source: 'Website',
        });
        
        setSubmitted(true);
        (e.target as HTMLFormElement).reset();
    };
    
    useEffect(() => {
        if(submitted) {
            const timer = setTimeout(() => setSubmitted(false), 5000);
            return () => clearTimeout(timer);
        }
    }, [submitted]);

    return (
        <section className="py-20 bg-blue-50">
            <div className="container mx-auto px-6 max-w-3xl">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-3xl font-bold text-brand-dark mb-2">{t.service_form_title_prefix} {serviceName}</h2>
                    <p className="text-gray-600 mb-6">{t.service_form_subtitle}</p>
                    {submitted ? (
                         <div className="text-center p-8 bg-green-100 text-green-800 rounded-lg">
                            <h3 className="text-xl font-bold">{t.form_thank_you}</h3>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="text-left">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="service-form-name" className="block text-sm font-medium text-gray-700 mb-1">{t.form_full_name}</label>
                                    <input type="text" id="service-form-name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                                </div>
                                <div>
                                    <label htmlFor="service-form-email" className="block text-sm font-medium text-gray-700 mb-1">{t.form_email}</label>
                                    <input type="email" id="service-form-email" name="email" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                                </div>
                                <div>
                                    <label htmlFor="service-form-phone" className="block text-sm font-medium text-gray-700 mb-1">{t.form_phone}</label>
                                    <input type="tel" id="service-form-phone" name="phone" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue" />
                                </div>
                                <div>
                                    <button type="submit" className="w-full bg-brand-orange text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg">
                                        {t.get_a_quote}
                                    </button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

const KeyFeatureDisplay = ({ feature }: { feature: KeyFeature }) => {
    const { language } = useLanguage();
    const IconComponent = FEATURE_ICONS[feature.icon];

    if (!IconComponent) return null;

    return (
        <div className="text-center p-6">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-brand-blue mx-auto mb-4">
                <IconComponent />
            </div>
            <h3 className="text-xl font-semibold text-brand-dark mb-2">{feature.title[language]}</h3>
            <p className="text-gray-600">{feature.description[language]}</p>
        </div>
    );
};

const ServicePage = ({ service, onGoHome }: { service: ServiceItem, onGoHome: () => void }) => {
    const { language, t } = useLanguage();
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [service]);

    return (
        <div className="bg-white">
            <section className="relative text-white py-20 md:py-28 bg-brand-dark">
                <div className="absolute inset-0">
                    <img src={service.pageHeroImage} alt={service.title[language]} className="w-full h-full object-cover opacity-30"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
                </div>
                <div className="container mx-auto px-6 relative z-10 text-center">
                     <button onClick={onGoHome} className="mb-8 text-blue-300 hover:text-white font-semibold transition-colors">&larr; {t.back_to_home}</button>
                    <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-4">{service.title[language]}</h1>
                    <p className="text-lg md:text-xl max-w-3xl mx-auto text-gray-300">
                        {service.pageSubtitle[language]}
                    </p>
                </div>
            </section>

            <div className="py-20">
                <div className="container mx-auto px-6">
                    <section className="mb-20">
                        <h2 className="text-3xl font-bold text-center text-brand-dark mb-12">{t.service_page_what_we_offer}</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {service.keyFeatures.map((feature, index) => (
                                <KeyFeatureDisplay key={index} feature={feature} />
                            ))}
                        </div>
                    </section>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <section>
                            <h2 className="text-3xl font-bold text-brand-dark mb-6">{t.service_page_who_is_this_for}</h2>
                            <ul className="space-y-4">
                                {service.whoIsThisFor.map((item, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                        <span className="text-gray-700 text-lg">{item[language]}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section className="bg-blue-50 p-8 rounded-lg">
                            <h2 className="text-3xl font-bold text-brand-dark mb-6">{t.service_page_how_it_works}</h2>
                            <ol className="space-y-6">
                                {service.howItWorks.map((step, index) => (
                                     <li key={index} className="flex items-start">
                                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 bg-brand-blue text-white font-bold rounded-full mr-4">{index + 1}</div>
                                        <span className="text-gray-700 text-lg">{step[language]}</span>
                                    </li>
                                ))}
                            </ol>
                        </section>
                    </div>
                </div>
            </div>
            <ServiceContactForm serviceName={service.title[language]} />
        </div>
    );
};


const HomePage = ({ onQuoteClick, onAgentContact, onApplyClick, onSeeAllReviews, onServiceClick }: { onQuoteClick: () => void, onAgentContact: (agent: Agent) => void, onApplyClick: () => void, onSeeAllReviews: () => void, onServiceClick: (id: string) => void }) => {
    return (
        <>
            <Hero onQuoteClick={onQuoteClick} />
            <ServicesSection onServiceClick={onServiceClick} />
            <CarriersSection />
            <ReviewsSection onSeeAllClick={onSeeAllReviews} />
            <AboutSection />
            <AgentsSection onAgentContact={onAgentContact} />
            <JoinTeamSection onApplyClick={onApplyClick} />
        </>
    );
};


const Footer = () => {
    const { t, language } = useLanguage();
    const { services } = useData();

    return (
        <footer className="bg-brand-dark text-white">
            <div className="container mx-auto px-6 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
                    <div className="col-span-2 lg:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <Logo className="h-10 w-10" />
                            <div>
                                <h3 className="text-lg font-bold text-white">INSURANCE</h3>
                                <p className="text-sm font-semibold text-brand-orange -mt-1">MULTISERVICES</p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">{t.footer_tagline}</p>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-2 text-gray-300">
                            <li><a href="#about" className="hover:underline">About Us</a></li>
                            <li><a href="#agents" className="hover:underline">Our Agents</a></li>
                            <li><a href="#reviews" className="hover:underline">Reviews</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-4">Our Services</h3>
                        <ul className="space-y-2 text-gray-300">
                           {services.slice(0, 5).map(s => (
                               <li key={s.id}><a href={`#${s.id}`} className="hover:underline">{s.title[language]}</a></li>
                           ))}
                        </ul>
                    </div>

                    <div className="col-span-2 md:col-span-1">
                        <h3 className="font-bold text-lg mb-4">{t.footer_contact_us}</h3>
                         <ul className="space-y-3 text-gray-300">
                            <li className="flex items-start">
                               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 20l-4.95-5.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                               <span>7902 W Waters Ave, Ste E, <br/>Tampa, FL 33615</span>
                            </li>
                            <li className="flex items-start">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 flex-shrink-0 text-gray-400" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                               <a href="tel:813-885-5296" className="hover:underline">(813) 885-5296</a>
                            </li>
                        </ul>
                        <div className="flex space-x-4 mt-6">
                            {/* Add social links here */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 py-4">
                <div className="container mx-auto px-6 text-center text-sm text-gray-500 flex justify-between items-center flex-col md:flex-row">
                     <p>&copy; {new Date().getFullYear()} Insurance Multiservices. {t.footer_copyright}</p>
                     <p>
                         <a href="#" className="hover:underline">Privacy Policy</a>
                         <span className="mx-2">|</span>
                         <a href="#" className="hover:underline">Terms of Service</a>
                     </p>
                </div>
            </div>
        </footer>
    );
};

export default function App() {
    const { services } = useData();
    const { user } = useAuth();
    
    // Combined state for navigation
    const [route, setRoute] = useState({ view: 'public', page: 'home' });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

    useEffect(() => {
        if (user.isAuthenticated) {
            setRoute({ view: 'admin', page: 'dashboard' });
        } else if (route.view === 'admin') {
            setRoute({ view: 'public', page: 'home' });
        }
    }, [user.isAuthenticated, route.view]);

    const handleQuoteClick = () => setIsModalOpen(true);
    const handleAppointmentClick = () => setIsAppointmentModalOpen(true);
    const handleAgentContact = (agent: Agent) => setSelectedAgent(agent);
  
    const handleNavClick = (pageId: string, anchor?: string) => {
        if (pageId === 'login') {
            setRoute({ view: 'login', page: 'login' });
            return;
        }

        setRoute({ view: 'public', page: pageId });
        
        if (pageId === 'home' && anchor) {
             setTimeout(() => {
                document.querySelector(anchor)?.scrollIntoView({ behavior: 'smooth' });
            }, 50);
        } else if (pageId === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };
    
    const renderAdminContent = () => {
        switch (route.page) {
            case 'leads': return <AdminLeads />;
            case 'applications': return <AdminApplications />;
            case 'appointments': return <AdminAppointments />;
            case 'agents': return <AdminAgents />;
            case 'services': return <AdminServices />;
            case 'dashboard':
            default:
                return <AdminDashboard />;
        }
    };

    const renderPublicContent = () => {
        if (route.page === 'application') {
            return <AgentApplicationForm onGoHome={() => setRoute({ view: 'public', page: 'home' })} />;
        }
        if (route.page === 'reviews') {
            return <ReviewsPage onGoHome={() => setRoute({ view: 'public', page: 'home' })} />;
        }
        const currentService = services.find(s => s.id === route.page);
        if (currentService) {
            return <ServicePage service={currentService} onGoHome={() => setRoute({ view: 'public', page: 'home' })} />;
        }
        
        return <HomePage 
            onQuoteClick={handleQuoteClick} 
            onAgentContact={handleAgentContact} 
            onApplyClick={() => setRoute({ view: 'public', page: 'application' })} 
            onSeeAllReviews={() => setRoute({ view: 'public', page: 'reviews' })} 
            onServiceClick={(id) => setRoute({ view: 'public', page: id })}
        />;
    };

    if (route.view === 'login' && !user.isAuthenticated) {
        return <LoginPage onLoginSuccess={() => setRoute({ view: 'admin', page: 'dashboard' })} />;
    }

    if (route.view === 'admin' && user.isAuthenticated) {
        return (
            <AdminLayout activePage={route.page} setActivePage={(page) => setRoute({ view: 'admin', page })}>
                {renderAdminContent()}
            </AdminLayout>
        );
    }
    
    return (
        <div className="bg-brand-light font-sans">
            <Header onQuoteClick={handleQuoteClick} onAppointmentClick={handleAppointmentClick} onNavClick={handleNavClick} onMobileMenuToggle={() => setIsMobileMenuOpen(prev => !prev)} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onNavClick={handleNavClick} onQuoteClick={handleQuoteClick} onAppointmentClick={handleAppointmentClick} />
            <main>
                {renderPublicContent()}
            </main>
            <Footer />
            <AIAssistant />
            <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            <AppointmentModal isOpen={isAppointmentModalOpen} onClose={() => setIsAppointmentModalOpen(false)} />
            {selectedAgent && (
                <AgentContactModal 
                    isOpen={!!selectedAgent} 
                    onClose={() => setSelectedAgent(null)} 
                    agent={selectedAgent} 
                />
            )}
        </div>
    );
}