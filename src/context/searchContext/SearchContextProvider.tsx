import { useDebouncedState } from "@mantine/hooks"
import { SearchContext } from "./searchContext"

interface ISearchProviderProps {
    children: React.ReactNode;
}

function SearchContextProvider({ children }: ISearchProviderProps) {

    const [searchText, setSearchText] = useDebouncedState("", 200);

    const ctx = {
        searchText,
        setSearchText
    }

    return (
        <SearchContext.Provider value={ctx}>
            {children}
        </SearchContext.Provider>
    )
}

export default SearchContextProvider;

