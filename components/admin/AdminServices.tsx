import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { ServiceItem, KeyFeature, LocalizedString } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { SERVICE_ICONS } from '../../constants';

const emptyService: ServiceItem = {
    id: '',
    brandColor: 'blue',
    icon: 'default', // Use string identifier
    title: { en: '', es: '' },
    description: { en: '', es: '' },
    details: { en: '', es: '' },
    pageHeroImage: '',
    pageSubtitle: { en: '', es: '' },
    keyFeatures: [],
    whoIsThisFor: [],
    howItWorks: [],
};

const ServiceEditModal = ({ service, mode, onClose, onSave }: { service: ServiceItem, mode: 'create' | 'edit', onClose: () => void, onSave: (service: ServiceItem) => void }) => {
    const [formData, setFormData] = useState(service);
    const isCreating = mode === 'create';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const keys = name.split('.');
        if (keys.length === 2) {
             const [key, lang] = keys as [keyof ServiceItem, 'en' | 'es'];
             setFormData(prev => ({ 
                 ...prev, 
                 [key]: { ...(prev[key] as object), [lang]: value } 
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>, field: 'whoIsThisFor' | 'howItWorks') => {
        const { value } = e.target;
        const [lang] = e.target.name.split('.');
        const lines = value.split('\n');
        
        const updatedArray: LocalizedString[] = lines.map((line, index) => {
           const existing = formData[field][index] || { en: '', es: '' };
           return { ...existing, [lang]: line };
        });

        setFormData(prev => ({ ...prev, [field]: updatedArray }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        let finalData = { ...formData };
        if (isCreating) {
            const newId = finalData.title.en.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
            // Set default key features with string icons
            const defaultKeyFeatures: KeyFeature[] = [
                { icon: 'shield', title: {en: 'Feature 1', es: 'Característica 1'}, description: {en: 'Description', es: 'Descripción'}},
                { icon: 'network', title: {en: 'Feature 2', es: 'Característica 2'}, description: {en: 'Description', es: 'Descripción'}},
                { icon: 'piggybank', title: {en: 'Feature 3', es: 'Característica 3'}, description: {en: 'Description', es: 'Descripción'}},
            ];
            finalData = { ...finalData, id: newId, icon: 'default', keyFeatures: defaultKeyFeatures };
        }
        onSave(finalData);
    }

    return (
         <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative mx-auto border w-full max-w-4xl shadow-lg rounded-md bg-white">
                <form onSubmit={handleSubmit} className="p-5">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">{isCreating ? 'Create New Service' : `Edit Service: ${service.title.en}`}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto p-2">
                        <input type="text" name="title.en" value={formData.title.en} onChange={handleChange} placeholder="Title (EN)" className="p-2 border rounded" required />
                        <input type="text" name="title.es" value={formData.title.es} onChange={handleChange} placeholder="Title (ES)" className="p-2 border rounded" required />
                        <textarea name="description.en" value={formData.description.en} onChange={handleChange} placeholder="Short Description (EN)" className="p-2 border rounded md:col-span-1 h-24" />
                        <textarea name="description.es" value={formData.description.es} onChange={handleChange} placeholder="Short Description (ES)" className="p-2 border rounded md:col-span-1 h-24" />
                        <input type="text" name="pageSubtitle.en" value={formData.pageSubtitle.en} onChange={handleChange} placeholder="Page Subtitle (EN)" className="p-2 border rounded" />
                        <input type="text" name="pageSubtitle.es" value={formData.pageSubtitle.es} onChange={handleChange} placeholder="Page Subtitle (ES)" className="p-2 border rounded" />
                        
                        <div className="md:col-span-2"><hr className="my-2"/></div>

                        <textarea name="whoIsThisFor.en" value={formData.whoIsThisFor.map(i => i.en).join('\n')} onChange={(e) => handleArrayChange(e, 'whoIsThisFor')} placeholder="Who is this for? (EN, one per line)" className="p-2 border rounded md:col-span-1 h-32" />
                        <textarea name="whoIsThisFor.es" value={formData.whoIsThisFor.map(i => i.es).join('\n')} onChange={(e) => handleArrayChange(e, 'whoIsThisFor')} placeholder="¿Para quién es esto? (ES, uno por línea)" className="p-2 border rounded md:col-span-1 h-32" />

                        <textarea name="howItWorks.en" value={formData.howItWorks.map(i => i.en).join('\n')} onChange={(e) => handleArrayChange(e, 'howItWorks')} placeholder="How it works (EN, one per line)" className="p-2 border rounded md:col-span-1 h-32" />
                        <textarea name="howItWorks.es" value={formData.howItWorks.map(i => i.es).join('\n')} onChange={(e) => handleArrayChange(e, 'howItWorks')} placeholder="¿Cómo funciona? (ES, uno por línea)" className="p-2 border rounded md:col-span-1 h-32" />
                        
                        <div className="md:col-span-2 text-sm text-gray-500">Note: Icons & Key Features are not editable in this simplified CMS. Defaults will be used for new services.</div>

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

const AdminServices = () => {
    const { services, addService, updateService, deleteService } = useData();
    const { user } = useAuth();
    const [modalState, setModalState] = useState<{ mode: 'edit' | 'create' | 'closed', service?: ServiceItem }>({ mode: 'closed' });

    const handleSave = (serviceData: ServiceItem) => {
        if (modalState.mode === 'create') {
            addService(serviceData);
        } else if (modalState.mode === 'edit') {
            updateService(serviceData);
        }
        setModalState({ mode: 'closed' });
    };

    const handleDelete = (serviceId: string) => {
        if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
            deleteService(serviceId);
        }
    };
    
    return (
        <div>
             <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Manage Services</h1>
                    <p className="mt-1 text-sm text-gray-600">Manage the content of your service pages.</p>
                </div>
                 {user.role === 'admin' && (
                    <button 
                        onClick={() => setModalState({ mode: 'create', service: emptyService })}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700"
                    >
                        Add New Service
                    </button>
                )}
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map(service => {
                    const IconComponent = SERVICE_ICONS[service.icon] || SERVICE_ICONS.default;
                    return (
                        <div key={service.id} className="bg-white rounded-lg shadow p-4 flex flex-col">
                             <div className="flex items-start justify-between">
                                <h3 className="font-bold text-gray-900 mb-2">{service.title.en}</h3>
                                 <span className="text-gray-400">
                                    <IconComponent className="h-8 w-8 text-gray-400" />
                                 </span>
                             </div>
                             <p className="text-sm text-gray-600 flex-grow mb-4">{service.description.en}</p>
                             <div className="mt-auto pt-4 border-t flex space-x-2">
                                {user.role === 'admin' && (
                                    <>
                                        <button onClick={() => setModalState({ mode: 'edit', service })} className="w-full text-sm text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 rounded py-1 px-3">Edit</button>
                                        <button onClick={() => handleDelete(service.id)} className="w-full text-sm text-red-600 hover:text-red-900 bg-red-100 hover:bg-red-200 rounded py-1 px-3">Delete</button>
                                    </>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
             {modalState.mode !== 'closed' && <ServiceEditModal service={modalState.service!} mode={modalState.mode} onClose={() => setModalState({ mode: 'closed' })} onSave={handleSave} />}
        </div>
    );
};

export default AdminServices;