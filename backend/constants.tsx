import React from 'react';
import { ServiceItem, Agent, Review } from './types';

// Main Service Icons
const HealthIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
const LifeIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
);
const MedicareIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h6m-6 4h6m-6 4h6" />
    </svg>
);
const DentalIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
);
const VisionIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);
const PropertyIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
);
const TravelIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);
const DefaultIcon = ({ className }: { className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`h-8 w-8 ${className}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v1h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h2V5z" /></svg>
);

export const SERVICE_ICONS: { [key: string]: React.FC<{ className?: string }> } = {
  health: HealthIcon,
  life: LifeIcon,
  medicare: MedicareIcon,
  dental: DentalIcon,
  vision: VisionIcon,
  property: PropertyIcon,
  travel: TravelIcon,
  default: DefaultIcon,
};

// Feature Icons for Service Pages
const FeatureIconShield = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944L12 23l9-2.056A12.02 12.02 0 0021 7.944a11.955 11.955 0 01-4.382-3.016z" /></svg>);
const FeatureIconFamily = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97M15 21h6m-6-15h6m-6 15v-1a6 6 0 016-6v6m-6 0H3m12 0h6" /></svg>);
const FeatureIconNetwork = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const FeatureIconPiggyBank = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>);
const FeatureIconDocument = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>);

export const FEATURE_ICONS: { [key: string]: React.FC } = {
  shield: FeatureIconShield,
  family: FeatureIconFamily,
  network: FeatureIconNetwork,
  piggybank: FeatureIconPiggyBank,
  document: FeatureIconDocument,
};

export const AI_AVATAR_SOFIA = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj48ZGVmcz48bGluaWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwJSIgeTE9IjAlIiB4Mj0iMTAwJSIgeTI9IjEwMCUiPjxzdG9wIG9mZnNldD0iMCUiIHN0b3AtY29sb3I9IiMyNTYzZWIiLz48c3RvcCBvZmZzZXQ9IjEwMCUiIHN0b3AtY29sb3I9IiNmOTczMTYiLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48Y2lyY2xlIGN4PSI1MCUiIGN5PSI1MCUiIHI9IjUwJSIgZmlsbD0iI2Y5ZmFmYiIvPjxwYXRoIGQ9Ik0zMCw3MCBDNDAsNjAgNjAsNjAgNzAsNzAgQzgwLDgwIDcwLDkwIDUwLDkwIEMzMCw5MCAyMCw4MCAzMCw3MCBaIiBmaWxsPSJ1cmwoI2cpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLCAxMCkiLz48cGF0aCBkPSJNNTAsMTUgQzQwLDI1IDYwLDI1IDUwLDE1IFEzMCw0MCA1MCw2NSBRNzAsNDAgNTAsMTUgWiIgZmlsbD0iIzExMTgyNyIvPjxwYXRoIGQ9Ik01MCw0MCBBMTgsMTggMCAwLDEgNTAsNzAgQTE4LDE4IDAgMCwxIDUwLDQwIiBmaWxsPSIjZjllYmU4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgwLCAtNSkiLz48Y2lyY2xlIGN4PSI0MCIgY3k9IjQ1IiByPSI0IiBmaWxsPSIjMTExODI3Ii8+PGNpcmNsZSBjeD0iNjAiIGN5PSI0NSIgcj0iNCIgZmlsbD0iIzExMTgyNyIvPjxwYXRoIGQ9Ik00NSw2MCBDNTAsNTUgNTUsNjAgNDUsNjBaIiBmaWxsPSIjZTE1ZDU1Ii8+PC9zdmc+";

export const SERVICES: ServiceItem[] = [
  {
    id: 'health-insurance',
    brandColor: 'blue',
    icon: 'health',
    title: { en: "Health Insurance", es: "Seguro de Salud" },
    description: { en: "Comprehensive health plans to protect you and your family's well-being.", es: "Planes de salud integrales para proteger tu bienestar y el de tu familia." },
    details: { en: "Finding the right health insurance can be complex. We simplify the process...", es: "Encontrar el seguro de salud adecuado puede ser complejo. Simplificamos el proceso..." },
    pageHeroImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAgT/xAAgEAABBAIBBQAAAAAAAAAAAAABAAIDEQQFEhMhQXGB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAgH/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDmaXpPZYe2ST02k9JzcbE6Fz2hwJBoij2fX1lZE/mSR+N5sALR5qgLqgChgJ//9k=",
    pageSubtitle: { en: "Affordable, comprehensive coverage for peace of mind.", es: "Cobertura asequible y completa para tu tranquilidad." },
    keyFeatures: [
        { icon: 'network', title: { en: "Wide Network of Providers", es: "Amplia Red de Proveedores" }, description: { en: "Access to thousands of doctors, specialists, and hospitals nationwide.", es: "Acceso a miles de médicos, especialistas y hospitales en todo el país." } },
        { icon: 'shield', title: { en: "Preventive Care", es: "Atención Preventiva" }, description: { en: "Most plans cover preventive services like check-ups, screenings, and vaccines at no extra cost.", es: "La mayoría de los planes cubren servicios preventivos como chequeos, exámenes y vacunas sin costo adicional." } },
        { icon: 'piggybank', title: { en: "Affordable Options", es: "Opciones Asequibles" }, description: { en: "We'll help you find a plan that fits your budget, including options with subsidies and tax credits.", es: "Te ayudaremos a encontrar un plan que se ajuste a tu presupuesto, incluyendo opciones con subsidios y créditos fiscales." } },
    ],
    whoIsThisFor: [
        { en: "Individuals & families seeking coverage.", es: "Individuos y familias que buscan cobertura." },
        { en: "Self-employed professionals and freelancers.", es: "Profesionales autónomos y freelancers." },
        { en: "People changing jobs or losing employer coverage.", es: "Personas que cambian de trabajo o pierden la cobertura del empleador." },
    ],
    howItWorks: [
        { en: "Tell us about your needs and budget.", es: "Cuéntanos sobre tus necesidades y presupuesto." },
        { en: "We compare plans from top carriers.", es: "Comparamos planes de las principales aseguradoras." },
        { en: "You choose the best plan and we help you enroll.", es: "Eliges el mejor plan y te ayudamos a inscribirte." },
    ],
  },
  {
    id: 'life-insurance',
    brandColor: 'orange',
    icon: 'life',
    title: { en: "Life Insurance", es: "Seguro de Vida" },
    description: { en: "Secure your family's future with our flexible life insurance policies.", es: "Asegura el futuro de tu familia con nuestras flexibles pólizas de seguro de vida." },
    details: { en: "Life insurance is a fundamental part of financial planning...", es: "El seguro de vida es una parte fundamental de la planificación financiera..." },
    pageHeroImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAABAf/xAAeEAABBQEAAwEAAAAAAAAAAAABAAIDBAUREhMhIv/EABUBAQEAAAAAAAAAAAAAAAAAAAEF/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AnS4zO4yMs/sTfY6rTq0vO3zG+S4mNjhZ5+S9/aU4bWpS4hYj6gV4hQn/2gA//9k=",
    pageSubtitle: { en: "Protect what matters most with a policy that's right for you.", es: "Protege lo que más importa con una póliza adecuada para ti." },
    keyFeatures: [
        { icon: 'family', title: { en: "Family Protection", es: "Protección Familiar" }, description: { en: "Provide a financial safety net to cover expenses like mortgages, college tuition, and daily living costs.", es: "Proporciona una red de seguridad financiera para cubrir gastos como hipotecas, matrícula universitaria y costos de vida diarios." } },
        { icon: 'piggybank', title: { en: "Affordable Premiums", es: "Primas Asequibles" }, description: { en: "Term life insurance offers significant coverage at a low cost, making it accessible for any budget.", es: "El seguro de vida a término ofrece una cobertura significativa a bajo costo, haciéndolo accesible para cualquier presupuesto." } },
        { icon: 'document', title: { en: "Tax-Free Benefit", es: "Beneficio Libre de Impuestos" }, description: { en: "The death benefit is generally paid to your beneficiaries tax-free.", es: "El beneficio por fallecimiento generalmente se paga a tus beneficiarios libre de impuestos." } },
    ],
    whoIsThisFor: [
        { en: "New parents and growing families.", es: "Nuevos padres y familias en crecimiento." },
        { en: "Homeowners with a mortgage.", es: "Propietarios con una hipoteca." },
        { en: "Business owners protecting their legacy.", es: "Dueños de negocios que protegen su legado." },
    ],
    howItWorks: [
        { en: "Discuss your financial goals with our expert.", es: "Discute tus metas financieras con nuestro experto." },
        { en: "We customize policy options (Term, Whole, etc.).", es: "Personalizamos las opciones de póliza (Término, Entera, etc.)." },
        { en: "Select your coverage and secure your family's future.", es: "Selecciona tu cobertura y asegura el futuro de tu familia." },
    ],
  },
  {
    id: 'medicare',
    brandColor: 'green',
    icon: 'medicare',
    title: { en: "Medicare", es: "Medicare" },
    description: { en: "Navigate Medicare with ease. We help you find the right supplement plan.", es: "Navega por Medicare con facilidad. Te ayudamos a encontrar el plan suplementario adecuado." },
    details: { en: "Understanding Medicare options can be overwhelming...", es: "Entender las opciones de Medicare puede ser abrumador..." },
    pageHeroImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECCP/EAB8QAAMAAwACAwEAAAAAAAAAAAABAgMEAAURIRITBv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwC9t4W1pDnpR3ZJ5YkG/oY5J19S1m2vQ6m3q8f5wE3rBq2Xw8nB+xxKklK1Jq6s61r6GgH//2Q==",
    pageSubtitle: { en: "Expert guidance to help you make confident Medicare decisions.", es: "Orientación experta para ayudarte a tomar decisiones de Medicare con confianza." },
    keyFeatures: [
        { icon: 'document', title: { en: "Clear Up Confusion", es: "Aclara la Confusión" }, description: { en: "We explain Parts A, B, C (Advantage), and D in simple terms so you can understand your options.", es: "Explicamos las Partes A, B, C (Advantage) y D en términos simples para que puedas entender tus opciones." } },
        { icon: 'shield', title: { en: "Fill Coverage Gaps", es: "Cubre las Brechas de Cobertura" }, description: { en: "Find Medicare Supplement (Medigap) or Advantage plans to cover out-of-pocket costs.", es: "Encuentra planes de Suplemento de Medicare (Medigap) o Advantage para cubrir los costos de bolsillo." } },
        { icon: 'network', title: { en: "Prescription Drug Plans", es: "Planes de Medicamentos Recetados" }, description: { en: "Ensure your medications are covered with a standalone Part D plan or an Advantage plan.", es: "Asegúrate de que tus medicamentos estén cubiertos con un plan de la Parte D o un plan Advantage." } },
    ],
    whoIsThisFor: [
        { en: "People turning 65 or new to Medicare.", es: "Personas que cumplen 65 años o son nuevas en Medicare." },
        { en: "Retirees looking to review their current coverage.", es: "Jubilados que buscan revisar su cobertura actual." },
        { en: "Those seeking to lower their healthcare costs in retirement.", es: "Aquellos que buscan reducir sus costos de atención médica en la jubilación." },
    ],
    howItWorks: [
        { en: "Schedule a no-cost Medicare consultation.", es: "Programa una consulta de Medicare sin costo." },
        { en: "We analyze your healthcare and prescription needs.", es: "Analizamos tus necesidades de atención médica y recetas." },
        { en: "We help you enroll in the best-fit plan during your enrollment period.", es: "Te ayudamos a inscribirte en el plan que mejor se adapte durante tu período de inscripción." },
    ],
  },
  {
    id: 'dental-insurance',
    brandColor: 'blue',
    icon: 'dental',
    title: { en: "Dental Insurance", es: "Seguro Dental" },
    description: { en: "Keep your smile bright with our affordable dental coverage options.", es: "Mantén tu sonrisa brillante con nuestras asequibles opciones de cobertura dental." },
    details: { en: "Good oral health is crucial for overall well-being...", es: "Una buena salud bucal es crucial para el bienestar general..." },
    pageHeroImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECCP/EAB8QAQABBAIDAQAAAAAAAAAAAAEAAgMEEQUSEyFRgf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDPsNq213Jbds8Q9k2LqF3LuB8Wxj5KAVgKiJ//2Q==",
    pageSubtitle: { en: "Comprehensive plans for a healthy smile and a happy wallet.", es: "Planes integrales para una sonrisa saludable y una billetera feliz." },
    keyFeatures: [
        { icon: 'shield', title: { en: "Preventive Care Coverage", es: "Cobertura de Cuidado Preventivo" }, description: { en: "Most plans cover 100% of routine cleanings, exams, and x-rays.", es: "La mayoría de los planes cubren el 100% de las limpiezas de rutina, exámenes y radiografías." } },
        { icon: 'document', title: { en: "Basic & Major Services", es: "Servicios Básicos y Mayores" }, description: { en: "Get coverage for fillings and extractions, plus major work like crowns, bridges, and root canals.", es: "Obtén cobertura para empastes y extracciones, además de trabajos mayores como coronas, puentes y endodoncias." } },
        { icon: 'network', title: { en: "Large Dentist Networks", es: "Grandes Redes de Dentistas" }, description: { en: "Choose from a wide network of participating dentists to find one that's convenient for you.", es: "Elige entre una amplia red de dentistas participantes para encontrar uno que sea conveniente para ti." } },
    ],
    whoIsThisFor: [
        { en: "Anyone without dental coverage through an employer.", es: "Cualquier persona sin cobertura dental a través de un empleador." },
        { en: "Families looking to manage dental costs for their children.", es: "Familias que buscan gestionar los costos dentales de sus hijos." },
        { en: "Retirees whose dental benefits have ended.", es: "Jubilados cuyos beneficios dentales han finalizado." },
    ],
    howItWorks: [
        { en: "Tell us who needs coverage (individual, couple, or family).", es: "Dinos quién necesita cobertura (individual, pareja o familia)." },
        { en: "We compare PPO, HMO, and indemnity plans.", es: "Comparamos planes PPO, HMO y de indemnización." },
        { en: "Enroll in minutes and start using your benefits.", es: "Inscríbete en minutos y comienza a usar tus beneficios." },
    ],
  },
  {
    id: 'vision-insurance',
    brandColor: 'orange',
    icon: 'vision',
    title: { en: "Vision Insurance", es: "Seguro de Visión" },
    description: { en: "Clear vision is essential. Find the perfect plan for your eye care needs.", es: "Una visión clara es esencial. Encuentra el plan perfecto para tus necesidades de cuidado ocular." },
    details: { en: "Protect your eyesight with our comprehensive vision insurance plans...", es: "Protege tu vista con nuestros completos planes de seguro de visión..." },
    pageHeroImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECCP/EACAQAAICAgICAwAAAAAAAAAAAAECAwQAEQUhEhNRYYH/xAAVAQEBAAAAAAAAAAAAAAAAAAAABP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANj+H2K1GvLXrL227DEgDsG39HjNs2w0cNK8gZVAJBHXGZ7dWeJvLYlkUEhS+wD6OAVYoQgCqB/g4B//9k=",
    pageSubtitle: { en: "Affordable plans to help you see clearly and stay healthy.", es: "Planes asequibles para ayudarte a ver con claridad y mantenerte saludable." },
    keyFeatures: [
        { icon: 'document', title: { en: "Annual Eye Exams", es: "Exámenes Anuales de la Vista" }, description: { en: "Coverage for comprehensive eye exams to detect vision problems and health issues early.", es: "Cobertura para exámenes de la vista completos para detectar problemas de visión y de salud a tiempo." } },
        { icon: 'shield', title: { en: "Allowances for Glasses & Contacts", es: "Subsidios para Gafas y Lentes de Contacto" }, description: { en: "Get a fixed dollar amount or a percentage off the cost of new frames, lenses, and contact lenses.", es: "Obtén una cantidad fija en dólares o un porcentaje de descuento en el costo de nuevas monturas, lentes y lentes de contacto." } },
        { icon: 'network', title: { en: "Access to Top Retailers", es: "Acceso a los Mejores Minoristas" }, description: { en: "Use your benefits at thousands of in-network private practices and optical retailers.", es: "Usa tus beneficios en miles de consultorios privados y ópticas dentro de la red." } },
    ],
    whoIsThisFor: [
        { en: "Individuals who wear glasses or contact lenses.", es: "Personas que usan gafas o lentes de contacto." },
        { en: "Families with children who need regular eye exams.", es: "Familias con niños que necesitan exámenes de la vista regulares." },
        { en: "Anyone who wants to save money on their annual eye care.", es: "Cualquier persona que quiera ahorrar dinero en su cuidado ocular anual." },
    ],
    howItWorks: [
        { en: "Review your eye care needs with our team.", es: "Revisa tus necesidades de cuidado ocular con nuestro equipo." },
        { en: "We find plans with the right allowances and network for you.", es: "Encontramos planes con los subsidios y la red adecuados para ti." },
        { en: "Enroll easily and schedule your next eye exam.", es: "Inscríbete fácilmente y programa tu próximo examen de la vista." },
    ],
  },
  {
    id: 'property-casualty',
    brandColor: 'green',
    icon: 'property',
    title: { en: "Property & Casualty", es: "Seguro de Propiedad y Accidentes" },
    description: { en: "Protect your home, auto, and valuable assets from the unexpected.", es: "Protege tu hogar, auto y bienes valiosos de lo inesperado." },
    details: { en: "Your home and vehicle are some of your biggest investments...", es: "Tu hogar y tu vehículo son algunas de tus mayores inversiones..." },
    pageHeroImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAgMF/8QAIRAAAgEEAgMBAAAAAAAAAAAAAQIRAAMEIQUSMSNBUWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AybJ4vC3uJ27tkEkd61T3L+VjK2V7d0yPQUY4m5bXD2i5LFIJM6mhq+ZcdWf/Q==",
    pageSubtitle: { en: "Essential coverage for your most valuable assets.", es: "Cobertura esencial para tus bienes más valiosos." },
    keyFeatures: [
        { icon: 'shield', title: { en: "Homeowners Insurance", es: "Seguro de Propietarios" }, description: { en: "Protect your dwelling, personal property, and liability from events like fire, theft, and storms.", es: "Protege tu vivienda, propiedad personal y responsabilidad civil de eventos como incendios, robos y tormentas." } },
        { icon: 'document', title: { en: "Auto Insurance", es: "Seguro de Auto" }, description: { en: "Get the right liability, collision, and comprehensive coverage to stay safe on the road.", es: "Obtén la cobertura de responsabilidad, colisión y completa adecuada para mantenerte seguro en la carretera." } },
        { icon: 'piggybank', title: { en: "Bundle & Save", es: "Combina y Ahorra" }, description: { en: "Combine your home and auto policies with the same carrier to unlock significant discounts.", es: "Combina tus pólizas de hogar y auto con la misma aseguradora para desbloquear descuentos significativos." } },
    ],
    whoIsThisFor: [
        { en: "First-time and long-time homeowners.", es: "Propietarios de vivienda por primera vez y de toda la vida." },
        { en: "All vehicle owners and drivers.", es: "Todos los propietarios y conductores de vehículos." },
        { en: "Renters who need to protect their personal belongings.", es: "Inquilinos que necesitan proteger sus pertenencias personales." },
    ],
    howItWorks: [
        { en: "We assess your property and vehicle details.", es: "Evaluamos los detalles de tu propiedad y vehículo." },
        { en: "We shop multiple carriers to find the best rates and coverage.", es: "Buscamos en múltiples aseguradoras para encontrar las mejores tarifas y cobertura." },
        { en: "You get peace of mind knowing your assets are protected.", es: "Obtienes tranquilidad sabiendo que tus bienes están protegidos." },
    ],
  },
  {
    id: 'travel-services',
    brandColor: 'blue',
    icon: 'travel',
    title: { en: "Travel Services", es: "Servicios de Viaje" },
    description: { en: "Explore the world with peace of mind. We offer travel packages and insurance.", es: "Explora el mundo con tranquilidad. Ofrecemos paquetes de viaje y seguros." },
    details: { en: "Adventure awaits! Whether you're planning a family vacation...", es: "¡La aventura te espera! Ya sea que estés planeando unas vacaciones familiares..." },
    pageHeroImage: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAKABQDASIAAhEBAxEB/8QAFwAAAwEAAAAAAAAAAAAAAAAAAAECCP/EAB8QAAMAAwEAAgMAAAAAAAAAAAECAwQABREGEiExUf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwDQ8b0Xp1aK1ZUKGAIOz9HGTn8VWYmvSqx42BODvjMu/k6xJq1q8isD0VYAj5OH2K1Y0laVSwHIIOxxBv/2Q==",
    pageSubtitle: { en: "From booking your dream vacation to protecting it.", es: "Desde reservar las vacaciones de tus sueños hasta protegerlas." },
    keyFeatures: [
        { icon: 'network', title: { en: "Vacation Packages", es: "Paquetes de Vacaciones" }, description: { en: "Let us plan your perfect trip, from all-inclusive resorts and cruises to custom itineraries.", es: "Permítenos planificar tu viaje perfecto, desde resorts todo incluido y cruceros hasta itinerarios personalizados." } },
        { icon: 'shield', title: { en: "Travel Insurance", es: "Seguro de Viaje" }, description: { en: "Protect your investment with coverage for trip cancellation, medical emergencies, and lost baggage.", es: "Protege tu inversión con cobertura para cancelación de viaje, emergencias médicas y pérdida de equipaje." } },
        { icon: 'document', title: { en: "Expert Planning", es: "Planificación Experta" }, description: { en: "Save time and stress. Our travel experts handle all the details so you can just relax and enjoy.", es: "Ahorra tiempo y estrés. Nuestros expertos en viajes se encargan de todos los detalles para que tú solo te relajes y disfrutes." } },
    ],
    whoIsThisFor: [
        { en: "Families planning their annual vacation.", es: "Familias que planean sus vacaciones anuales." },
        { en: "Couples looking for a romantic getaway or honeymoon.", es: "Parejas que buscan una escapada romántica o luna de miel." },
        { en: "Anyone traveling abroad who needs medical and cancellation coverage.", es: "Cualquier persona que viaje al extranjero y necesite cobertura médica y de cancelación." },
    ],
    howItWorks: [
        { en: "Share your dream destination and travel dates.", es: "Comparte el destino de tus sueños y las fechas de viaje." },
        { en: "We present you with curated travel options and insurance plans.", es: "Te presentamos opciones de viaje seleccionadas y planes de seguro." },
        { en: "You pack your bags, and we'll handle the rest!", es: "¡Tú haces las maletas y nosotros nos encargamos del resto!" },
    ],
  }
];

export const AGENTS: Agent[] = [
  { 
    name: "Juan Grandal Blanco", 
    location: { en: "Tampa", es: "Tampa" }, 
    avatarUrl: "https://ui-avatars.com/api/?name=Juan+Grandal+Blanco&background=EBF4FF&color=2563EB&bold=true",
    title: { en: "Agency Owner", es: "Dueño de la Agencia" },
    email: "juan.grandal@insurancemultiservices.com",
    phone: "8138506235",
    npn: "20826990",
    states: ["AZ", "FL", "IL", "NC", "NE", "TX", "VA"]
  },
  { 
    name: "Ines Hernandez Pina", 
    location: { en: "Jacksonville", es: "Jacksonville" }, 
    avatarUrl: "https://ui-avatars.com/api/?name=Ines+Hernandez&background=EBF4FF&color=2563EB&bold=true",
    email: "rociovenus@yahoo.es",
    phone: "7272734016",
    npn: "20847082",
    states: ["FL", "TX"]
  },
  { 
    name: "Maritza Velazquez Turruelles", 
    location: { en: "Naples & Fort Myers", es: "Naples y Fort Myers" }, 
    avatarUrl: "https://ui-avatars.com/api/?name=Maritza+Velazquez&background=EBF4FF&color=2563EB&bold=true",
    email: "maritza196052@gmail.com",
    phone: "2392003643",
    npn: "20973893",
    states: ["FL"]
  },
  { 
    name: "Islan Garriga", 
    location: { en: "St. Petersburg", es: "St. Petersburg" }, 
    avatarUrl: "https://ui-avatars.com/api/?name=Islan+Garriga&background=EBF4FF&color=2563EB&bold=true",
    email: "igarriga84@gmail.com",
    phone: "7277174098",
    npn: "21081383",
    states: ["AZ", "FL", "TX"]
  },
  { 
    name: "Odalis Torres Trujillo", 
    location: { en: "Valrico, Brandon & Riverview", es: "Valrico, Brandon y Riverview" }, 
    avatarUrl: "https://ui-avatars.com/api/?name=Odalis+Torres&background=EBF4FF&color=2563EB&bold=true",
    email: "odalistt24.insurance@gmail.com",
    phone: "3153953632",
    npn: "21376467",
    states: ["FL", "NE", "TX"]
  },
  { 
    name: "Lienis Daimi Rodriguez Morales", 
    location: { en: "Miami", es: "Miami" }, 
    avatarUrl: "https://ui-avatars.com/api/?name=Lienis+Rodriguez&background=EBF4FF&color=2563EB&bold=true",
    email: "daimirodriguezinsurance@yahoo.com",
    phone: "7863806335",
    npn: "19741097",
    states: []
  },
  { 
    name: "Mara Rodriguez", 
    location: { en: "Tampa & Lehigh Acres", es: "Tampa y Lehigh Acres" }, 
    avatarUrl: "https://ui-avatars.com/api/?name=Mara+Rodriguez&background=EBF4FF&color=2563EB&bold=true",
    email: "mara.rodriguez@insurancemultiservices.com",
    phone: "8135550101",
    npn: "21000001",
    states: ["FL"]
  },
  { 
    name: "Yudeymy Garcia Martin", 
    location: { en: "Tampa", es: "Tampa" }, 
    avatarUrl: "https://ui-avatars.com/api/?name=Yudeymy+Garcia&background=EBF4FF&color=2563EB&bold=true",
    email: "yudyloyaltyinsurance@gmail.com",
    phone: "7044193739",
    npn: "21162350",
    states: ["FL", "NC", "TX"]
  },
  { 
    name: "Yosvanys Ramon Guerra Valverde", 
    location: { en: "Tampa", es: "Tampa" }, 
    avatarUrl: "https://ui-avatars.com/api/?name=Yosvanys+Guerra&background=EBF4FF&color=2563EB&bold=true",
    email: "flbluemultiservices@gmail.com",
    phone: "8134102175",
    npn: "20330256",
    states: ["FL"]
  },
];

const generateReviews = (): Review[] => {
    const reviews: Review[] = [];

    const firstNames = ["Luis", "Sofia", "Mateo", "Isabella", "Daniel", "Maria", "Javier", "Camila", "Carlos", "Ana", "David", "Laura", "Ricardo", "Elena", "Jorge", "Lucia", "Michael", "Jessica", "Chris", "Amanda", "Robert", "Emily", "Miguel", "Valentina", "Alejandro", "Gabriela", "Fernando", "Valeria", "Antonio", "Beatriz", "William", "Olivia", "James", "Sophia", "Ben", "Chloe", "Oscar", "Mia"];
    const lastNames = ["Garcia", "Perez", "Rodriguez", "Smith", "Gonzalez", "Hernandez", "Lopez", "Martinez", "Jones", "Williams", "Brown", "Davis", "Miller", "Wilson", "Taylor", "Clark", "Walker", "Hall", "Allen", "Young", "Sanchez", "Ramirez", "Torres", "Flores", "Rivera", "Gomez", "Diaz", "Cruz", "Ortiz", "Reyes"];

    const quoteTemplates = [
        {
            en: "was incredibly patient, walking me through every single option until I felt confident in my choice. As someone new to buying my own insurance, {agentFirstName}'s guidance was invaluable.",
            es: "fue increíblemente paciente, explicándome cada opción hasta que me sentí seguro con mi elección. Como alguien nuevo en la compra de mi propio seguro, la guía de {agentFirstName} fue invaluable."
        },
        {
            en: "I'm a freelancer, and figuring out health insurance was my biggest headache. {agentFirstName} not only found me a fantastic plan with great coverage but also made it affordable. A total lifesaver!",
            es: "Soy freelancer y descifrar el seguro de salud era mi mayor dolor de cabeza. {agentFirstName} no solo me encontró un plan fantástico con gran cobertura, sino que también lo hizo asequible. ¡Me salvó la vida!"
        },
        {
            en: "After my old health plan was discontinued, I was lost. {agentFirstName} stepped in, simplified everything, and found me better coverage for less than I was paying before. I'm so grateful.",
            es: "Después de que mi antiguo plan de salud fue descontinuado, estaba perdido. {agentFirstName} intervino, simplificó todo y me encontró una mejor cobertura por menos de lo que pagaba antes. Estoy muy agradecido."
        },
        {
            en: "The best part about working with {agentFirstName} was the communication. They were always available to answer my calls and emails, no matter how small the question. It's rare to find that level of dedication.",
            es: "La mejor parte de trabajar con {agentFirstName} fue la comunicación. Siempre estuvieron disponibles para responder mis llamadas y correos, sin importar cuán pequeña fuera la pregunta. Es raro encontrar ese nivel de dedicación."
        },
        {
            en: "Our family just grew, and we needed to update our health plan. {agentFirstName} was so understanding of our needs and found a policy that covers our little one perfectly. We feel so much more secure now.",
            es: "Nuestra familia acaba de crecer y necesitábamos actualizar nuestro plan de salud. {agentFirstName} fue muy comprensivo con nuestras necesidades y encontró una póliza que cubre a nuestro pequeño perfectamente. Ahora nos sentimos mucho más seguros."
        },
        {
            en: "I had a policy with another company and was paying way too much. {agentFirstName} did a full review and found me a comparable plan that saved me over $100 a month. Truly amazing work.",
            es: "Tenía una póliza con otra compañía y estaba pagando demasiado. {agentFirstName} hizo una revisión completa y me encontró un plan comparable que me ahorró más de $100 al mes. Un trabajo realmente increíble."
        },
        {
            en: "{agentFirstName} explained all the confusing insurance terms in a way I could actually understand. No jargon, just clear, honest advice. I finally feel like I know what my plan covers.",
            es: "{agentFirstName} me explicó todos los confusos términos de seguros de una manera que realmente pude entender. Sin jerga, solo consejos claros y honestos. Finalmente siento que sé lo que cubre mi plan."
        },
        {
            en: "The entire process, from the first call to getting my insurance cards, was seamless. {agentFirstName} handled everything efficiently and kept me updated. 10/10 service.",
            es: "Todo el proceso, desde la primera llamada hasta recibir mis tarjetas de seguro, fue impecable. {agentFirstName} manejó todo de manera eficiente y me mantuvo actualizado. Servicio 10/10."
        },
        {
            en: "I was worried I wouldn't qualify for good coverage due to a pre-existing condition. {agentFirstName} was reassuring and found me a great plan that met all my needs. Thank you!",
            es: "Me preocupaba no calificar para una buena cobertura debido a una condición preexistente. {agentFirstName} fue tranquilizador y me encontró un gran plan que cumplía con todas mis necesidades. ¡Gracias!"
        },
        {
            en: "It's clear that {agentFirstName} genuinely cares about their clients. They weren't just trying to sell me something; they were focused on finding the right solution for my situation.",
            es: "Está claro que {agentFirstName} realmente se preocupa por sus clientes. No solo intentaban venderme algo; estaban enfocados en encontrar la solución adecuada para mi situación."
        },
        {
            en: "I recently changed jobs and lost my employer's coverage. {agentFirstName} helped me navigate the marketplace and get insured quickly so there was no gap in my coverage. So helpful!",
            es: "Recientemente cambié de trabajo y perdí la cobertura de mi empleador. {agentFirstName} me ayudó a navegar por el mercado y a asegurarme rápidamente para que no hubiera una interrupción en mi cobertura. ¡Muy útil!"
        },
        {
            en: "Professional, knowledgeable, and incredibly friendly. {agentFirstName} made what I thought would be a stressful process easy and straightforward. I highly recommend their services.",
            es: "Profesional, conocedor e increíblemente amable. {agentFirstName} hizo que lo que pensé que sería un proceso estresante fuera fácil y directo. Recomiendo encarecidamente sus servicios."
        },
        {
            en: "Even after I was signed up, {agentFirstName} followed up to make sure I understood how to use my new benefits. That extra step showed me they really value their clients.",
            es: "Incluso después de inscribirme, {agentFirstName} hizo un seguimiento para asegurarse de que entendía cómo usar mis nuevos beneficios. Ese paso adicional me demostró que realmente valoran a sus clientes."
        },
        {
            en: "I needed a plan that included good dental and vision, and {agentFirstName} found the perfect bundled option for me. It's great to have everything covered under one affordable plan.",
            es: "Necesitaba un plan que incluyera un buen seguro dental y de visión, y {agentFirstName} encontró la opción de paquete perfecta para mí. Es genial tener todo cubierto bajo un solo plan asequible."
        },
        {
            en: "Fast and efficient service. I contacted them on a Monday and had my new health insurance policy active by Friday. {agentFirstName} works quickly!",
            es: "Servicio rápido y eficiente. Los contacté un lunes y para el viernes ya tenía activa mi nueva póliza de seguro de salud. ¡{agentFirstName} trabaja rápido!"
        },
        {
            en: "As a small business owner, I needed a health plan for myself and my family. {agentFirstName} understood the challenges and found a solution that fit my budget perfectly.",
            es: "Como propietario de una pequeña empresa, necesitaba un plan de salud para mí y mi familia. {agentFirstName} entendió los desafíos y encontró una solución que se ajustaba perfectamente a mi presupuesto."
        },
        {
            en: "I appreciated how {agentFirstName} presented multiple options and clearly laid out the pros and cons of each. It made me feel empowered to make the best decision.",
            es: "Aprecié cómo {agentFirstName} presentó múltiples opciones y expuso claramente los pros y los contras de cada una. Me hizo sentir empoderado para tomar la mejor decisión."
        },
        {
            en: "The peace of mind I have now, knowing my family is protected, is priceless. A huge thank you to {agentFirstName} for their expert guidance and support.",
            es: "La tranquilidad que tengo ahora, sabiendo que mi familia está protegida, no tiene precio. Un enorme agradecimiento a {agentFirstName} por su experta orientación y apoyo."
        },
        {
            en: "{agentFirstName} is an absolute professional. They know the insurance landscape inside and out and used that knowledge to find me an amazing deal.",
            es: "{agentFirstName} es un profesional absoluto. Conocen el panorama de los seguros por dentro y por fuera y usaron ese conocimiento para encontrarme una oferta increíble."
        },
        {
            en: "From start to finish, the experience was positive. {agentFirstName} was responsive, honest, and truly listened to my concerns. I've already recommended them to friends.",
            es: "De principio a fin, la experiencia fue positiva. {agentFirstName} fue receptivo, honesto y realmente escuchó mis preocupaciones. Ya los he recomendado a mis amigos."
        }
    ];

    const shuffledQuotes = [...quoteTemplates];
    // Shuffle the array to get more randomness
    for (let i = shuffledQuotes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledQuotes[i], shuffledQuotes[j]] = [shuffledQuotes[j], shuffledQuotes[i]];
    }

    const agentNames = AGENTS.map(agent => agent.name);
    const usedNames = new Set<string>();

    for (let i = 0; i < 200; i++) {
        const agentName = agentNames[i % agentNames.length];
        const agentFirstName = agentName.split(' ')[0];
        
        let clientName = '';
        // Ensure client names are somewhat unique for the first batch
        do {
            const clientFirstName = firstNames[Math.floor(Math.random() * firstNames.length)];
            const clientLastName = lastNames[Math.floor(Math.random() * lastNames.length)];
            clientName = `${clientFirstName} ${clientLastName.charAt(0)}.`;
        } while (usedNames.has(clientName) && usedNames.size < firstNames.length * lastNames.length * 0.5);
        usedNames.add(clientName);
        
        // Use a template, looping through the shuffled list
        const template = shuffledQuotes[i % shuffledQuotes.length];
        const stars = Math.random() < 0.9 ? 5 : 4; // 90% 5-star, 10% 4-star

        reviews.push({
            stars,
            quote: {
                en: template.en.replace(/{agentFirstName}/g, agentFirstName),
                es: template.es.replace(/{agentFirstName}/g, agentFirstName),
            },
            name: clientName,
            agent: agentName,
            service: { en: "Health Insurance", es: "Seguro de Salud" },
        });
    }
    
    // Final shuffle to randomize agent order etc.
    return reviews.sort(() => 0.5 - Math.random());
};

export const REVIEWS: Review[] = generateReviews();

export const CARRIERS = [
    { name: 'Aetna', logoUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAwIDMwMCI+PHBhdGggZmlsbD0iIzAzMiIgaWQ9ImEiIGQ9Ik0wIDE0MC43bDcuMy0yMS44aDMwLjNsNy4zIDIxLjhIMDB6bS4yIDIyLjJoNDQuOWwxNC4yIDQyLjdoLTMxbC0zLjgtMTEuOGgtMTVsLTMuOCAxMS44aC0zMUwwIDIwNS40ek0xNDMuMyAxMTAuM2wzMS4zIDk0LjNoLTQxLjdsLTkuMS0yNy4yaC0zMC4zbC05IDI3LjJoLTQxLjdsMzEtOTQuM2g3MC41ek0xNzAgMTg0LjJsLTgtMjQuMWgtMzAuNGwtOCA0IDguM3oiLz48cGF0aCBmaWxsPSIjMDY5IiBkPSJNMzYwLjIgMTM0LjVsOC45LTI0LjJoMzAuM2w4LjggMjQuMmgzN2wtNDEuNS0xMjQuNWgtNzEuM0wyODQgMjA1LjRoMzguMmwxMy43LTQwLjUgMTIuMyA0MC41aDMzLjV6TTE1OS4zIDExMC4zbDIwLjUgNjFjMi4zLTYuOSAxMy4yLTM5LjQgMTMuMi0zOS40bDE4LjQtNTUuNGgxLjVsLTI3LjYgODIuM2gtMjAuMWwtMzQuMy0xMDQuMmgzOC4xbDIwIDY1LjR6Ii8+PHVzZSB4PSI0MTYuMyIgeT0iMCIgaHJlZj0iI2EiLz48cGF0aCBmaWxsPSIjMDY5IiBkPSJNMjU3LjIgMTg0LjJsLTIuNy04LjFoLTMwLjRsLTIuNiA4LjFoLTM3LjlsMzMuOC0xMDQuMmg0Mi44bDM0LjIgMTA0LjJoLTM3LjJ6bS0xNy43LTI0LjFsLTggMjQuMWgtMzAuNGwtOC4xLTI0LjEgOC4xLTI0aDMwLjRsOCAyNHpNMjQ4LjIgMTEwLjNsLTMzLjkgMTA0LjJoLTM3LjlsMzMuOS0xMDQuMmgzNy45ek01MDYuOSAxNDAuN2w3LjItMjEuOGgzMC4zbDcuMyAyMS44aC00NC44em0uMSAyMi4yaDQ0LjhsMTQuMyA0Mi43aC0zMGwtMy44LTExLjhoLTE1bC0zLjggMTEuOGgtMzFMNTA3IDIwNS40ek01NDYuNCAxMTAuM2wzMS40IDk0LjNoLTQxLjdsLTkuMS0yNy4yaC0zMC4zbC05IDI3LjJoLTQxLjdsMzEtOTQuM2g3MC41ek01NzIuNyAxODQuMmwtOC0yNC4xaC0zMC40bC04IDI0LjFoNDYuNHoiLz48cGF0aCBmaWxsPSIjMDY5IiBkPSJNNjUyLjQgMTg0LjJsLTguMS0yNC4xIDguMS0yNC4xaDMyLjVsNS4zIDE2LjFoMzUuN2wtMzctMTA0LjJoLTYzLjlsLTM3LjcgMTEyLjFoMzdsNy44LTIzLjNoMjkuM3ptNDMuMy0zNS42bC01LjItMTUuOWgtMjQuOWwtNS4zIDE1LjlIMjk4LjZ6TTM2MC4yIDEzNC41bDguOS0yNC4yaDMwLjNsOC44IDI0LjJINTIuOWwtNDEuNS0xMjQuNWgtNzEuM0wyODQgMjA1LjRoMzguMmwxMy43LTQwLjUgMTIuMyA0MC41aDMzLjV6TTM3My45IDExMC4zbDIwLjUgNjFjMi4zLTYuOSAxMy4yLTM5LjQgMTMuMi0zOS40bDE4LjQtNTUuNGgxLjVsLTI3LjYgODIuM2gtMjAuMWwtMzQuMy0xMDQuMmgzOC4xbDIwIDY1LjR6TTc4MSAxNDAuN2w3LjMtMjEuOGgzMC4zbDcuMyAyMS44aC00NC45ek03ODEuMyAyMDUuNGwzMS4zLTk0LjNoNzAuNWwzMSA5NC4zaC00MS43bC05LjEtMjcuMmgtMzAuM2wtOSAyNy4yaC00MS43em01NC44LTQwLjVsLTgtMjQuMWgtMzAuNGwtOCA0LjFoNDYuNHoiLz48cGF0aCBmaWxsPSIjMDM0IiBkPSJNMjg0IDIwNS40aDM4LjJsMTMuNy00MC41IDEyLjMgNDAuNWgzMy41bC00MS41LTEyNC41aC03MS4zTDQxLjUgMjA1LjRoMzguMnoiLz48L3N2Zz4=' },
    { name: 'Ambetter', logoUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA5NiA5NiI+PHBhdGggZmlsbD0iIzAwOWRkYiIgZD0iTTgxLjcgNzVoLTEybDEwLjktMTEuMmMxLjQtMS41IDIuMi0zLjUgMi4yLTUuNnMtLjgtNC4xLTIuMi01LjZDOC45IDQ1LjYgNzYuMSA0NSA3My4zIDQ1aC0xNmMtNi4xIDAtMTEuMSA1LTExLjEgMTEuMXYyOC44YzAgNi4xIDUgMTEuMSAxMS4xIDExLjFoMzMuM3YtMjZ6Ii8+PHBhdGggZmlsbD0iIzAwN2FiZCIgZD0iTTczLjMgMzBIMzguOUMzMi45IDMwIDI4IDM1IDIgNDAuOUMyOCAyOC44IDMyLjkgMjQgMzguOSAyNGg0MC45bC0zLjMgNi4xLTMuMi0uMXoiLz48cGF0aCBmaWxsPSIjZmY5ZTAwIiBkPSJNMzEuNyA2MEgzMS42Yy02LjEgMC0xMS4xLTUtMTEuMS0xMS4xVjIwLjdDMjAuNSA5IDI4IDcgMzEuNSA3YzUuNyAwIDkuOCA0LjIgMTAuNyA5LjRoMS43QzQ0LjggOS4zIDM4LjggNCAzMS41IDRjLTguMSAwLTE0LjYgNi41LTE0LjYgMTQuNlYzOGgtMi4xdjQuMmgxMS41di0xMS4yYzAtMi45LTEuMy01LjYtMy40LTcuNEMyMy4xIDIyIDIwLjUgMjEgMTcgMjFoMy4xdjI4LjljMCA2LjEgNSA5LjEgMTEuMSA5LjFoLjF2LTl6Ii8+PC9zdmc+' },
    { name: 'Cigna', logoUrl: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAyMCI+PHBhdGggZmlsbD0iIzZmYTgyMyIgZD0iTTIzLjIgNS45YzAgMi43LTEuNyA0LjktNC4yIDQuOWgtNC4zYy0uMi0uMS0uMy0uMi0uNS0uNGwtLjctLjYtMS4xLS45Yy0uMy0uMy0uOC0uMy0xLjEgMC0uMy4zLS4zLjggMCAxLjFsMS45IDEuNmMxLjggMS42IDQuMiAyLjUgNi44IDIuNWg0LjNjMi41IDAgNC4yLTEuOSA0LjItNC45IDAtMy0yLjUtNC45LTQuMi00LjktMS44IDAtMy4yIDEuNS00LjIgMy41LS4xLjItLjMuMy0uNC41LS4zLjYtLjUgMS4yLS41IDEuOXoiLz48cGF0aCBmaWxsPSIjMDcxYzdiIiBkPSJNOC42IDE0LjFjMC0yLjcgMS43LTQuOSA0LjItNC45aDQuM2MuMi4xLjQuMi41LjRsLjcuNiAxLjEuOWMuMy4zLjguMyAxLjEgMCAuMy0uMy4zLS44IDAtMS4xbC0xLjktMS42Yy0xLjgtMS42LTQuMi0yLjUtNi44LTIuNWgtNC4zYy0yLjUgMC00LjIgMS45LTQuMiA0LjkgMCAzIDIuNSA0LjkgNC4yIDQuOSAxLjggMCAzLjItMS41IDQuMi0zLjUuMS0uMi4zLS4zLjQtLjUuMy0uNi41LTEuMi41LTEuOXoiLz48L3N2Zz4=' },
    { name: 'UnitedHealthcare', logoUrl: 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjUwIDUyIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCwgMCkiPgogICAgICAgIDxwYXRoIGQ9Ik00OS41MiwyNC4zOGEyLjUsMi41LDAsMCwwLTIuNDktMi4yOEg0Ljk0QTIuNSwyLjUsMCwwLDAsMi40OCwyNC40VjQ2LjY2YTIuNSwyLjUsMCwwLDAsMi41LDIuNUg0N2EyLjUsMi41LDAsMCwwLDIuNS0yLjVWDI0LjRoMFoiIGZpbGw9IiMwMDUwOWUiPjwvcGF0aD4KICAgICAgICA8cGF0aCBkPSJNMjUuOTIsMEEyNS40MywyNS40MywwLDAsMCw2LjIsMTAuNjV2MTJoMzkuNFYxMC42NUEyNS40MywyNS40MywwLDAsMCwyNS45MiwwWiIgZmlsbD0iIzAwM0M3MSI+PC9wYXRoPgogICAgICAgIDxwYXRoIGQ9Ik0yNiwzOC44YTEyLDEyLDAsMCwxLTEyLTEydi0xMkgzOHYxMkExMiwxMiwwLDAsMSwyNiwzOC44WiIgZmlsbD0iI2ZmZiI+PC9wYXRoPgogICAgPC9nPgogICAgPHRleHQgeD0iNjAiIHk9IjM1IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMjQiIGZpbGw9IiMwMDNDN0EiIGZvbnQtd2VpZ2h0PSJib2xkIj5Vbml0ZWRIZWFsdGhjYXJlPC90ZXh0Pgo8L3N2Zz4=' },
];