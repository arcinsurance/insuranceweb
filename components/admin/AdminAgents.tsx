import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Agent } from '../../types';
import { useAuth } from '../../contexts/AuthContext';

const emptyAgent: Agent = {
    name: '',
    location: { en: '', es: '' },
    avatarUrl: 'https://ui-avatars.com/api/?name=?&background=EBF4FF&color=2563EB&bold=true',
    title: { en: '', es: '' },
    email: '',
    phone: '',
    npn: '',
    states: [],
};

const AgentEditModal = ({ agent, mode, onClose, onSave }: { agent: Agent, mode: 'create' | 'edit', onClose: () => void, onSave: (agent: Agent) => void }) => {
    const [formData, setFormData] = useState(agent);
    const isCreating = mode === 'create';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === 'location.en' || name === 'location.es' || name === 'title.en' || name === 'title.es') {
             const [key, lang] = name.split('.');
             setFormData(prev => ({ ...prev, [key]: { ...(prev[key] as object), [lang]: value } }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, avatarUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    }

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative mx-auto border w-full max-w-2xl shadow-lg rounded-md bg-white">
                <form onSubmit={handleSubmit} className="p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{isCreating ? 'Create New Profile' : `Edit Profile: ${agent.name}`}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[70vh] overflow-y-auto p-2">
                        <div className="md:col-span-2 text-center">
                            <img src={formData.avatarUrl} alt="Avatar Preview" className="w-24 h-24 rounded-full mx-auto mb-2 object-cover bg-gray-200" />
                            <label htmlFor="avatar-upload" className="cursor-pointer text-sm text-blue-600 hover:text-blue-800 font-medium">
                                Upload Image
                            </label>
                            <input id="avatar-upload" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </div>
                        <div className="md:col-span-2">
                            <input type="text" name="avatarUrl" value={formData.avatarUrl} onChange={handleChange} placeholder="Or paste Avatar URL" className="w-full p-2 border rounded" />
                        </div>

                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="p-2 border rounded" required />
                        <input type="text" name="npn" value={formData.npn} onChange={handleChange} readOnly={!isCreating} placeholder="NPN" className={`p-2 border rounded ${!isCreating ? 'bg-gray-100' : ''}`} required />
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="p-2 border rounded" required/>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="p-2 border rounded" />
                        <input type="text" name="location.en" value={formData.location.en} onChange={handleChange} placeholder="Location (EN)" className="p-2 border rounded" />
                        <input type="text" name="location.es" value={formData.location.es} onChange={handleChange} placeholder="Location (ES)" className="p-2 border rounded" />
                        <input type="text" name="title.en" value={formData.title?.en || ''} onChange={handleChange} placeholder="Title (EN)" className="p-2 border rounded" />
                        <input type="text" name="title.es" value={formData.title?.es || ''} onChange={handleChange} placeholder="Title (ES)" className="p-2 border rounded" />
                        
                        <div className="md:col-span-2">
                            <input type="text" name="states" value={formData.states.join(', ')} onChange={e => setFormData(prev => ({...prev, states: e.target.value.split(',').map(s => s.trim().toUpperCase())}))} placeholder="States (e.g., FL, TX, AZ)" className="w-full p-2 border rounded" />
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4 pt-4 border-t">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save Changes</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

const AdminAgents = () => {
    const { agents, addAgent, updateAgent, deleteAgent } = useData();
    const { user } = useAuth();
    const [modalState, setModalState] = useState<{ mode: 'edit' | 'create' | 'closed', agent?: Agent }>({ mode: 'closed' });

    const handleSave = (agentData: Agent) => {
        if (modalState.mode === 'create') {
            addAgent(agentData);
        } else if (modalState.mode === 'edit') {
            updateAgent(agentData);
        }
        setModalState({ mode: 'closed' });
    };

    const handleDelete = (npn: string) => {
        if (window.confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
            deleteAgent(npn);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Manage Profiles</h1>
                    <p className="mt-1 text-sm text-gray-600">Manage your staff profiles.</p>
                </div>
                {user.role === 'admin' && (
                    <button 
                        onClick={() => setModalState({ mode: 'create', agent: emptyAgent })}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
                    >
                        Add New Profile
                    </button>
                )}
            </div>
             <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {agents.map(agent => (
                    <div key={agent.npn} className="bg-white rounded-lg shadow p-4 flex flex-col text-center">
                        <img src={agent.avatarUrl} alt={agent.name} className="w-20 h-20 rounded-full mx-auto mb-3 object-cover bg-gray-100" />
                        <h3 className="font-bold text-gray-900">{agent.name}</h3>
                        <p className="text-sm text-gray-500 mb-2">{agent.location.en}</p>
                        <p className="text-xs text-gray-400">NPN: {agent.npn}</p>
                        <div className="mt-auto pt-4 flex space-x-2">
                            {user.role === 'admin' && (
                                <>
                                    <button onClick={() => setModalState({ mode: 'edit', agent })} className="w-full text-sm text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 rounded py-1 px-3">Edit</button>
                                    <button onClick={() => handleDelete(agent.npn)} className="w-full text-sm text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 rounded py-1 px-3">Delete</button>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
            {modalState.mode !== 'closed' && (
                <AgentEditModal 
                    agent={modalState.agent!} 
                    mode={modalState.mode} 
                    onClose={() => setModalState({ mode: 'closed' })} 
                    onSave={handleSave} 
                />
            )}
        </div>
    );
};

export default AdminAgents;