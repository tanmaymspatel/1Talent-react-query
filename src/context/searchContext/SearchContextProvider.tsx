import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";
import { SearchContext } from "./searchContext";

interface IDataProviderProps {
    children: React.ReactNode;
}
/**
 * @returns State for the search functionality 
 */
function SearchContextProvider({ children }: IDataProviderProps) {
    const [search, setSearch] = useState<string>('')
    const [debounced] = useDebouncedValue(search, 500)
    const dataCtx = {
        search,
        setSearch,
        debounced
    }

    return (
        <SearchContext.Provider value={dataCtx}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider;

