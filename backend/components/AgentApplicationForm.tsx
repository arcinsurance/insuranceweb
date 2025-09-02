import React, { useState, useEffect } from 'react';
import { AgentApplicationData } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { useData } from '../contexts/DataContext';

interface AgentApplicationFormProps {
    onGoHome: () => void;
}

const initialFormData: AgentApplicationData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    isLicensed: 'no',
    npn: '',
    licenseNumber: '',
    preferredLanguage: '',
    certifyInfo: false,
    consentContact: false,
};

const FormStep = ({ currentStep, stepNumber, title, isCompleted }: { currentStep: number, stepNumber: number, title: string, isCompleted: boolean }) => {
    const isActive = currentStep === stepNumber;
    const isDone = isCompleted;

    return (
        <div className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-lg font-bold ${isDone ? 'bg-green-500 text-white' : isActive ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
                {isDone ? '✓' : stepNumber}
            </div>
            <span className={`ml-3 text-sm font-medium ${isActive || isDone ? 'text-gray-900' : 'text-gray-500'}`}>{title}</span>
        </div>
    );
};

const FormInput = ({ label, name, value, onChange, required = false, type = 'text', children, error = false }: any) => {
    const { t } = useLanguage();
    const id = `app-form-${name}`;
    const errorClasses = "border-red-500 ring-red-500";
    const defaultClasses = "border-gray-300 focus:ring-brand-blue";
    
    const finalClassName = `w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 ${error ? errorClasses : defaultClasses}`;

    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700">
                {label} {required && <span className="text-red-600">({t.app_required})</span>}
            </label>
            <div className="mt-1">
                {children ? (
                     React.cloneElement(children, { className: `${children.props.className} ${error ? errorClasses : defaultClasses}`})
                ) : (
                    <input
                        type={type}
                        id={id}
                        name={name}
                        value={value}
                        onChange={onChange}
                        required={required}
                        className={finalClassName}
                    />
                )}
            </div>
        </div>
    );
};


