import React from 'react';
import { IonGrid, IonRow, IonCol, IonButton, IonIcon } from '@ionic/react';
import { GrowthData, DataProvider } from '../model/Models'
import { closeCircleOutline, closeOutline } from 'ionicons/icons';

const DataTable: React.FC<DataProvider> = ({ data, onDelete }) => {

    return (
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
            {data.map((dg: GrowthData, index: number) => (
                <div>
                    <IonRow key={`row-${index}`}>
                        <IonCol size="10">{dg.datetime}</IonCol>
                        <IonCol size="2">
                            <IonButton color="danger" onClick={() => onDelete({index, dg})}>
                                <IonIcon icon={closeOutline} onClick={() => onDelete({index, dg})}/>
                            </IonButton>
                        </IonCol>
                    </IonRow>
                    <IonRow key={`row-${index}`}>
                        <IonCol>{dg.breast}</IonCol>
                        <IonCol>{dg.pumped}</IonCol>
                        <IonCol>{dg.powder}</IonCol>
                        <IonCol>{dg.weight}</IonCol>
                    </IonRow>
                </div>
            ))}
        </IonGrid>
    )
}

export default DataTable