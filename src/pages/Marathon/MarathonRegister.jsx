import { useState } from "react";
import { useNavigate, useLoaderData } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";

const MarathonRegister = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const { _id, marathonTitle, marathonStartDate, totalRegistrationCount } =
        useLoaderData();

    const [registrationDetails, setRegistrationDetails] = useState({
        email: user?.email || "",
        firstName: "",
        lastName: "",
        contactNumber: "",
        additionalInfo: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegistrationDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedRegistrationDetails = {
            ...registrationDetails,
            marathonId: _id,
            marathonTitle,
            marathonStartDate,
            userId: user.uid,
        };

        fetch("http://localhost:5000/marathonRegistrations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedRegistrationDetails),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.insertedId) {
                    // Update the total registration count
                    fetch(
                        `http://localhost:5000/marathonEvents/${_id}/updateRegistrationCount`,
                        {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                                totalRegistrationCount:
                                    totalRegistrationCount + 1,
                            }),
                        }
                    )
                        .then((res) => res.json())
                        .then((updateData) => {
                            if (updateData.success) {
                                toast.success("Registration successful!");
                                navigate("/dashboard/my-apply");
                            } else {
                                toast.error(
                                    "Failed to update registration count"
                                );
                            }
                        })
                        .catch((error) => {
                            console.error("Error:", error);
                            toast.error(
                                "An error occurred while updating the registration count"
                            );
                        });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error(
                    "An error occurred while registering for the marathon"
                );
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">
                Register for {marathonTitle}
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={registrationDetails.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Marathon Title
                    </label>
                    <input
                        type="text"
                        name="marathonTitle"
                        value={marathonTitle}
                        className="w-full px-3 py-2 border rounded"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Marathon Start Date
                    </label>
                    <input
                        type="text"
                        name="marathonStartDate"
                        value={marathonStartDate}
                        className="w-full px-3 py-2 border rounded"
                        readOnly
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">First Name</label>
                    <input
                        type="text"
                        name="firstName"
                        value={registrationDetails.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Last Name</label>
                    <input
                        type="text"
                        name="lastName"
                        value={registrationDetails.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Contact Number
                    </label>
                    <input
                        type="text"
                        name="contactNumber"
                        value={registrationDetails.contactNumber}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">
                        Additional Info (Optional)
                    </label>
                    <textarea
                        name="additionalInfo"
                        value={registrationDetails.additionalInfo}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="btn bg-primary text-white px-6 py-2 rounded-full"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default MarathonRegister;