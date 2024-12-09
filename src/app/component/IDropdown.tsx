import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import { useEffect, useState } from "react";

export interface NameCode {
  name: string;
  code: string;
}

interface IDropdownInterface {
  seLectedKeyValue: NameCode;
  itemKeyValue?: NameCode[];
  onChange:(event: DropdownChangeEvent)=>void;
  label: string;
  defaultValue?: string; // `defaultValue` is not being used but kept for compatibility.
}

const IDropdown = (props: IDropdownInterface) => {
  const [selectedItem, setSelectedItem] = useState<NameCode | null>(
    props.seLectedKeyValue
  );
  const [itemsKeyValue, setItemKeyValue] = useState<NameCode[]>(
    props.itemKeyValue ?? []
  );

  useEffect(() => {
    // Update local state when props change
    setSelectedItem(props.seLectedKeyValue);
    setItemKeyValue(props.itemKeyValue ?? []);
  }, [props.seLectedKeyValue, props.itemKeyValue]);

  return (
    <div className="card flex flex-col w-full space-y-2">
      <label htmlFor={props.label} className="font-medium text-sm">
        {props.label}
      </label>
      <Dropdown
        value={selectedItem}
        onChange={(e: DropdownChangeEvent) => {
          const selected = e.value;
          setSelectedItem(selected); // Update local state
          props.onChange(e); 
        }}
        options={itemsKeyValue}
        optionLabel="name" // Display `name` field from `NameCode`
        optionValue="code" // Use `code` field as the actual value
        placeholder={`Select a ${props.label}`}
        className="w-full"
        style={{ width: "100%" }}
      />
    </div>
  );
};

export default IDropdown;
