const Searchbar = (props) => {
  const {searchTerm, setSearchTerm} = props;
  return (
    <form>
        <input type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      </form>
  )
}

export default Searchbar;