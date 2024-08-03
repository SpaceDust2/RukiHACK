'use client';

import React from 'react';

const TaskList: React.FC<{ tasks: any[] }> = ({ tasks }) => {
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Список заданий</h2>
      {tasks.length === 0 ? (
        <p>Нет заданий.</p>
      ) : (
        <ul className="space-y-4">
          {tasks.map((task: any) => (
            <li key={task.id} className="border p-4 rounded-lg shadow">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">Status: {task.status}</p>
              <div>
                <h4 className="text-md font-semibold">Applicants:</h4>
                {task.applicants.length === 0 ? (
                  <p>No applicants.</p>
                ) : (
                  <ul className="space-y-2">
                    {task.applicants.map((applicant: any) => (
                      <li key={applicant.id} className="border p-2 rounded-lg shadow">
                        <p><strong>Name:</strong> {applicant.name}</p>
                        <p><strong>Email:</strong> {applicant.email}</p>
                        <button
                          onClick={() => viewApplicant(applicant.id)}
                          className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded-lg"
                        >
                          View
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

// Function to view applicant details (to be implemented)
const viewApplicant = (applicantId: number) => {
  // Handle viewing applicant details, possibly navigate to a new page or show a modal
  console.log('View applicant:', applicantId);
};

export default TaskList;
