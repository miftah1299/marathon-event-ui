import { useEffect, useState } from "react";
import MarathonCard from "./MarathonCard";

const Marathons = () => {
    const [marathons, setMarathons] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/marathonEvents")
            .then((res) => res.json())
            .then((data) => {
                setMarathons(data);
                console.log(data);
            });
    }, []);

    return (
        <div className="py-10">
            <h2 className="text-3xl font-semibold text-center">
                Marathon Events
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-10">
                {marathons.map((marathon) => (
                    <MarathonCard key={marathon.id} marathon={marathon} />
                ))}
            </div>
        </div>
    );
};

export default Marathons;