import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonDatetime, IonFooter, IonGrid, IonRow, IonCol, IonPicker, IonButton } from '@ionic/react';
import { generateNumberedColumnElem } from '../utils/NumberedColumnElem';

const GrowthInput: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2020-01-01T00:00:00.000');

  const [quantityPickerIsOpen, isQuantityPickerOpen] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(0);
  
  const [pickerIsOpen, setPickerIsOpen] = useState(false);
  const [selectedFoodType, setSelectedFoodType] = useState(false);

  const foodQuantityElems = generateNumberedColumnElem(0, 300, 5);
  
  const FoodQuantityColumn = {
    name: "FoodQuantityElem",
    options: foodQuantityElems
  }

  const FoodTypeColumn = {
    name: "FoodTypeElem",
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
            <IonCol>
                <IonItem>{selectedQuantity}</IonItem>
                <IonButton onClick={() => isQuantityPickerOpen(true)}>
                    Select quantity
                </IonButton>
                <IonPicker 
                    isOpen={quantityPickerIsOpen} 
                    columns={[ FoodQuantityColumn ]} 
                    buttons={[
                        {
                          text: "Cancel",
                          role: "cancel",
                          handler: value => {
                            isQuantityPickerOpen(false)
                          }
                        },
                        {
                          text: "Confirm",
                          handler: value => {
                            setSelectedQuantity(value.FoodQuantityElem.value)
                            isQuantityPickerOpen(false)
                          }
                        }
                      ]}
                />
            </IonCol>
            <IonCol>
                    <IonItem>{selectedFoodType}</IonItem>
                <IonButton onClick={() => {setPickerIsOpen(true);}}>
                    Select type
                </IonButton>
                <IonPicker 
                    isOpen={pickerIsOpen} 
                    columns={[ FoodTypeColumn ]} 
                    buttons={[
                        {
                          text: "Cancel",
                          role: "cancel",
                          handler: value => {
                            //onCancel()
                            setPickerIsOpen(false)
                          }
                        },
                        {
                          text: "Confirm",
                          handler: value => {
                            setSelectedFoodType(value.FoodTypeElem.value)
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