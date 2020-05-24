import React, { useState } from 'react';
import { IonItem, IonDatetime, IonGrid, IonRow, IonCol, IonPicker, IonButton, IonAlert, IonLabel } from '@ionic/react';
import { generateNumberedColumnElem } from '../utils/NumberedColumnElem';
import { apiClient } from '../rest/RestClient'
import DataTable from './DataTable';
import { GrowthData, GrowthDataTableElem, DataProvider, AsyncGrowthData } from '../model/Models';

const GrowthInput: React.FC = () => {
  const [onSendSuccessAlertIsOpen, setOnSendSuccessAlertOpen] = useState(false);
  const [onSendErrorAlertIsOpen, setOnSendErrorAlertOpen] = useState(false);

  const now = new Date().toISOString();
  const [selectedDate, setSelectedDate] = useState<string>(now);

  const [breastPickerIsOpen, isBreastPickerOpen] = useState(false);
  const [breastValue, setBreastValue] = useState<number>(0);
  
  const [pumpedPickerIsOpen, isPumpedPickerOpen] = useState(false);
  const [pumpedValue, setPumpedValue] = useState<number>(0);

  const [powderPickerIsOpen, isPowderPickerOpen] = useState(false);
  const [powderValue, setPowderValue] = useState<number>(0);

  const [weightPickerIsOpen, isWeightPickerOpen] = useState(false);
  const [weightValue, setWeightValue] = useState<number>(0)

  const breastQuantityElems = generateNumberedColumnElem(0, 1, .5);
  const pumpedQuantityElems = generateNumberedColumnElem(0, 300, 5);
  const powderQuantityElems = generateNumberedColumnElem(0, 300, 10);
  const weightQuantityElems = generateNumberedColumnElem(0, 10, 1);


  const onDelete = (gdte: GrowthDataTableElem) => {
    console.log(gdte)
    const updatedData = selectedDataElems.data.filter((_, i) => i !== gdte.index)
    updateDataElems({data: updatedData, onDelete, onSend})
  }

  const onAdd = () => {
    const growthData = {"datetime": selectedDate, "breast": breastValue, "pumped": pumpedValue, "powder": powderValue, "weight": weightValue}
    console.log(growthData)

    const updatedData = [...selectedDataElems.data, growthData]
    updateDataElems({data: updatedData, onDelete, onSend})
  }

  const onSend = async () => {
    const res = Promise.all(selectedDataElems.data.map(e => storeEach(e)))
      .then(s => {
        updateDataElems({data: [], onDelete, onSend})
        setOnSendSuccessAlertOpen(true)
      })
      .catch(e => {
        console.log("error on storing any element")
        setOnSendErrorAlertOpen(true)
      })
  }

  const [selectedDataElems, updateDataElems] = useState<DataProvider>({data: [], onDelete, onSend: onSend});

  const storeEach = async (gd: GrowthData) => apiClient.post("/_doc", gd)
  
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

  const WeightQuantityElem = {
    name: "WeightQuantityElem",
    options: weightQuantityElems
  }  

  return (
    <div>
      <IonAlert
        isOpen={onSendSuccessAlertIsOpen}
        onDidDismiss={() => console.log()}
        header={'Success!'}
        message={'All the elements have been saved'}
        buttons={[
            {
              text: 'Close',
              handler: () => setOnSendSuccessAlertOpen(false)
            }
      ]}/>
      <IonAlert
        isOpen={onSendErrorAlertIsOpen}
        onDidDismiss={() => console.log()}
        header={'Error!'}
        message={'Error saving any of the elements'}
        buttons={[
            {
              text: 'Close',
              handler: () => setOnSendErrorAlertOpen(false)
            }
      ]}/>

      <IonGrid>
          <IonRow>
              <IonCol>
                  <IonLabel>Date/Time</IonLabel>
              </IonCol>
              <IonCol>
                  <IonDatetime displayFormat="D MMM YYYY H:mm" min="2020" max="2026" value={selectedDate} onIonChange={e => setSelectedDate(e.detail.value!)}></IonDatetime>
              </IonCol>
          </IonRow>
          <IonRow>
              <IonCol>Breast</IonCol>
              <IonCol>Pumped</IonCol>
              <IonCol>Powder</IonCol>
              <IonCol>Weight</IonCol>
          </IonRow>

          <IonRow>
              <IonCol>
                  <IonItem onClick={() => isBreastPickerOpen(true)}>{breastValue}</IonItem>
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
                  <IonItem onClick={() => isPumpedPickerOpen(true)}>{pumpedValue}</IonItem>
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
                  <IonItem onClick={() => isPowderPickerOpen(true)}>{powderValue}</IonItem>
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
              <IonCol>
                  <IonItem onClick={() => isWeightPickerOpen(true)}>{weightValue}</IonItem>
                  <IonPicker 
                      isOpen={weightPickerIsOpen} 
                      columns={[ WeightQuantityElem ]} 
                      buttons={[
                          {
                            text: "Cancel",
                            role: "cancel",
                            handler: value => {
                              isWeightPickerOpen(false)
                            }
                          },
                          {
                            text: "Confirm",
                            handler: value => {
                              setWeightValue(value.PowderQuantityElem.value)
                              isWeightPickerOpen(false);
                            }
                          }
                        ]}
                  />
              </IonCol>
          </IonRow>

          <IonRow>
              <IonCol size="0.4"/>
              <IonCol size="11.2">
                <IonButton expand="block" color="secondary" onClick={onAdd}>Add</IonButton>
              </IonCol>
              <IonCol size="0.4"/>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <DataTable data={selectedDataElems.data} onDelete={onDelete} onSend={onSend}/>
            </IonCol>
          </IonRow>

      </IonGrid>
    
    </div>
  );
};

export default GrowthInput;