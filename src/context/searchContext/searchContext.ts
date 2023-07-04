import { createContext } from "react";

interface ISearchContext {
    search: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    debounced: string
}

const initialValue = {
    search: "",
    setSearch: () => { },
    debounced: ""
}

export const SearchContext = createContext<ISearchContext>(initialValue);