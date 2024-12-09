import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { Password } from "primereact/password";

interface ITextInputComponentInterface {
  label: string;
  id: string;
  type?: HTMLInputTypeAttribute | undefined;
  helpText?: string;
  isTextArea?: boolean;
  isPassword?: boolean;
  textAreaOptions?: {
    cols: number;
    row: number;
  };
  iconField?: {
    isShow: boolean;
    iconPosition: "left" | "right" | undefined;
    icon: string;
  };
  value?: string;
  defaultValue?: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

const ITextInputComponent = (props: ITextInputComponentInterface) => {
  const iconContent = props.iconField?.isShow ? (
    <InputIcon className={`${props.iconField.icon}`} />
  ) : (
    <div></div>
  );

  return (
    <div className="card flex flex-col w-full space-y-2">
      <label htmlFor={props.id} className="font-medium text-sm">
        {props.label}
      </label>

      <IconField
        key={props.id}
        iconPosition={props.iconField?.iconPosition ?? undefined}
        className="w-full"
      >
        {iconContent}

        {props.isTextArea ? (
          <InputTextarea
            placeholder={props.label}
            value={props.value}
            defaultValue={props.defaultValue}

            onChange={(e) => props.onChange && props.onChange(e)}
            rows={props.textAreaOptions?.row ?? 5}
            cols={props.textAreaOptions?.cols ?? 30}
            className="w-full"
          />
        ) : (
          <InputText
            type={props.isPassword ? "password" : "text"}
            placeholder={props.label}
            defaultValue={props.defaultValue}
            // value={props.value}
            onChange={(e) => props.onChange && props.onChange(e)}
            id={props.id}
            className="w-full"
            aria-describedby={`${props.id}-help`}
          />
        )}
      </IconField>

      {/* Help Text */}
      {props.helpText && (
        <small id={`${props.id}-help`} className="text-blue-600 text-xs">
          {props.helpText}
        </small>
      )}
    </div>
  );
};

export default ITextInputComponent;
