import React, { useState } from 'react';
import { IonButton } from '@ionic/react';
import TypePicker from './TypePicker';

import './TypeSelector.css';
import './TypePicker.css';

interface TypeSelectorProps {
    onSave : Function
}

const TypeSelector: React.FC<TypeSelectorProps> = ({ onSave }) => {
    const [pickerIsOpen, setPickerIsOpen] = useState(false);

    const onTypeSave = () => setPickerIsOpen(false)

    return (
        <div>
            <IonButton onClick={() => setPickerIsOpen(true)}>
                Select type
            </IonButton>
            <TypePicker isOpen={pickerIsOpen} onSave={onTypeSave} onCancel={onTypeSave}/>
        </div>
    );
  };
  
  export default TypeSelector