import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Agent, ServiceItem, Lead, ApplicationSubmission, AgentApplicationData, Appointment } from '../types';
import { SERVICES as initialServices, AGENTS as initialAgents } from '../constants';

interface DataContextType {
  agents: Agent[];
  services: ServiceItem[];
  leads: Lead[];
  applications: ApplicationSubmission[];
  appointments: Appointment[];
  addLead: (leadData: Partial<Omit<Lead, 'id' | 'timestamp'>>) => Promise<void>;
  addApplication: (appData: AgentApplicationData) => void;
  addAppointment: (appData: Partial<Omit<Appointment, 'id' | 'timestamp'>>) => void;
  addService: (newService: ServiceItem) => void;
  updateService: (updatedService: ServiceItem) => void;
  deleteService: (serviceId: string) => void;
  addAgent: (newAgent: Agent) => void;
  updateAgent: (updatedAgent: Agent) => void;
  deleteAgent: (agentNpn: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper function to get initial state from localStorage or fallback
const getInitialState = <T,>(key: string, fallback: T): T => {
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
    } catch (error) {
        console.error(`Error parsing ${key} from localStorage`, error);
    }
    return fallback;
};

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [agents, setAgents] = useState<Agent[]>(() => getInitialState('agents', initialAgents));
  const [services, setServices] = useState<ServiceItem[]>(() => getInitialState('services', initialServices));
  const [leads, setLeads] = useState<Lead[]>(() => getInitialState('leads', []));
  const [applications, setApplications] = useState<ApplicationSubmission[]>(() => getInitialState('applications', []));
  const [appointments, setAppointments] = useState<Appointment[]>(() => getInitialState('appointments', []));


  // Effects to save state changes to localStorage
  useEffect(() => { localStorage.setItem('leads', JSON.stringify(leads)); }, [leads]);
  useEffect(() => { localStorage.setItem('applications', JSON.stringify(applications)); }, [applications]);
  useEffect(() => { localStorage.setItem('services', JSON.stringify(services)); }, [services]);
  useEffect(() => { localStorage.setItem('agents', JSON.stringify(agents)); }, [agents]);
  useEffect(() => { localStorage.setItem('appointments', JSON.stringify(appointments)); }, [appointments]);


  const addLead = async (leadData: Partial<Omit<Lead, 'id' | 'timestamp'>>) => {
    const newLead: Lead = {
      id: new Date().toISOString() + Math.random(),
      timestamp: new Date().toISOString(),
      name: leadData.name || '',
      email: leadData.email || '',
      phone: leadData.phone || '',
      type: leadData.type || 'General',
      ...leadData,
    };
    
    // 1. Optimistically update the UI. The lead is saved immediately.
    setLeads(prev => [newLead, ...prev]);

    // 2. Then, try to send the email notification in the background.
    // This won't block the UI or fail lead creation if the email fails.
    try {
        const response = await fetch('/api/send-lead-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            // Pass the new lead and the list of agents for email lookup
            body: JSON.stringify({ lead: newLead, agents: agents }),
        });

        if (!response.ok) {
            // The server responded with an error status (4xx or 5xx)
            console.error('Email notification failed:', await response.json());
        }
    } catch (error) {
        // A network error occurred
        console.error('Error calling email API:', error);
    }
  };

  const addApplication = (appData: AgentApplicationData) => {
    const newApplication: ApplicationSubmission = {
      id: new Date().toISOString() + Math.random(),
      timestamp: new Date().toISOString(),
      data: appData,
    };
    setApplications(prev => [newApplication, ...prev]);
  };

  const addAppointment = (appData: Partial<Omit<Appointment, 'id' | 'timestamp'>>) => {
    const newAppointment: Appointment = {
        id: new Date().toISOString() + Math.random(),
        timestamp: new Date().toISOString(),
        name: appData.name || '',
        email: appData.email || '',
        phone: appData.phone || '',
        serviceOfInterest: appData.serviceOfInterest || 'General Inquiry',
    };
    setAppointments(prev => [newAppointment, ...prev]);
  };

  const addService = (newService: ServiceItem) => {
    setServices(prevServices => [newService, ...prevServices]);
  };

  const updateService = (updatedService: ServiceItem) => {
    setServices(prevServices => prevServices.map(service => service.id === updatedService.id ? updatedService : service));
  };

  const deleteService = (serviceId: string) => {
    setServices(prevServices => prevServices.filter(service => service.id !== serviceId));
  };

  const addAgent = (newAgent: Agent) => {
    setAgents(prevAgents => [newAgent, ...prevAgents]);
  };

  const updateAgent = (updatedAgent: Agent) => {
    // Agents don't have a unique ID, using npn as it should be unique
    setAgents(prevAgents => prevAgents.map(agent => agent.npn === updatedAgent.npn ? updatedAgent : agent));
  };

  const deleteAgent = (agentNpn: string) => {
    setAgents(prevAgents => prevAgents.filter(agent => agent.npn !== agentNpn));
  };

  const value = {
    agents,
    services,
    leads,
    applications,
    appointments,
    addLead,
    addApplication,
    addAppointment,
    addService,
    updateService,
    deleteService,
    addAgent,
    updateAgent,
    deleteAgent,
  };

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};