"use client";
import React, { useEffect, useState } from "react";

// Define the props interface
interface AlertProps {
    message: string;
    isVisible: boolean;
    onClose: () => void;
}

const Alert: React.FC<AlertProps> = ({ message, isVisible, onClose }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    return (
        <div
            className={`fixed bottom-0 left-0 m-4 flex items-center justify-center transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ zIndex: 1000 }}
        >
            <div className="bg-red-500 flex flex-col items-center justify-center w-64 h-32 rounded-lg p-4">
                <p className="text-white text-lg text-center">{message}</p>
                <button
                    className="mt-2 bg-white text-red-500 rounded px-4 py-2"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Alert;