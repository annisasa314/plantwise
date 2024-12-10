import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonPage,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonSpinner,
  IonGrid,
  IonRow,
  IonCol,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import {
  getUserCount,
  getPostCount,
  getTutorialCount,
  getPlantingScheduleCount,
} from "../../../services/auth.service";
import Navbar from "../../../components/Navbar/Navbar";
import AdminLayout from "../../../layouts/AdminLayout";

const Dashboard: React.FC = () => {
  const [userCount, setUserCount] = useState<number | null>(null);
  const [postCount, setPostCount] = useState<number | null>(null);
  const [tutorialCount, setTutorialCount] = useState<number | null>(null);
  const [scheduleCount, setScheduleCount] = useState<number | null>(null);

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

  return (
    <AdminLayout>
      <IonContent>
        {userCount === null ||
        postCount === null ||
        tutorialCount === null ||
        scheduleCount === null ? (
          <IonSpinner name="crescent" />
        ) : (
          <IonGrid>
            <IonRow>
              {/* Card 1: Jumlah User */}
              <IonCol size="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Jumlah User</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{userCount}</IonCardContent>
                </IonCard>
              </IonCol>

              {/* Card 2: Jumlah Post */}
              <IonCol size="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Jumlah Postingan Forum</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{postCount}</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow>
              {/* Card 3: Jumlah Panduan */}
              <IonCol size="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Jumlah Panduan</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{tutorialCount}</IonCardContent>
                </IonCard>
              </IonCol>

              {/* Card 4: Jumlah Jadwal Tanam */}
              <IonCol size="6">
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>Jumlah Jadwal Tanam</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>{scheduleCount}</IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        )}
      </IonContent>
    </AdminLayout>
  );
};

export default Dashboard;
