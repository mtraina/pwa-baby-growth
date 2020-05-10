import React from 'react';
import { IonGrid, IonRow, IonCol, IonButton } from '@ionic/react';
import { GrowthData, DataProvider } from '../model/Models'

const DataTable: React.FC<DataProvider> = ({ data, onDelete }) => {

    return (
        <IonGrid>
            <IonRow>
                <IonCol>Date/Time</IonCol>
                <IonCol>Breast</IonCol>
                <IonCol>Pumped</IonCol>
                <IonCol>Powder</IonCol>
                <IonCol>Weight</IonCol>
            </IonRow>
            {data.map((dg: GrowthData, index: number) => (
                <IonRow key={`row-${index}`}>
                    <IonCol>{dg.datetime}</IonCol>
                    <IonCol>{dg.breast}</IonCol>
                    <IonCol>{dg.pumped}</IonCol>
                    <IonCol>{dg.powder}</IonCol>
                    <IonCol>{dg.weight}</IonCol>
                    <IonCol>
                        <IonButton color="danger" onClick={() => onDelete({index, dg})}>Delete</IonButton>
                    </IonCol>
                </IonRow>
            ))}
        </IonGrid>
    )
}

export default DataTable