import React, { useState } from 'react';
import Logo from './components/Logo';
import { SERVICES, AGENTS, SERVICE_ICONS } from './constants';
import AgentContactModal from './components/AgentContactModal';
import AppointmentModal from './components/AppointmentModal';
import AgentApplicationForm from './components/AgentApplicationForm';
import ContactModal from './components/ContactModal';
import LanguageSwitcher from './components/LanguageSwitcher';

function App() {
    const [showContact, setShowContact] = useState(false);
    const [showAppointment, setShowAppointment] = useState(false);
    const [showAgentForm, setShowAgentForm] = useState(false);
    const [showAgentContact, setShowAgentContact] = useState(false);
    const [selectedAgent, setSelectedAgent] = useState(null);

    // Color palette from logo
    const colors = {
        blue: 'text-blue-700',
        orange: 'text-orange-500',
        green: 'text-green-600',
        bgBlue: 'bg-blue-50',
        bgOrange: 'bg-orange-50',
        bgGreen: 'bg-green-50',
    };

        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex flex-col">
                {/* Header & Navigation */}
                <header className="bg-white/90 shadow-lg sticky top-0 z-30">
                    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                        <div className="flex items-center gap-3">
                            <Logo className="h-12 w-12" />
                            <div>
                                <h1 className="text-3xl font-extrabold text-blue-700 tracking-tight leading-tight">INSURANCE</h1>
                                <p className="text-base font-semibold text-orange-500 -mt-1">MULTISERVICES</p>
                            </div>
                        </div>
                        <nav className="hidden md:flex gap-8 items-center font-semibold text-lg">
                            <a href="#services" className="hover:text-blue-700 transition">Servicios</a>
                            <a href="#agents" className="hover:text-blue-700 transition">Agentes</a>
                            <a href="#contact" className="hover:text-blue-700 transition" onClick={e => {e.preventDefault();setShowContact(true);}}>Contacto</a>
                            <a href="#appointment" className="hover:text-blue-700 transition" onClick={e => {e.preventDefault();setShowAppointment(true);}}>Cita</a>
                            <a href="#apply" className="hover:text-orange-500 transition" onClick={e => {e.preventDefault();setShowAgentForm(true);}}>Sé Agente</a>
                            <LanguageSwitcher />
                            <button className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-6 py-2 rounded-full font-bold shadow-lg hover:scale-105 hover:from-orange-600 hover:to-blue-700 transition-all duration-200" onClick={() => setShowContact(true)}>Cotiza</button>
                        </nav>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="flex-1 flex flex-col justify-center items-center text-center py-24 px-4 bg-gradient-to-br from-blue-100/60 to-orange-100/40">
                    <h2 className="text-5xl md:text-6xl font-extrabold text-blue-800 mb-6 drop-shadow-lg leading-tight">Tu aliado en protección y aventura</h2>
                    <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-2xl">Cobertura integral para tu salud, vida, bienes y viajes. Experiencias inolvidables. Todo en un solo lugar.</p>
                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                        <button className="bg-blue-700 text-white px-10 py-4 rounded-xl font-bold text-xl hover:bg-blue-800 shadow-xl transition-all duration-200" onClick={() => setShowAppointment(true)}>Solicita Consulta</button>
                        <button className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-10 py-4 rounded-xl font-bold text-xl hover:from-orange-600 hover:to-blue-700 shadow-xl transition-all duration-200" onClick={() => setShowContact(true)}>Cotiza</button>
                    </div>
                </section>

                {/* Services Section */}
                <section id="services" className="max-w-7xl mx-auto py-20 px-4">
                    <h3 className="text-4xl font-bold text-blue-800 mb-12 text-center tracking-tight">Nuestros Servicios</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {SERVICES.map(service => {
                            const Icon = SERVICE_ICONS[service.icon] || SERVICE_ICONS.default;
                            return (
                                <div key={service.id} className={`relative bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center text-center border-t-8 ${service.brandColor === 'blue' ? 'border-blue-500' : service.brandColor === 'orange' ? 'border-orange-500' : 'border-green-500'} hover:scale-105 hover:shadow-blue-200 transition-all duration-200 group`}> 
                                    <span className={`absolute -top-6 left-1/2 -translate-x-1/2 rounded-full p-3 shadow-lg ${service.brandColor === 'blue' ? 'bg-blue-100' : service.brandColor === 'orange' ? 'bg-orange-100' : 'bg-green-100'}`}>
                                        <Icon className={`h-10 w-10 ${service.brandColor === 'blue' ? 'text-blue-600' : service.brandColor === 'orange' ? 'text-orange-500' : 'text-green-600'}`} />
                                    </span>
                                    <h4 className="text-2xl font-bold mb-2 mt-6 group-hover:text-blue-700 transition">{service.title.en}</h4>
                                    <p className="text-gray-600 mb-4 min-h-[60px]">{service.description.en}</p>
                                    <button className="mt-4 bg-gradient-to-r from-blue-600 to-orange-500 text-white px-6 py-2 rounded-full font-semibold shadow hover:from-blue-700 hover:to-orange-600 transition-all duration-200" onClick={() => setShowContact(true)}>Solicitar información</button>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Agents Section */}
                <section id="agents" className="max-w-7xl mx-auto py-20 px-4">
                    <h3 className="text-4xl font-bold text-orange-500 mb-12 text-center tracking-tight">Nuestros Agentes</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                        {AGENTS.map(agent => {
                            const localPhoto = agent.npn ? `/agents/${agent.npn}.jpg` : null;
                            return (
                                <div key={agent.email} className="bg-white rounded-3xl shadow-xl p-8 flex flex-col items-center text-center border border-blue-100 hover:scale-105 hover:shadow-orange-100 transition-all duration-200">
                                    <img
                                        src={localPhoto || agent.avatarUrl || '/avatar.svg'}
                                        alt={agent.name}
                                        className="h-24 w-24 rounded-full object-cover mb-4 border-4 border-blue-200 shadow-lg"
                                        onError={e => { if (agent.avatarUrl) e.currentTarget.src = agent.avatarUrl; else e.currentTarget.src = '/avatar.svg'; }}
                                    />
                                    <h4 className="text-xl font-bold text-blue-700 mb-1">{agent.name}</h4>
                                    <span className="inline-block bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">{agent.location?.en}</span>
                                    <p className="text-gray-600 mb-2 font-medium">{agent.title?.en}</p>
                                    <a href={`mailto:${agent.email}`} className="text-orange-500 font-semibold underline mb-2">{agent.email}</a>
                                    <button className="bg-gradient-to-r from-orange-500 to-blue-600 text-white px-5 py-2 rounded-full font-semibold shadow hover:from-orange-600 hover:to-blue-700 transition-all duration-200" onClick={() => { setSelectedAgent(agent); setShowAgentContact(true); }}>Contactar</button>
                                </div>
                            );
                        })}
                    </div>
                </section>

            {/* Formularios y Modales */}
            <AgentContactModal isOpen={showAgentContact} onClose={() => setShowAgentContact(false)} agent={selectedAgent} />
            <AppointmentModal isOpen={showAppointment} onClose={() => setShowAppointment(false)} />
            {showAgentForm && <AgentApplicationForm onGoHome={() => setShowAgentForm(false)} />}
            <ContactModal isOpen={showContact} onClose={() => setShowContact(false)} />

            {/* Footer */}
            <footer className="bg-white border-t border-blue-100 py-8 mt-8">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2">
                        <Logo className="h-8 w-8" />
                        <span className="text-blue-700 font-bold text-lg">INSURANCE MULTISERVICES</span>
                    </div>
                    <div className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} All rights reserved.</div>
                </div>
            </footer>
        </div>
    );
}

export default App;