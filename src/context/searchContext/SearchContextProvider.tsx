import { useDebouncedValue } from "@mantine/hooks";
import { useState } from "react";
import { SearchContext } from "./searchContext";

interface IDataProviderProps {
    children: React.ReactNode;
}
/**
 * @returns Search string for the query param of the post request for getting the employee details
 */
function SearchContextProvider({ children }: IDataProviderProps) {
    /** State for storing the input value of search component */
    const [search, setSearch] = useState<string>('');
    /** debounced value which is stored after 500 ms */
    const [debounced] = useDebouncedValue(search, 500);
    /** Values to be passed in search
     *  context provider, which is to be consumed */
    const dataCtx = {
        search,
        setSearch,
        debounced
    };

    return (
        <SearchContext.Provider value={dataCtx}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider;

