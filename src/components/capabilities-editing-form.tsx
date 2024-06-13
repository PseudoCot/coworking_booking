import { useState, FormEventHandler, FormEvent, useEffect } from 'react';
import { useAppDispatch } from '../hooks';
import { validateStringsLength } from '../shared/validate-strings-length';
import { postCoworkingCapabilityAction } from '../store/api-actions';
import { CoworkingCapabilityDto } from '../types/api-shared/coworking-capability-dto';

type CapabilitiesEditingFormProps = {
  coworkingId: string;
};

export default function CapabilitiesEditingForm({ coworkingId }: CapabilitiesEditingFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const temp: CoworkingCapabilityDto[] = [];
  const capabilitiesDto: string[] = temp.map((capabilityDto) => capabilityDto.capability); // useAppSelector(getCoworkingCapabilities);
  capabilitiesDto.push('');

  const [capabilities, setCapabilities] = useState(capabilitiesDto);

  const handleCapabilityChange = (e: FormEvent<HTMLInputElement>, index: number) => {
    const newData = [...capabilities];
    newData[index] = e.currentTarget.value;

    if (newData[newData.length - 1]) {
      newData[newData.length] = '';
    }

    setCapabilities(newData);
  };
  const handleCapabilityBlur = (index: number) => {
    if (!capabilities[index] && capabilities.length > 1 && capabilities.length - 1 !== index) {
      const newData = [...capabilities];
      newData.splice(index, 1);
      setCapabilities(newData);
    }
  };

  const [submitEnabled, setSubmitEnabled] = useState(false);
  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();

    capabilities.pop();
    dispatch(postCoworkingCapabilityAction({
      coworkingId: coworkingId,
      capabilities: capabilities.map((item) => ({ capability: item }))
    }));
  };

  useEffect(() => {
    setSubmitEnabled(validateStringsLength(capabilities));
  }, [capabilities]);

  return (
    <form className="capabilities-form admin-form" action="#" onSubmit={handleSubmit}>
      <div className="capabilities-form__wrapper admin-form-wrapper">
        <div className="capabilities-form__top admin-form-top">
          <h2 className="capabilities-form__title admin-form-title title-reset">Технические возможности</h2>
        </div>
        <div className="capabilities-form__bottom admin-form-bottom">
          <div className="capabilities-form__input-group admin-form-input-group">
            <h3 className="capabilities-form__input-label admin-form-label title-reset">Технические возможности</h3>
            {capabilities.map((capability, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <input className="capabilities-form__input admin-form-input" key={index}
                type="text" name={`capability-${index}`} id={`capability-${index}`} value={capability}
                onChange={(e) => handleCapabilityChange(e, index)} onBlur={() => handleCapabilityBlur(index)}
              />
            ))}
          </div>
          <button className="capabilities-form__submit-btn admin-form-btn white-btn btn-reset" type='submit' disabled={!submitEnabled}>
            Сохранить
          </button>
        </div>
      </div>
    </form>
  );
}
