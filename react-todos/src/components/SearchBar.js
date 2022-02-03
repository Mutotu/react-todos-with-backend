const SearchBar = (props) => {
  return (
    <div>
      <input
        type='text'
        value={props.search}
        onChange={(e) => {
          props.setSearch(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
