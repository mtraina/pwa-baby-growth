import React, { useState }  from 'react';
import { IonGrid, IonRow, IonCol, IonButton, IonIcon, IonAlert } from '@ionic/react';
import { GrowthData, DataProvider, GrowthDataTableElem } from '../model/Models'
import { closeOutline } from 'ionicons/icons';

const DataTable: React.FC<DataProvider> = ({ data, onDelete, onSend }) => {

    const [onSendAlertIsOpen, isOnSendAlertOpen] = useState(false);
    const [onDeleteAlertIsOpen, isOnDeleteAlertOpen] = useState(false);
    const [elementToBeDeleted, setElementToBeDeleted] = useState<GrowthDataTableElem | null>(null)

    const preDelete = (g: GrowthDataTableElem) => {
        setElementToBeDeleted(g)
        isOnDeleteAlertOpen(true)
    } 

    return (
        <div>
        <IonAlert
          isOpen={onSendAlertIsOpen}
          onDidDismiss={() => console.log()}
          header={'Send'}
          message={'Do you want to send it?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                  isOnSendAlertOpen(false)
              }
            },
            {
              text: 'OK',
              handler: () => {
                  onSend.apply("send")
                  isOnSendAlertOpen(false)
              }
            }
          ]}/>

        <IonAlert
          isOpen={onDeleteAlertIsOpen}
          onDidDismiss={() => console.log()}
          header={'Delete'}
          message={'Do you want to delete this entry?'}
          buttons={[
            {
              text: 'Cancel',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                  setElementToBeDeleted(null)
                  isOnDeleteAlertOpen(false)
              }
            },
            {
              text: 'OK',
              handler: () => {
                  onDelete(elementToBeDeleted)
                  isOnDeleteAlertOpen(false)
              }
            }
          ]}/>

        <IonGrid>
            {data.length > 0 &&
                <div>
                    <IonRow>
                        <IonCol size="8">Date/Time</IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol>Breast</IonCol>
                        <IonCol>Pumped</IonCol>
                        <IonCol>Powder</IonCol>
                        <IonCol>Weight</IonCol>
                    </IonRow>
                </div>
            }
            {data.map((gd: GrowthData, index: number) => (
                <div>
                    <IonRow key={`row-${index}`}>
                        <IonCol size="10">{gd.datetime}</IonCol>
                        <IonCol size="2">
                            <IonButton color="danger" onClick={() => preDelete({index, gd})}>
                                <IonIcon icon={closeOutline} onClick={() => onDelete({index, gd})}/>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow key={`row-${index}`}>
                        <IonCol>{gd.breast}</IonCol>
                        <IonCol>{gd.pumped}</IonCol>
                        <IonCol>{gd.powder}</IonCol>
                        <IonCol>{gd.weight}</IonCol>
                    </IonRow>
                </div>
            ))}

            {data.length > 0 &&
            <IonRow>
                <IonCol size="12">
                    <IonButton expand="block" color="primary" onClick={() => isOnSendAlertOpen(true)}>Send</IonButton>
                </IonCol>
            </IonRow>
            }
        </IonGrid>
        </div>
    )
}

export default DataTable