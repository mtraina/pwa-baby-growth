import React, { useState } from 'react';
import { IonItem, IonDatetime, IonGrid, IonRow, IonCol, IonPicker, IonButton, IonAlert, IonLabel } from '@ionic/react';
import { generateNumberedColumnElem } from '../utils/NumberedColumnElem';
import { apiClient } from '../rest/RestClient'
import DataTable from './DataTable';
import { GrowthData, GrowthDataTableElem, DataProvider, AsyncGrowthData } from '../model/Models';

const GrowthInput: React.FC = () => {
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

  const breastQuantityElems = generateNumberedColumnElem(0, 300, 5);
  const pumpedQuantityElems = generateNumberedColumnElem(0, 300, 5);
  const powderQuantityElems = generateNumberedColumnElem(0, 300, 5);
  const weightQuantityElems = generateNumberedColumnElem(0, 10, 1);


  const onDeleteRow = (gdte: GrowthDataTableElem) => {
    console.log(gdte)
    
    // add alert!

    const updatedData = selectedDataElems.data.filter((_, i) => i !== gdte.index)
    updateDataElems({data: updatedData, onDelete: onDeleteRow})
  }

  const [selectedDataElems, updateDataElems] = useState<DataProvider>({data: [], onDelete: onDeleteRow});

  const onAdd = () => {
    const growthData = {"datetime": selectedDate, "breast": breastValue, "pumped": pumpedValue, "powder": powderValue, "weight": weightValue}
    console.log(growthData)

    const updatedData = [...selectedDataElems.data, growthData]
    updateDataElems({data: updatedData, onDelete: onDeleteRow})
  }

  const onSend = async () => {
    // alert!

    const elems = [...selectedDataElems.data]

    // works
    //const res = await storeEach(elems[0])
    //console.log(res)

    // to be converted to a map with promise.all for resolving them
    let errorElems:Array<GrowthData> = []
    elems.forEach(async elem => {
      const res = await storeEach(elem)
      console.log(res)

      if(res.response.status !== 201) errorElems.push(res.gd)
    })

    updateDataElems({data: errorElems, onDelete: onDeleteRow})


    //const ress = await elems.map(async gd => storeEach)
    //console.log(ress)

    //await Promise.all(ress).then(r => console.log(r))
    
    //onst results = await Promise.all(ress)//.then(r => console.log(r))

    //const ress = await Promise.all(storingResult(elems))
    //console.log(results)

    //const errorElems = await storingResult(elems)
    //  .then(res => res.forEach(r => console.log("result is: " + r)))  
    //.filter((r, gd) => r.status !== 201 ).map((r, gd)=> gd)
    //updateDataElems({data: errorElems, onDelete: onDeleteRow})

    
    //console.log("sent!")
  }
  
  const storeEach = async (gd: GrowthData) => {
    const response = await apiClient.post("/_doc", gd)
    return { response, gd }
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

  const WeightQuantityElem = {
    name: "WeightQuantityElem",
    options: weightQuantityElems
  }  

  return (
    <div>
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
              <IonCol size="1"/>
              <IonCol size="10">
                <IonButton expand="block" color="secondary" onClick={onAdd}>Add</IonButton>
              </IonCol>
              <IonCol size="1"/>
          </IonRow>

          <IonRow>
            <IonCol size="1"/>
            <IonCol size="10">
              <DataTable data={selectedDataElems.data} onDelete={onDeleteRow}/>
            </IonCol>
            <IonCol size="1"/>
          </IonRow>

          <IonRow>
            <IonCol size="1"/>
            <IonCol size="10">
              <IonButton expand="block" color="primary" onClick={onSend}>Send</IonButton>
            </IonCol>
            <IonCol size="1"/>
          </IonRow>
      </IonGrid>
    
    </div>
  );
};

export default GrowthInput;