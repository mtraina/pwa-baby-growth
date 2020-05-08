import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonDatetime, IonFooter, IonGrid, IonRow, IonCol, IonPicker, IonButton } from '@ionic/react';
import { generateNumberedColumnElem } from '../utils/NumberedColumnElem';

interface GrowthData {
  datetime: string
  breast: number
  pumped: number
  powder: number,
  weight: number
}

const GrowthInput: React.FC = () => {

  const [selectedDate, setSelectedDate] = useState<string>('2020-01-01T00:00:00.000');

  const [breastPickerIsOpen, isBreastPickerOpen] = useState(false);
  const [breastValue, setBreastValue] = useState<number>(0);
  
  const [pumpedPickerIsOpen, isPumpedPickerOpen] = useState(false);
  const [pumpedValue, setPumpedValue] = useState<number>(0);

  const [powderPickerIsOpen, isPowderPickerOpen] = useState(false);
  const [powderValue, setPowderValue] = useState<number>(0);

  const breastQuantityElems = generateNumberedColumnElem(0, 300, 5);
  const pumpedQuantityElems = generateNumberedColumnElem(0, 300, 5);
  const powderQuantityElems = generateNumberedColumnElem(0, 300, 5);

  const onDone = () => console.log({"datetime": selectedDate, "breast": breastValue, "pumped": pumpedValue, "powder": powderValue, "weight": 0})
  
  const BreastQuantityElem = {
    name: "BreastQuantityElem",
    options: breastQuantityElems
  }

  const PumpedQuantityElem = {
    name: "PumpedQuantityElem",
    options: pumpedQuantityElems
  }   

  const PowderQuantityElem = {
    name: "PowderQuantityElem",
    options: powderQuantityElems
  }   

  return (
    <IonGrid>
        <IonRow>
            <IonCol>Time</IonCol>
            <IonCol>Breast</IonCol>
            <IonCol>Pumped</IonCol>
            <IonCol>Powder</IonCol>
            <IonCol>Weight</IonCol>
        </IonRow>

        <IonRow>
            <IonCol>
                <IonDatetime displayFormat="D MMM YYYY H:mm" min="2020" max="2026" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
            </IonCol>
            <IonCol>
                <IonItem>{breastValue}</IonItem>
                <IonButton onClick={() => isBreastPickerOpen(true)}>
                    Select quantity
                </IonButton>
                <IonPicker 
                    isOpen={breastPickerIsOpen} 
                    columns={[ BreastQuantityElem ]} 
                    buttons={[
                        {
                          text: "Cancel",
                          role: "cancel",
                          handler: value => {
                            isBreastPickerOpen(false)
                          }
                        },
                        {
                          text: "Confirm",
                          handler: value => {
                            setBreastValue(value.BreastQuantityElem.value)
                            isBreastPickerOpen(false)
                          }
                        }
                      ]}
                />
            </IonCol>
            <IonCol>
                <IonItem>{pumpedValue}</IonItem>
                <IonButton onClick={() => {isPumpedPickerOpen(true);}}>
                    Select type
                </IonButton>
                <IonPicker 
                    isOpen={pumpedPickerIsOpen} 
                    columns={[ PumpedQuantityElem ]} 
                    buttons={[
                        {
                          text: "Cancel",
                          role: "cancel",
                          handler: value => {
                            isPumpedPickerOpen(false)
                          }
                        },
                        {
                          text: "Confirm",
                          handler: value => {
                            setPumpedValue(value.PumpedQuantityElem.value)
                            isPumpedPickerOpen(false);
                          }
                        }
                      ]}
                />
            </IonCol>
            <IonCol>
                <IonItem>{powderValue}</IonItem>
                <IonButton onClick={() => {isPowderPickerOpen(true);}}>
                    Select type
                </IonButton>
                <IonPicker 
                    isOpen={powderPickerIsOpen} 
                    columns={[ PowderQuantityElem ]} 
                    buttons={[
                        {
                          text: "Cancel",
                          role: "cancel",
                          handler: value => {
                            isPowderPickerOpen(false)
                          }
                        },
                        {
                          text: "Confirm",
                          handler: value => {
                            setPowderValue(value.PowderQuantityElem.value)
                            isPowderPickerOpen(false);
                          }
                        }
                      ]}
                />
            </IonCol>
            <IonCol></IonCol>
        </IonRow>

        <IonRow>
            <IonCol/>
            <IonCol/>
            <IonCol>
              <IonButton color="primary" onClick={onDone}>Send</IonButton>
            </IonCol>
            <IonCol/>
        </IonRow>
    </IonGrid>
  );
};

export default GrowthInput;