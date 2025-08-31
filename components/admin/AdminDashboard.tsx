import React from 'react';
import { useData } from '../../contexts/DataContext';

const StatCard = ({ title, value, iconPath }: { title: string, value: number, iconPath: string }) => (
     <div className="bg-white overflow-hidden shadow rounded-lg">
        <div className="p-5">
            <div className="flex items-center">
                <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={iconPath} />
                    </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                    <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
                        <dd className="text-3xl font-semibold text-gray-900">{value}</dd>
                    </dl>
                </div>
            </div>
        </div>
    </div>
);


const AdminDashboard = () => {
    const { leads, applications, agents, services, appointments } = useData();
    return (
        <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">Overview of your website's data and content.</p>

            <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                <StatCard title="Total Leads" value={leads.length} iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                <StatCard title="Agent Applications" value={applications.length} iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                 <StatCard title="Appointments" value={appointments.length} iconPath="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                <StatCard title="Registered Agents" value={agents.length} iconPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97M15 21h6m-6-15h6m-6 15v-1a6 6 0 016-6v6m-6 0H3m12 0h6" />
                <StatCard title="Available Services" value={services.length} iconPath="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </div>

             <div className="mt-8 bg-white shadow rounded-lg p-6">
                <h2 className="text-lg font-medium text-gray-900">Welcome to the Admin Panel</h2>
                <p className="mt-2 text-sm text-gray-600">
                    From here you can manage all aspects of your website.
                </p>
                <ul className="mt-4 list-disc list-inside space-y-2 text-sm text-gray-600">
                    <li><b>Leads:</b> View all contact form submissions from potential clients.</li>
                    <li><b>Applications:</b> Review applications from potential new agents.</li>
                    <li><b>Appointments:</b> Check all the appointment requests from clients.</li>
                    <li><b>Manage Profiles:</b> Update information for your current agents.</li>
                    <li><b>Manage Services:</b> Modify the details and content of the services you offer.</li>
                </ul>
            </div>
        </div>
    );
};

export default AdminDashboard;