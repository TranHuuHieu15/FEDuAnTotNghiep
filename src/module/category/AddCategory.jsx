import Button from "../../components/button/Button";
import Heading from "../../components/heading/Heading";
import Input from "../../components/input/Input";
import Label from "../../components/label/Label";
import Select from "../../components/select/Select";

const AddCategory = () => {
  return (
    <div className="h-screen min-h-full shadow-lg">
      <Heading className="my-10 text-lg text-center">Add New Category</Heading>
      <form>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex flex-col mb-5">
            <Select
              title="Brand"
              className="w-[300px] px-3 py-2 my-1"
              className2="font-medium text-base"
            >
              <option value="gucci">Gucci</option>
              <option value="gucci">Gucci</option>
              <option value="gucci">Gucci</option>
            </Select>
          </div>
          <div className="mb-5">
            <Label>Name</Label>
            <Input
              name="name"
              placeholder="Enter name category"
              className="w-[300px]"
            />
          </div>
          <div className="flex flex-col mb-5">
            <Label>Description</Label>
            <textarea
              name="name"
              placeholder="Enter description"
              className="w-[300px] px-2 py-2 text-start my-2 border rounded-md"
            />
          </div>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
