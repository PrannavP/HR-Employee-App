import { Text } from "react-native";
import { getSyncedTime } from "../../services/api";
import { useState, useEffect } from "react";

interface TimerComponentProps {
    emp_id: number;
}

const TimerComponent: React.FC<TimerComponentProps> = ({ emp_id}) => {
    const [duration, setDuration] = useState<string>("00:00:00");
    const [syncedTime, setSyncedTime] = useState<string | null>(null);

    useEffect(() => {
        const getTimer = async() => {
            try{
                const response = await getSyncedTime(emp_id);
                if(response.status === 200){
                    setSyncedTime(response.data.getTimerData.check_in_time);
                }else{
                    console.log("Response status is not ok.");
                }
            }catch(error){
                console.log("Error fetching synced time: ", error);
            }
        };

        getTimer();
    }, [emp_id]);

    useEffect(() => {
        if(!syncedTime) return;

        const updateDuration = () => {
            const now = new Date();
            const pastTime = new Date(syncedTime);
            const diffMs = now.getTime() - pastTime.getTime();

            const totalSeconds = Math.floor(diffMs / 1000);
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const formattedTime = [
                hours.toString().padStart(2, "0"),
                minutes.toString().padStart(2, "0"),
                seconds.toString().padStart(2, "0"),
            ].join(":");

            setDuration(formattedTime);
        };

        updateDuration();

        const interval = setInterval(updateDuration, 1000);
        
        return () => clearInterval(interval);
    }, [syncedTime]);

    return(
        <Text>{duration}</Text>
    );
};

export default TimerComponent;