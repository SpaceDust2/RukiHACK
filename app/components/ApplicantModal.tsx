// components/ApplicantModal.tsx
"use client"
import React, { useState, useEffect } from 'react';

interface ApplicantModalProps {
  applicantId: string;
  onClose: () => void;
}

const ApplicantModal: React.FC<ApplicantModalProps> = ({ applicantId, onClose }) => {
  const [applicant, setApplicant] = useState(null);

  useEffect(() => {
    const fetchApplicantDetails = async () => {
      // Replace with actual API call
      const response = await fetch(`/api/applicants/${applicantId}`);
      const data = await response.json();
      setApplicant(data);
    };

    fetchApplicantDetails();
  }, [applicantId]);

  if (!applicant) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full max-h-90vh overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">{applicant.name}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          <img 
            src={applicant.avatar || '/default-avatar.png'} 
            alt={applicant.name} 
            className="w-32 h-32 rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600">Email: <span className="text-black">{applicant.email}</span></p>
          <p className="text-gray-600">Телефон: <span className="text-black">{applicant.phone}</span></p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Опыт работы</h3>
          <p className="text-gray-600">{applicant.experience}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Навыки</h3>
          <div className="flex flex-wrap">
            {applicant.skills.map((skill, index) => (
              <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2 mb-2 text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Образование</h3>
          <p className="text-gray-600">{applicant.education}</p>
        </div>
        {applicant.certifications && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Сертификаты</h3>
            <ul className="list-disc pl-5 text-gray-600">
              {applicant.certifications.split(',').map((cert, index) => (
                <li key={index}>{cert.trim()}</li>
              ))}
            </ul>
          </div>
        )}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200"
          >
            Закрыть
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantModal;