import usePlacesAutocomplete from "use-places-autocomplete";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

type SearchCityProps = {
  onCitySelect: (description: any) => void;
  placeholder: string;
};

export const SearchCity = ({ onCitySelect, placeholder }: SearchCityProps) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
    // eslint-disable-next-line react-server-components/use-client
  } = usePlacesAutocomplete({
    callbackName: "YOUR_CALLBACK_NAME",
    requestOptions: {
      types: ["country", "locality"],
      language: "ru",
    },
    debounce: 300,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect =
    ({ description }: any) =>
    () => {
      setValue(description, false);
      onCitySelect(description);
      console.log(description);

      clearSuggestions();
    };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li
          className="cursor-pointer"
          key={place_id}
          onClick={handleSelect(suggestion)}
        >
          <p className="text-base text-foreground">{main_text}</p>
          <p className="text-xs text-muted-foreground">{secondary_text}</p>
        </li>
      );
    });

  return (
    <div className="w-full">
      <Input
        className="text-sm"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder={placeholder}
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && (
        <div className="flex flex-col gap-2">
          <ul
            className={`absolute bg-[var(--tg-background-color)] p-2 shadow-sm`}
          >
            {renderSuggestions()}
          </ul>
          <Separator />
        </div>
      )}
    </div>
  );
};
