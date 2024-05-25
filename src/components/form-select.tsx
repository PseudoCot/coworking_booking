import { useEffect, useRef, useState } from 'react';

// type FormSelectProps = {
//   selectClasses?: string;
//   optionClasses?: string;

//   id: string;
//   name: string;
//   empty?: boolean;
//   options: SelectOption[];

//   selectedOption: SelectOption;
//   onChange: (value: SelectOption['value']) => void;
//   onClose?: () => void;
// };

// export default function FormSelect({ selectClasses = '', optionClasses = '', id, name, empty = false, options,
//   selectedOption, onChange: handleChange, onClose: handleClose }: FormSelectProps): JSX.Element {
//   const wrapperRef = useRef<HTMLDivElement>(null);

//   const [isOpen, setIsOpen] = useState(false);

//   useEffect(() => {
//     const handleClick = (e: MouseEvent) => {
//       if (e.target instanceof Node && !wrapperRef.current?.contains(e.target)) {
//         isOpen && onClose?.();
//         setIsOpen(false);
//       }
//     };

//     window.addEventListener('click', handleClick);

//     return () => {
//       window.removeEventListener('click', handleClick);
//     };
//   }, [isOpen]);

//   return (
//     <div ref={wrapperRef}>

//     </div>

//   // <select className="booking__form-select cb-form-input" name="type" id="booking-type">
//   //   {empty &&
//   //     <option className="booking__form-select-option" value="" selected disabled hidden />}
//   //   <option className="booking__form-select-option" value="Столы" selected={!empty}>Столы</option>
//   //   <option className="booking__form-select-option" value="Переговорные">Переговорные</option>
//   // </select>
//   );
// }

