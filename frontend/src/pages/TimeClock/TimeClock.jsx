import React, { useState, useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { GetRecordApi, CreateRecordApi, UpdateRecordApi } from "@Services/recordService.js";

const TimeClock = () => {
    const token = sessionStorage.getItem("token");
    const [clockInModal, setClockInModal] = useState(false);
    const [clockInFailModal, setClockInFailModal] = useState(false);
    const [clockOutModal, setClockOutModal] = useState(false);
    const [clockOutFailModal, setClockOutFailModal] = useState(false);
    const [time, setTime] = useState(new Date());
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localDateTime = new Date(now - offset);
    const dateTime = localDateTime.toISOString();
    const [records, setRecords] = useState([]);
    const [selectedId, setSelectedId] = useState("");

    const fetchRecords = async () => {
        const response = await GetRecordApi(token);
        if (response.status === 200) {
            setRecords(response.data);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        fetchRecords();

        if (selectedId) {
            formik2.setValues({
                recordId: selectedId,
                patch: [
                    {
                        path: "/clockOut",
                        op: "replace",
                        value: dateTime
                    }
                ]
            });
        }

        return () => {
            clearInterval(timer);
        };
    }, [selectedId]);

    const formik = useFormik({
        initialValues: {
            clockIn: dateTime
        },
        onSubmit: async (values) => {
            const token = sessionStorage.getItem("token");
            const { status, data } = await CreateRecordApi(token, values);
            setTimeout(() => {
                if (status === 200) {
                    if (data.newToken) {
                        sessionStorage.setItem("token", data.newToken);
                    }
                    setClockInModal(true);
                    fetchRecords();
                } else if (status === 401 || status === 404) {
                    setClockInFailModal(true);
                } else {
                    setClockInFailModal(true);
                }
            }, 1000);
        },
        validationSchema: Yup.object({
            clockIn: Yup.string().required("Clock In is required"),
        })
    });

    const formik2 = useFormik({
        initialValues: {
            recordId: selectedId,
            patch: [
                {
                    path: "/clockOut",
                    op: "replace",
                    value: dateTime
                }
            ]
        },
        onSubmit: async (values) => {
            const token = sessionStorage.getItem("token");
            const selectedRecord = records.find(record => record.id === values.recordId);
            const clockInTime = new Date(selectedRecord.clockIn);
            const currentTime = new Date();
            const timeDifference = currentTime - clockInTime;

            if (timeDifference > 24 * 60 * 60 * 1000) {
                setClockOutFailModal(true);
            } else {
                const { status, data } = await UpdateRecordApi(token, values.recordId, values.patch);
                if (status === 200) {
                    if (data.newToken) {
                        sessionStorage.setItem("token", data.newToken);
                    }
                    setClockOutModal(true);
                    fetchRecords();
                } else if (status === 401) {
                    window.location.href = '/dashboard';
                } else {
                    setClockOutFailModal(true);
                }
            }
        },
        validationSchema: Yup.object({
            recordId: Yup.string().required("User ID is required"),
            patch: Yup.array().of(
                Yup.object().shape({
                    path: Yup.string().required("Path is required"),
                    op: Yup.string().required("Operation is required"),
                    value: Yup.string().required("Value is required")
                })
            ).required("Patch is required")
        })
    });

    return (
        <section className="w-full h-full">
            <div className="mx-6 bg-white min-w-[24rem] shadow-lg rounded-xl flex flex-col items-center p-6">
                <div className="flex justify-center">
                    <div className="text-6xl font-bold">
                        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                    </div>
                </div>
                <div className="flex gap-20 justify-center mt-[3.5rem]">
                    <form onSubmit={formik.handleSubmit}>

                        <button
                            type="submit"
                            className="mx-2 bg-primary-light hover:bg-primary-dark text-white text-lg font-bold py-4 px-6 rounded"
                        >
                            Clock In
                        </button>

                    </form>
                    <form onSubmit={formik2.handleSubmit}>
                        <button
                            type="submit"
                            className="mx-2 bg-secondary-light hover:bg-secondary-dark text-white text-lg font-bold py-4 px-6 rounded"
                        >
                            Clock Out
                        </button>
                    </form>

                    {/* MODALS */}

                    {/* User has successfully clocked in */}
                    {clockInModal && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-700 opacity-75"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-green-700" id="modal-title">
                                                    Clock In Successful
                                                </h3>
                                                <div className="mt-8">
                                                    <p className="text-sm text-gray-700">
                                                        You have successfully clocked in.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-light text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setClockInModal(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* User has already clocked in */}
                    {clockInFailModal && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-700 opacity-75"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-secondary-dark" id="modal-title">
                                                    Clock In Failed
                                                </h3>
                                                <div className="mt-8">
                                                    <p className="text-sm text-gray-700">
                                                        You already have clocked in for today. You may come back the next day.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-light text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setClockInFailModal(false)}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* User has successfully clocked out */}
                    {clockOutModal && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-green-700" id="modal-title">
                                                    Clock Out Successful
                                                </h3>
                                                <div className="mt-8">
                                                    <p className="text-sm text-gray-700">
                                                        You have successfully clocked out.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-light text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => { setClockOutModal(false); }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* User clock in failed */}
                    {clockOutFailModal && (
                        <div className="fixed z-10 inset-0 overflow-y-auto">
                            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                                <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                                </div>
                                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">​</span>
                                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                                <h3 className="text-lg leading-6 font-medium text-secondary-dark" id="modal-title">
                                                    Clock Out Failed
                                                </h3>
                                                <div className="mt-8">
                                                    <p className="text-sm text-gray-700">
                                                        You may only clock out once per day.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                        <button
                                            type="button"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-light text-base font-medium text-white hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => { setClockOutFailModal(false); }}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="mt-6 mx-6 h-[24rem] bg-primary-pastel min-w-[24rem] shadow-lg rounded-xl flex flex-col items-center p-6 overflow-y-auto">
                <table className="table-auto font-poppins">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-primary-dark">ID</th>
                            <th className="px-4 py-2 text-primary-dark">Month</th>
                            <th className="px-4 py-2 text-primary-dark">Day</th>
                            <th className="px-4 py-2 text-primary-dark">Year</th>
                            <th className="px-4 py-2 text-primary-dark">Clock In</th>
                            <th className="px-4 py-2 text-primary-dark">Clock Out</th>
                        </tr>
                    </thead>
                    <tbody className="space-y-4">
                        {records.map((record) => (
                            <tr key={record.id} className="bg-white">
                                <td className="border px-4 py-2" onClick={() => setSelectedId(record.id)}>{record.id.substring(0, 5)}</td>
                                <td className="border px-4 py-2">{record.month}</td>
                                <td className="border px-4 py-2">{record.day}</td>
                                <td className="border px-4 py-2">{record.year}</td>
                                <td className="border px-4 py-2">{new Date(record.clockIn).toLocaleString()}</td>
                                <td className="border px-4 py-2">{new Date(record.clockOut).toLocaleString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default TimeClock;