const AgentApplicationForm = ({ onGoHome }: AgentApplicationFormProps) => {
    const { t } = useLanguage();
    const { addApplication } = useData();
    const [step, setStep] = useState(1);
    const [completedSteps, setCompletedSteps] = useState<number[]>([]);
    const [formData, setFormData] = useState<AgentApplicationData>(initialFormData);
    const [errors, setErrors] = useState<Partial<Record<keyof AgentApplicationData, boolean>>>({});
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [step]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        
        if (name in errors) {
            setErrors(prev => ({...prev, [name]: false}));
        }

        if (name === 'certifyInfo' || name === 'consentContact') {
            setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const validateStep = (stepNum: number): boolean => {
        let requiredFields: (keyof AgentApplicationData)[] = [];
        const newErrors: Partial<Record<keyof AgentApplicationData, boolean>> = {};
        let isValid = true;

        switch (stepNum) {
            case 1:
                requiredFields = ['firstName', 'lastName', 'email', 'phone'];
                break;
            case 2:
                requiredFields = ['isLicensed'];
                if (formData.isLicensed === 'yes') {
                    requiredFields.push('npn', 'licenseNumber');
                }
                break;
            case 3:
                requiredFields = ['preferredLanguage', 'certifyInfo', 'consentContact'];
                break;
        }

        for (const field of requiredFields) {
            if (!formData[field]) {
                isValid = false;
                newErrors[field] = true;
            }
        }
        setErrors(newErrors);
        return isValid;
    };


    const nextStep = () => {
        if (validateStep(step)) {
            setCompletedSteps(prev => [...new Set([...prev, step])]);
            setStep(s => s + 1);
        }
    };

    const prevStep = () => setStep(s => s - 1);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep(4)) {
            return;
        }
        addApplication(formData);
        setSubmitted(true);
    };


    if (submitted) {
        return (
             <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 text-center">
                     <h2 className="text-2xl font-bold text-gray-900 mb-4">Application Submitted!</h2>
                     <p className="text-gray-600 mb-8">{t.form_thank_you}</p>
                     <button onClick={onGoHome} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                        {t.back_to_home}
                     </button>
                </div>
            </div>
        );
    }


    return (
        <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">{t.app_form_title}</h2>
                <form onSubmit={handleSubmit} noValidate>
                    {/* Step 1: Personal Information */}
                    {step === 1 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <FormInput label={t.app_first_name} name="firstName" value={formData.firstName} onChange={handleChange} required error={errors.firstName} />
                           <FormInput label={t.app_last_name} name="lastName" value={formData.lastName} onChange={handleChange} required error={errors.lastName} />
                           <FormInput label={t.app_email} name="email" value={formData.email} onChange={handleChange} required type="email" error={errors.email} />
                           <FormInput label={t.app_phone} name="phone" value={formData.phone} onChange={handleChange} required type="tel" error={errors.phone} />
                        </div>
                    )}

                    {/* Step 2: Professional Profile */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <FormInput label={t.app_is_licensed} name="isLicensed" value={formData.isLicensed} onChange={handleChange} required error={errors.isLicensed}>
                                <select id="app-form-isLicensed" name="isLicensed" value={formData.isLicensed} onChange={handleChange} required className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 bg-white">
                                    <option value="no">{t.app_is_licensed_no}</option>
                                    <option value="yes">{t.app_is_licensed_yes}</option>
                                </select>
                            </FormInput>

                            {formData.isLicensed === 'yes' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t">
                                    <FormInput label={t.app_npn} name="npn" value={formData.npn} onChange={handleChange} required error={errors.npn} />
                                    <FormInput label={t.app_license_number} name="licenseNumber" value={formData.licenseNumber} onChange={handleChange} required error={errors.licenseNumber} />
                                </div>
                            )}
                            {formData.isLicensed === 'no' && (
                                <div className="pt-4 border-t">
                                    <p className="text-brand-blue font-semibold mb-2">{t.app_no_license_invite || '¿No tienes licencia? Te invitamos a obtenerla con nuestro código de descuento:'}</p>
                                    <a href="https://partners.xcelsolutions.com/ims99" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline font-bold">https://partners.xcelsolutions.com/ims99</a>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 3: Submit Application */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <FormInput label={t.app_pref_lang} name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} required error={errors.preferredLanguage}>
                                 <select name="preferredLanguage" value={formData.preferredLanguage} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-blue bg-white">
                                    <option value="">{t.app_select}</option>
                                    <option value="English">English</option>
                                    <option value="Spanish">Español</option>
                                    <option value="Bilingual">Bilingual</option>
                                 </select>
                            </FormInput>
                            <div className="space-y-4 pt-4 border-t">
                               <div className="flex items-start">
                                   <input id="certifyInfo" name="certifyInfo" type="checkbox" checked={formData.certifyInfo} onChange={handleChange} className={`h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300 rounded mt-1 ${errors.certifyInfo ? 'ring-2 ring-red-500' : ''}`} />
                                   <label htmlFor="certifyInfo" className="ml-3 block text-sm text-gray-700">{t.app_certify}</label>
                               </div>
                               <div className="flex items-start">
                                   <input id="consentContact" name="consentContact" type="checkbox" checked={formData.consentContact} onChange={handleChange} className={`h-4 w-4 text-brand-blue focus:ring-brand-blue border-gray-300 rounded mt-1 ${errors.consentContact ? 'ring-2 ring-red-500' : ''}`} />
                                   <label htmlFor="consentContact" className="ml-3 block text-sm text-gray-700">{t.app_consent}</label>
                               </div>
                            </div>
                        </div>
                    )}

                    {/* Navigation Buttons */}
                    <div className="mt-12 flex justify-between items-center">
                        <button type="button" onClick={onGoHome} className="text-sm font-medium text-gray-600 hover:text-gray-900">{t.back_to_home}</button>
                        <div className="flex items-center space-x-4">
                            {step > 1 && (
                                <button type="button" onClick={prevStep} className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                                    {t.app_back}
                                </button>
                            )}
                            {step < 3 && (
                                <button type="button" onClick={nextStep} className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                                    {t.app_next}
                                </button>
                            )}
                            {step === 3 && (
                                <button type="submit" className="px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700">
                                    {t.app_submit}
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AgentApplicationForm;