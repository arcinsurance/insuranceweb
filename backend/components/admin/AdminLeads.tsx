import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { Lead } from '../../types';

const sourceColors: { [key: string]: string } = {
    Website: 'bg-blue-100 text-blue-800',
    Referral: 'bg-green-100 text-green-800',
    Facebook: 'bg-indigo-100 text-indigo-800',
    TikTok: 'bg-pink-100 text-pink-800',
    Instagram: 'bg-purple-100 text-purple-800',
    Other: 'bg-gray-100 text-gray-800',
};
const defaultColor = 'bg-gray-100 text-gray-800';

const AdminLeads = () => {
    const { leads } = useData();
    const [sourceFilter, setSourceFilter] = useState('all');

    const sources = ['all', ...Array.from(new Set(leads.map(l => l.source).filter(Boolean)))];

    const filteredLeads = leads.filter(lead => 
        sourceFilter === 'all' || lead.source === sourceFilter
    );

    return (
         <div>
            <div className="flex justify-between items-center flex-wrap gap-4">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900">Leads</h1>
                    <p className="mt-1 text-sm text-gray-600">Here are all the leads submitted through your website's contact forms.</p>
                </div>
                <div>
                    <label htmlFor="sourceFilter" className="block text-sm font-medium text-gray-700">Filter by source</label>
                    <select 
                        id="sourceFilter" 
                        name="sourceFilter" 
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        value={sourceFilter}
                        onChange={(e) => setSourceFilter(e.target.value)}
                    >
                        {sources.map(source => (
                            <option key={source} value={source}>{source === 'all' ? 'All Sources' : source}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Source</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {filteredLeads.length > 0 ? filteredLeads.map((lead: Lead) => (
                                        <tr key={lead.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(lead.timestamp).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lead.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div>{lead.email}</div>
                                                <div>{lead.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {lead.source && (
                                                     <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${sourceColors[lead.source] || defaultColor}`}>
                                                        {lead.source}
                                                     </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    lead.type === 'General' ? 'bg-blue-100 text-blue-800' : 
                                                    lead.type === 'Agent' ? 'bg-green-100 text-green-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                                }`}>
                                                    {lead.type}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {lead.message || lead.coverage || lead.target}
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No leads found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLeads;