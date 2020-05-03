import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonDatetime, IonFooter, IonGrid, IonRow, IonCol, IonPicker, IonButton } from '@ionic/react';
import TypePicker from './TypePicker'

interface GrowthValue {
  datetime: string
  breast: number
  pumped: number
  powder: number
  weight: number
}

const GrowthInput: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2020-01-01T00:00:00.000');
  //const [selectedType, setSelectedType] = useState(false);
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  //const [growthValue, setGrowthValue] = useState<GrowthValue | undefined>(undefined);

  return (
    <IonGrid>
        <IonRow>
            <IonCol>Time</IonCol>
            <IonCol>Quantity</IonCol>
            <IonCol>Type</IonCol>
            <IonCol>Weight</IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
                <IonDatetime displayFormat="D MMM YYYY H:mm" min="2020" max="2026" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
            </IonCol>
            <IonCol></IonCol>
            <IonCol>
                <IonButton onClick={() => {setPickerIsOpen(true);}}>
                    Select type
                </IonButton>
                <TypePicker 
                    isOpen={pickerIsOpen}
                    onCancel={() => {
                      setPickerIsOpen(false);
                    }}
                    onSave={(_value: any) => {
                      console.log(_value);
                      //let { Day, SessionTime } = _value;
                      //setSessionTime({ weekday: Day.value, period: SessionTime.value });
                      //setSelectedType(_value);
                      setPickerIsOpen(false);
                    }}
                />
            </IonCol>
            <IonCol></IonCol>
        </IonRow>
    </IonGrid>
  );
};

export default GrowthInput;