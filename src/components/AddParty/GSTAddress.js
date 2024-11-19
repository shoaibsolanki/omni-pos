import Select from "react-select";
import React, { useState } from "react";

const GSTAddress = () => {
  const [selectedOptionTax, setSelectedOptionTax] = useState(null);
  const optionsTax = [
    { value: "1.5", label: "1.5" },
    { value: "1.6", label: "1.6" },
    { value: "1.7", label: "1.7" },
  ];
  return (
    <section>
      <Select
        defaultValue={selectedOptionTax}
        onChange={(e) => {
          if (e) {
            setSelectedOptionTax(e.value);
          } else {
            setSelectedOptionTax(null);
          }
        }}
        // onChange={setSelectedOptionTax}
        options={optionsTax}
        className="my-2"
        // required
        value={optionsTax.filter((el) => el.value == selectedOptionTax)}
        placeholder="Tax"
        styles={{
          menu: (baseStyles, state) => ({
            ...baseStyles,
            // height: "50px",
            // overflow: "auto",
            // fontWeight: "900",
            zIndex: 3,
          }),
          option: (baseStyles, state) => ({
            ...baseStyles,

            // height: "50px",
            // fontWeight: "900",
            zIndex: 3,
            // overflow: "auto",
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,

            // height: "50px",
            zIndex: 3,
            // fontWeight: "900",
            // overflow: "auto",
          }),
        }}
      />
    </section>
  );
};

export default GSTAddress;
