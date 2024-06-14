import { useState, FormEventHandler, FormEvent } from 'react';
import { useAppDispatch } from '../hooks';
import { postCoworkingCapabilityAction } from '../store/api-actions';
import { CoworkingCapabilityDto } from '../types/api-shared/coworking-capability-dto';

type CapabilitiesEditingFormProps = {
  coworkingId: string;
  capabilities?: CoworkingCapabilityDto[];

  onSubmit: () => void;
  onCancel: () => void;
};

export default function CapabilitiesEditingForm({ coworkingId, capabilities,
  onSubmit: handleSubmit, onCancel: handleCancel }: CapabilitiesEditingFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const capabilitiesData: string[] = capabilities?.map((capabilityDto) => capabilityDto.capability) ?? [];
  capabilitiesData.push('');

  const [newCapabilities, setNewCapabilities] = useState(capabilitiesData);

  const handleCapabilityChange = (e: FormEvent<HTMLInputElement>, index: number) => {
    const newData = [...newCapabilities];
    newData[index] = e.currentTarget.value;

    if (newData[newData.length - 1]) {
      newData[newData.length] = '';
    }

    setNewCapabilities(newData);
  };
  const handleCapabilityBlur = (index: number) => {
    if (!newCapabilities[index] && newCapabilities.length > 1 && newCapabilities.length - 1 !== index) {
      const newData = [...newCapabilities];
      newData.splice(index, 1);
      setNewCapabilities(newData);
    }
  };

  const handleSubmitClick: FormEventHandler = (e) => {
    e.preventDefault();

    newCapabilities.pop();
    dispatch(postCoworkingCapabilityAction({
      coworkingId: coworkingId,
      capabilities: newCapabilities.map((item) => ({ capability: item }))
    }));

    handleSubmit();
  };

  const handleCancelClick: FormEventHandler = (e) => {
    e.preventDefault();

    handleCancel();
  };

  return (
    <form className="capabilities-form admin-form" action="#" onSubmit={handleSubmitClick}>
      <div className="capabilities-form__wrapper admin-form-wrapper">
        <div className="capabilities-form__top admin-form-top">
          <h2 className="capabilities-form__title admin-form-title title-reset">Технические возможности</h2>
        </div>
        <div className="capabilities-form__bottom admin-form-bottom">
          <div className="capabilities-form__input-group admin-form-input-group">
            <h3 className="capabilities-form__input-label admin-form-label title-reset">Технические возможности</h3>
            {newCapabilities.map((capability, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <input className="capabilities-form__input admin-form-input" key={index}
                type="text" name={`capability-${index}`} id={`capability-${index}`} value={capability}
                onChange={(e) => handleCapabilityChange(e, index)} onBlur={() => handleCapabilityBlur(index)}
              />
            ))}
          </div>
          <div className="admin-form-btns">
            <button className="capabilities-form__submit-btn admin-form-btn white-btn btn-reset" type='submit'>
              Сохранить
            </button>
            <button className="capabilities-form__cancel-btn admin-form-btn light-btn btn-reset" onClick={handleCancelClick}>
              Отменить
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
