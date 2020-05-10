import React, { useState } from 'react';
import { IonItem, IonDatetime, IonGrid, IonRow, IonCol, IonPicker, IonButton, IonAlert } from '@ionic/react';
import { generateNumberedColumnElem } from '../utils/NumberedColumnElem';
import { apiClient } from '../rest/RestClient'
import axios from 'axios';
import DataTable from './DataTable';
import { GrowthDataTableElem, DataProvider } from '../model/Models';

interface GrowthData {
  datetime: string
  breast: number
  pumped: number
  powder: number,
  weight: number
}

const GrowthInput: React.FC = () => {
  const now = new Date().toISOString();
  const [selectedDate, setSelectedDate] = useState<string>(now);

  const [breastPickerIsOpen, isBreastPickerOpen] = useState(false);
  const [breastValue, setBreastValue] = useState<number>(0);
  
  const [pumpedPickerIsOpen, isPumpedPickerOpen] = useState(false);
  const [pumpedValue, setPumpedValue] = useState<number>(0);

  const [powderPickerIsOpen, isPowderPickerOpen] = useState(false);
  const [powderValue, setPowderValue] = useState<number>(0);

  const breastQuantityElems = generateNumberedColumnElem(0, 300, 5);
  const pumpedQuantityElems = generateNumberedColumnElem(0, 300, 5);
  const powderQuantityElems = generateNumberedColumnElem(0, 300, 5);

  let dataElems: Array<GrowthData> = [
    {"datetime": '2020-05-09T20:07:35.568Z', "breast": 10, "pumped": 20, "powder": 30, "weight": 0},
    {"datetime": '2020-05-09T20:07:35.568Z', "breast": 20, "pumped": 40, "powder": 60, "weight": 0},
    {"datetime": '2020-05-09T20:07:35.568Z', "breast": 30, "pumped": 60, "powder": 90, "weight": 0}
  ] 

  const onDeleteRow = (gdte: GrowthDataTableElem) => {
    console.log(gdte)
    
    // add alert!

    const updatedData = selectedDataElems.data.filter((_, i) => i !== gdte.index)
    updateDataElems({data: updatedData, onDelete: onDeleteRow})
  }

  const [selectedDataElems, updateDataElems] = useState<DataProvider>({data: [], onDelete: onDeleteRow});

  const onAdd = () => {
    const growthData = {"datetime": selectedDate, "breast": breastValue, "pumped": pumpedValue, "powder": powderValue, "weight": 0}
    console.log(growthData)
    //const response = await apiClient.post<any>('/_doc', JSON.stringify(growthData));
    //console.log(`Status code: ${response.status}`);

    // const config = {
    //   headers: { 
    //     'Content-Type': 'application/json',
    //     'Access-Control-Allow-Origin': '*'
    //   }
    // }

    // axios.post('http://localhost:9200/growth/_doc', growthData, config)
    //   .then(function (response) {
    //     console.log(response);
    //   })


    //dataElems.push(growthData)
    const updatedData = [...selectedDataElems.data, growthData]
    updateDataElems({data: updatedData, onDelete: onDeleteRow})
    console.log(dataElems)
  }

  const onSend = async () => {

  }
  
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
    <div>
      <IonGrid>
          <IonRow>
              <IonCol>Date/Time</IonCol>
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
              <IonCol></IonCol>
          </IonRow>

          <IonRow>
              <IonCol size="2"/>
              <IonCol size="8">
                <IonButton expand="block" color="secondary" onClick={onAdd}>Add</IonButton>
              </IonCol>
              <IonCol size="2"/>
          </IonRow>

          <IonRow>
            <IonCol size="2"/>
            <IonCol size="8">
              <DataTable data={selectedDataElems.data} onDelete={onDeleteRow}/>
            </IonCol>
            <IonCol size="2"/>
          </IonRow>

          <IonRow>
            <IonCol size="2"/>
            <IonCol size="8">
              <IonButton expand="block" color="primary" onClick={onSend}>Send</IonButton>
            </IonCol>
            <IonCol size="2"/>
          </IonRow>
      </IonGrid>

      
    </div>
  );
};

export default GrowthInput;