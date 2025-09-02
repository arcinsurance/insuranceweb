/// <reference types="vite/client" />

// Temporary shims so TS stops complaining about local modules during partial workspace loads
declare module './components/*';
declare module './components/admin/*';
declare module './contexts/*';
declare module './constants';
declare module './types';
