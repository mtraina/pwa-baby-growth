import React from 'react';
import { IonPicker } from '@ionic/react';
import { PickerColumn } from "@ionic/core";


/**
 * the component has three properties that are defined in this 
 * interface since we are using typescript
 */
interface TypePickerProps {
    isOpen : boolean
    onSave : Function
    onCancel : Function
}

const DayColumn = {
    name: "Day",
    options: [
      { text: "Monday", value: "Monday" },
      { text: "Tuesday", value: "Tuesday" },
      { text: "Wednesday", value: "Wednesday" },
      { text: "Thursday", value: "Thursday" },
      { text: "Friday", value: "Friday" }
    ]
  } as PickerColumn

const TypePicker: React.FC<TypePickerProps> = ({isOpen, onSave, onCancel}) => {

    return (
        <div>
            <IonPicker
                isOpen={isOpen}
                columns={[DayColumn]}
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
            ></IonPicker>
        </div>
    );
  };
  
  export default TypePicker;