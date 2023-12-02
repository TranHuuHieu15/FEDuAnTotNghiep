import { useForm } from "react-hook-form";
import RadioButtonFilter from "../radioButton/RadioButtonFIlter";

const Filter = () => {
  const { control } = useForm();

  return (
    <>
      <div className="flex flex-col my-5">
        <h3 className="font-normal">FILTERs</h3>
        <RadioButtonFilter
          label="Woman"
          name="filter"
          value="woman"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Man"
          name="filter"
          value="man"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Girls"
          name="filter"
          value="girls"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Babies"
          name="filter"
          value="babies"
          ripple={true}
          control={control}
        />
      </div>
      <div className="flex flex-col my-5">
        <h3 className="font-normal">BRANDS</h3>
        <RadioButtonFilter
          label="Chanel"
          name="brand"
          value="chanel"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Gucci"
          name="brand"
          value="gucci"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="D&G"
          name="brand"
          value="d&g"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Zara"
          name="brand"
          value="zara"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Dior"
          name="brand"
          value="dior"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Versace"
          name="brand"
          value="versace"
          ripple={true}
          control={control}
        />
      </div>
      <div className="flex flex-col my-5">
        <h3 className="font-normal">CATEGORIES</h3>
        <RadioButtonFilter
          label="Dresses"
          name="category"
          value="dresses"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Jacket"
          name="category"
          value="jacket"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Tops"
          name="category"
          value="tops"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Vintages"
          name="category"
          value="vintages"
          ripple={true}
          control={control}
        />
      </div>
      <div className="flex flex-col my-5">
        <h3 className="font-normal">SIZES</h3>
        <RadioButtonFilter
          label="Sexy Plus Size"
          name="size"
          value="xs"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Plus Size"
          name="size"
          value="s"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Medium"
          name="size"
          value="m"
          ripple={true}
          control={control}
        />
        <RadioButtonFilter
          label="Large"
          name="size"
          value="l"
          ripple={true}
          control={control}
        />
      </div>
    </>
  );
};

export default Filter;
