const Label = ({ htmlFor, children }) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs font-semibold tracking-wider uppercase text-lp-gray"
    
    >
      {children}
    </label>
  );
};

export default Label;
