import React, { useState } from 'react';
import { useData } from '../../contexts/DataContext';
import { ApplicationSubmission } from '../../types';

const AdminApplications = () => {
    const { applications } = useData();
    const [selectedApp, setSelectedApp] = useState<ApplicationSubmission | null>(null);

    const ApplicationDetailModal = ({ app, onClose }: { app: ApplicationSubmission, onClose: () => void }) => {
        if (!app) return null;
        const { data } = app;
        return (
             <div className="fixed inset-0 bg-gray-600 bg-opacity-75 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
                <div className="relative mx-auto border w-full max-w-3xl shadow-lg rounded-md bg-white">
                    <div className="p-5">
                        <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">Application Details for {data.firstName} {data.lastName}</h3>
                        <div className="mt-4 text-left space-y-4 max-h-[70vh] overflow-y-auto p-2">
                            <p><strong>Date Submitted:</strong> {new Date(app.timestamp).toLocaleString()}</p>
                            <p><strong>Email:</strong> {data.email}</p>
                            <p><strong>Phone:</strong> {data.phone}</p>
                            <p><strong>Address:</strong> {data.address1}, {data.address2} {data.city}, {data.state} {data.zip}</p>
                             <p><strong>Licensed:</strong> {data.isLicensed === 'yes' ? `Yes (NPN: ${data.npn})` : 'No'}</p>
                             <p><strong>Available to Start:</strong> {data.availabilityDate}</p>
                             <p><strong>Preferred Language:</strong> {data.preferredLanguage}</p>
                        </div>
                        <div className="items-center px-4 py-3 mt-4">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-300"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
         <div>
            <h1 className="text-2xl font-semibold text-gray-900">Agent Applications</h1>
            <p className="mt-1 text-sm text-gray-600">Review applications from potential new agents.</p>
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
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Licensed</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                        <th scope="col" className="relative px-6 py-3"><span className="sr-only">View</span></th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                     {applications.length > 0 ? applications.map((app) => (
                                        <tr key={app.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(app.timestamp).toLocaleString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{app.data.firstName} {app.data.lastName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <div>{app.data.email}</div>
                                                <div>{app.data.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                                    app.data.isLicensed === 'yes' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                }`}>
                                                    {app.data.isLicensed === 'yes' ? 'Yes' : 'No'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{app.data.city}, {app.data.state}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => setSelectedApp(app)} className="text-indigo-600 hover:text-indigo-900">View</button>
                                            </td>
                                        </tr>
                                     )) : (
                                        <tr>
                                            <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">No applications found.</td>
                                        </tr>
                                     )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {selectedApp && <ApplicationDetailModal app={selectedApp} onClose={() => setSelectedApp(null)} />}
        </div>
    );
};

export default AdminApplications;