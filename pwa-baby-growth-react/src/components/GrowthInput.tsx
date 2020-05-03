import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonDatetime, IonFooter, IonGrid, IonRow, IonCol, IonPicker, IonButton } from '@ionic/react';

const onSave = (v: String) => console.log("the selected type is: " + v);
const onCancel = () => console.log("cancelled selection of type");

const GrowthInput: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2020-01-01T00:00:00.000');
  const [pickerIsOpen, setPickerIsOpen] = useState(false);

  const TypeColumn = {
    name: "Type",
    options: [
        { text: "Breast", value: "breast" },
        { text: "Pumped", value: "pumped" },
        { text: "Powder", value: "powder" }
    ]
    }
    

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
                <IonPicker 
                    isOpen={pickerIsOpen} 
                    columns={[ TypeColumn ]} 
                    buttons={[
                        {
                          text: "Cancel",
                          role: "cancel",
                          handler: value => {
                            onCancel()
                            setPickerIsOpen(false)
                          }
                        },
                        {
                          text: "Confirm",
                          handler: value => {
                            onSave(value)
                            setPickerIsOpen(false);
                          }
                        }
                      ]}
                />
            </IonCol>
            <IonCol></IonCol>
        </IonRow>
    </IonGrid>
  );
};

export default GrowthInput;