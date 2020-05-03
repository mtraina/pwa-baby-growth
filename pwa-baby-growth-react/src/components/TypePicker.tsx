import React from 'react';
import { IonPicker } from '@ionic/react';

/**
 * the component has three properties that are defined in this 
 * interface since we are using typescript
 */
interface _Props {
    isOpen : boolean
    onSave : Function
    onCancel : Function
}

const TypeColumn = {
    name: "Type",
    options: [
        { text: "Breast", value: "breast" },
        { text: "Pumped", value: "pumped" },
        { text: "Powder", value: "powder" }
    ]
}

const TypePicker: React.FC<_Props> = ({isOpen, onSave, onCancel}) => {
    return (
        <IonPicker 
            isOpen={isOpen} 
            columns={[ TypeColumn ]} 
            buttons={[
                {
                    text: "Cancel",
                    role: "cancel",
                    handler: value => {
                        onCancel()
                    }
                },
                {
                    text: "Confirm",
                    handler: value => {
                        onSave(value)
                    }
                }
            ]}
        />
    )
}

export default TypePicker