import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSpinner, IonGrid, IonRow, IonCol, } from "@ionic/react";
import { getUserCount, getPostCount, getTutorialCount, getPlantingScheduleCount, } from "../../../services/auth.service";
import AdminLayout from "../../../layouts/AdminLayout";
const Dashboard = () => {
    const [userCount, setUserCount] = useState(null);
    const [postCount, setPostCount] = useState(null);
    const [tutorialCount, setTutorialCount] = useState(null);
    const [scheduleCount, setScheduleCount] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const userCountData = await getUserCount();
            const postCountData = await getPostCount();
            const tutorialCountData = await getTutorialCount();
            const scheduleCountData = await getPlantingScheduleCount();
            setUserCount(userCountData);
            setPostCount(postCountData);
            setTutorialCount(tutorialCountData);
            setScheduleCount(scheduleCountData);
        };
        fetchData();
    }, []);
    return (_jsx(AdminLayout, { children: _jsxs(IonContent, { className: "ion-padding", children: [_jsx("h1", { className: "text-3xl font-semibold text-center border-b p-2 text-gray-800 mb-6", children: "Dashboard" }), userCount === null ||
                    postCount === null ||
                    tutorialCount === null ||
                    scheduleCount === null ? (_jsx(IonSpinner, { name: "crescent" })) : (_jsxs(IonGrid, { children: [_jsxs(IonRow, { children: [_jsx(IonCol, { size: "6", children: _jsxs(IonCard, { children: [_jsx(IonCardHeader, { children: _jsx(IonCardTitle, { children: "Jumlah User" }) }), _jsx(IonCardContent, { children: userCount })] }) }), _jsx(IonCol, { size: "6", children: _jsxs(IonCard, { children: [_jsx(IonCardHeader, { children: _jsx(IonCardTitle, { children: "Jumlah Postingan Forum" }) }), _jsx(IonCardContent, { children: postCount })] }) })] }), _jsxs(IonRow, { children: [_jsx(IonCol, { size: "6", children: _jsxs(IonCard, { children: [_jsx(IonCardHeader, { children: _jsx(IonCardTitle, { children: "Jumlah Panduan" }) }), _jsx(IonCardContent, { children: tutorialCount })] }) }), _jsx(IonCol, { size: "6", children: _jsxs(IonCard, { children: [_jsx(IonCardHeader, { children: _jsx(IonCardTitle, { children: "Jumlah Jadwal Tanam" }) }), _jsx(IonCardContent, { children: scheduleCount })] }) })] })] }))] }) }));
};
export default Dashboard;
