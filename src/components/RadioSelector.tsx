import { Label } from "./ui/label";
import { RadioGroupItem } from "./ui/radio-group";

type RadioSelectorProps = {
  label: string;
  value: string;
  id: string;
  onClick: () => void;
};

const RadioSelector = ({ label, value, id, onClick }: RadioSelectorProps) => {
  return (
    <div
      className="flex items-center justify-between space-x-2 border-2 border-border rounded-md bg-white cursor-pointer pe-5"
      onClick={onClick}
    >
      <Label
        htmlFor={id}
        className="text-md cursor-pointer w-full h-full ps-5 py-3"
      >
        {label}
      </Label>
      <RadioGroupItem value={value} id={id} />
    </div>
  );
};

export default RadioSelector;
