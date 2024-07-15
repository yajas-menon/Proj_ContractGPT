import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import axios from 'axios';
import { toast } from 'react-toastify';




const AdminDashboard = () => {
    const [vendors, setVendors] = useState([]);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/auth/getvendors');
                console.log(response)
                setVendors(response.data);
            } catch (error) {
                console.error('Error fetching vendors:', error);
            }
        };

        fetchVendors();
    }, []);

    const handleAccept = async (id) => {
        try {
            await axios.patch(`http://localhost:8000/api/auth/acceptvendors/${id}/accept`);
            setVendors(vendors.map(vendor => vendor._id === id ? { ...vendor, status: 'Accepted' } : vendor));
            toast.success("Vendor Granted Access")

        } catch (error) {
            console.error('Error updating vendor status:', error);
        }
    };

    const handleReject = async (id) => {
        try {
            await axios.patch(`http://localhost:8000/api/auth/rejectvendors/${id}/reject`);
            setVendors(vendors.map(vendor => vendor._id === id ? { ...vendor, status: 'Rejected' } : vendor));
            toast.error("Vendor Rejected")
        } catch (error) {
            console.error('Error updating vendor status:', error);
        }
    };
    return (
        <div>
            <Navbar />
            <div className="p-8 mt-4 mx-10">
                <div className="text-4xl font-bold mb-4">Vendor Management</div>
                <hr />
                <div className="overflow-x-auto my-4">
                    <table className="min-w-full bg-white ">
                        <thead>
                            <tr>
                                <th className="text-lg py-2 px-4 border-b border-gray-300 text-left">Vendor</th>
                                <th className="py-2 px-4 border-b border-gray-300 text-left">Email</th>
                                <th className="py-2 px-4 border-b border-gray-300 text-left">Status</th>
                                <th className="py-2 px-4 border-b border-gray-300 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vendors.map((vendor, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border-b border-gray-300 font-semibold">{vendor.vendorName}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">{vendor.email}</td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        <span className={`px-2 py-1 rounded ${vendor.status === 'Accepted' ? 'bg-green-200' : vendor.status === 'Rejected' ? 'bg-red-200' : 'bg-yellow-200'}`}>
                                            {vendor.status}
                                        </span>
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        {vendor.status === 'pending' && (
                                            <>
                                                <button onClick={() => handleAccept(vendor._id)} className="mr-2 bg-black hover:bg-slate-700 text-white px-3 py-1 rounded">Accept</button>
                                                <button onClick={() => handleReject(vendor._id)} className="bg-white border border-black text-black px-3 py-1 rounded">Reject</button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard