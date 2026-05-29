import { forwardRef } from "react";
import Label from "./label";
import Input from "./input";

const Form = forwardRef(
  ({ label, name, type, placeholder, id, onChange, value }, ref) => {
    return (
      <div className="flex flex-col mb-1 font-helvetica md:mb-2 gap-1">
        <Label htmlFor={name}>{label}</Label>
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          id={id}
          ref={ref}
          onChange={onChange}
          value={value}
        />
      </div>
    );
  },
);

export default Form;
