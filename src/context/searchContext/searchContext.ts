import { createContext } from "react";

interface ISearchContext {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    debounced: string
}
/** Initial value to be added in search context */
const initialValue = {
    search: "",
    setSearch: () => { },
    debounced: ""
}
/**  Creating a context for storing the value of search string for the query params  */
export const SearchContext = createContext<ISearchContext>(initialValue);