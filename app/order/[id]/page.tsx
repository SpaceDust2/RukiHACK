// pages/order/[id].tsx
"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import ApplicantModal from "@/app/components/ApplicantModal";
import Sidebar from "@/app/components/Sidebar";

const OrderDetails: React.FC = () => {
    const params = useParams();
    const id = params.id as string;

    const [order, setOrder] = useState(null);
    const [applicants, setApplicants] = useState([]);
    const [selectedApplicant, setSelectedApplicant] = useState(null);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            // Replace with actual API calls
            const orderResponse = await fetch(`/api/orders/${id}`);
            const orderData = await orderResponse.json();
            setOrder(orderData);

            const applicantsResponse = await fetch(
                `/api/orders/${id}/applicants`
            );
            const applicantsData = await applicantsResponse.json();
            setApplicants(applicantsData);
        };

        fetchOrderDetails();
    }, [id]);

    if (!order) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto p-6">
          <Sidebar/>
            <h1 className="text-3xl font-bold mb-6 text-gray-800">
                {order.title}
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                            Описание заказа
                        </h2>
                        <p className="mb-4 text-gray-600">
                            {order.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Статус:
                                </p>
                                <p className="text-gray-600">{order.status}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Оплата:
                                </p>
                                <p className="text-gray-600">
                                    {order.payment} руб.
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Дата начала:
                                </p>
                                <p className="text-gray-600">
                                    {new Date(
                                        order.startDate
                                    ).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-700">
                                    Дата окончания:
                                </p>
                                <p className="text-gray-600">
                                    {order.endDate
                                        ? new Date(
                                              order.endDate
                                          ).toLocaleDateString()
                                        : "Не указано"}
                                </p>
                            </div>
                        </div>
                        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-700">
                            Требования:
                        </h3>
                        <ul className="list-disc pl-5 text-gray-600">
                            {order.requirements.map((req, index) => (
                                <li key={index} className="mb-1">
                                    {req.text}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <Link
                        href="/developer-dashboard"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg shadow transition duration-200"
                    >
                        Вернуться к панели девелопера
                    </Link>
                </div>
                <div>
                    <div className="bg-white shadow-lg rounded-lg p-6">
                        <h2 className="text-2xl font-semibold mb-4 text-gray-700">
                            Откликнувшиеся работники
                        </h2>
                        {applicants.length > 0 ? (
                            <ul className="divide-y divide-gray-200">
                                {applicants.map((applicant) => (
                                    <li
                                        key={applicant.id}
                                        className="py-3 flex items-center justify-between hover:bg-gray-50 cursor-pointer transition duration-200"
                                        onClick={() =>
                                            setSelectedApplicant(applicant.id)
                                        }
                                    >
                                        <div className="flex items-center">
                                            <img
                                                src={
                                                    applicant.avatar ||
                                                    "/default-avatar.png"
                                                }
                                                alt={applicant.name}
                                                className="w-10 h-10 rounded-full mr-3"
                                            />
                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {applicant.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {applicant.skills.join(
                                                        ", "
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-gray-500">
                                Пока нет откликов на этот заказ.
                            </p>
                        )}
                    </div>
                </div>
            </div>
            {selectedApplicant && (
                <ApplicantModal
                    applicantId={selectedApplicant}
                    onClose={() => setSelectedApplicant(null)}
                />
            )}
        </div>
    );
};

export default OrderDetails;
