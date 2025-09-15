import { Input } from "./ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RouteProductSearch } from "./Helpers/RouteNames";
const SearchBar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const getInput = (e) => {
    setQuery(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(RouteProductSearch(query));
  };
  return (
    <form onSubmit={handleSubmit}>
      <Input
        name="q"
        onInput={getInput}
        type="text"
        placeholder="Search here..."
        className="h-9 rounded-full  bg-gray-100"
      />
    </form>
  );
};

export default SearchBar;
