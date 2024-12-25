import { useEffect, useState } from "react";

const MarathonTips = () => {
    const [tips, setTips] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/marathonTips")
            .then((res) => res.json())
            .then((data) => {
                setTips(data);
            });
    }, []);

    return (
        <div className="max-w-screen-xl mx-auto py-10">
            <h2 className="text-3xl font-bold text-center mb-4">
                Marathon Tips
            </h2>
            <p className="text-center text-gray-700 mb-10">
                Here are some tips to help you prepare for the marathon.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tips.map((tip) => (
                    <div
                        key={tip.id}
                        className="card bg-white shadow-md rounded-lg p-4"
                    >
                        <h3 className="text-xl font-bold mb-2">{tip.title}</h3>
                        <p className="text-gray-700">{tip.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MarathonTips;