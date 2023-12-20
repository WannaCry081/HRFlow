import { useState, useEffect } from "react";
import { Calendar } from "/src/components/ui/calendar";
import { GetUserProfileApi } from "/src/services/userService.js";
import { useDepartments, usePositions, useEmployees, useApplicants} from "/src/hooks";
import { FaUserTie, FaBuilding, FaUsers, FaNetworkWired } from "react-icons/fa6";

const Home = () => {
    const [date, setDate] = useState(new Date());

    const [userData, setUserData] = useState({});
    const employees = useEmployees();
    const departments = useDepartments();
    const positions = usePositions();
    const applicants = useApplicants();
    
    const [time, setTime] = useState(new Date());
    const [dateTime, setDateTime] = useState("");
    const updateDateTime = () => {
        const now = new Date();
        const formattedDate = now.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
        });
        setDateTime(`${formattedDate}`);
    };


    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    useEffect(() => {
        const intervalId = setInterval(updateDateTime, 1000);
        return () => clearInterval(intervalId);
    }, []);


    useEffect(() => {
        const token = sessionStorage.getItem("token");

        const getUserProfile = async () => {
            const { status, data } = await GetUserProfileApi(token);
            setUserData(data);
        };
        getUserProfile();
    }, []);

    return (    
        <section className="w-full flex gap-4 p-6  h-full">
            <div className="w-4/5 flex flex-col gap-4 px-2">
                <div className="h-32  flex gap-4">
                    <StatisticCard 
                        icon={<FaUserTie size={36} className="fill-white" />}
                        count={employees.length}
                        title="Employees"
                    />
                    <StatisticCard 
                        icon={<FaBuilding size={36} className="fill-white" />}
                        count={departments.length}
                        title="Departments"
                    />
                    <StatisticCard 
                        icon={<FaUsers size={36} className="fill-white" />}
                        count={applicants.length}
                        title="Applicants"
                    />
                </div>
                <div className="flex gap-4">
                    <div className="w-full bg-white flex flex-col justify-center items-center rounded-2xl shadow-lg">
                        <h1 className="text-3xl font-lato self-start font-bold text-lilac mb-8 ml-8">Time Clock</h1>
                        <h1 className="text-5xl font-poppins font-semibold flex flex-col items-center mb-10">
                            {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}
                            <span className="text-gray-500 font-normal text-2xl mt-2">{dateTime}</span>
                        </h1>
                    </div>
                    <div className="w-full flex flex-col bg-white rounded-2xl shadow-lg justify-center items-center py-10">
                        <div className="bg-blush-pastel font-poppins flex text-5xl font-medium text-blush rounded-full h-40 w-40 p-7 items-center justify-center pb-8">
                            {userData.firstName !== undefined
                                ? userData.firstName[0].toUpperCase()
                                : ""}
                            {userData.lastName !== undefined
                                ? userData.lastName[0].toUpperCase()
                                : ""}
                        </div>  
                        <p className="font-poppins mt-8 text-jetblack font-semibold text-3xl">  {userData.firstName} {userData.middleName} {userData.lastName}</p>
                        <p className="font-poppins text-gray-500 text-2xl mt-2">{userData.role}</p>
                    </div>
                </div>
            </div>
            <div className="w-1/3 h-[35rem] relative bg-white py-8 px-6 gap-2 flex flex-col rounded-3xl shadow-md border border-lilac=pastel">
                <div className="scale-150 absolute top-[7rem] right-20">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        className="bg-white"
                    />
                </div>
               
            </div>
        </section>
    );
};

export default Home;

export const StatisticCard = (prop) => {
    return (
        <div className="w-full bg-lilac-pastel rounded-2xl shadow-md flex items-center justify-center gap-4">
            <div className="bg-lilac h-16 w-16 flex justify-center items-center rounded-full">
                {prop.icon}
            </div>
            <h1 className="flex flex-col text-2xl font-poppins font-medium"> 
                {prop.count}
                <span className="text-gray-600 text-lg font-normal">{prop.title}</span>
            </h1>
        </div>
    )
}