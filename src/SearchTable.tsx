import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Button } from "./components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
import { useEffect, useState } from "react";

// const rows = [{}, {}, {}, {}, {}, {}, {}];

const SearchTable: React.FC = () => {
  // The query states tracks the inputs in the search bar
  const [query, setQuery] = useState("");
  // SearchResults states stores the returns the matched results from the query pulled from the API
  const [searchResults, setSearchResults] = useState<any[]>([]);
  // Loading states tracks when a search is currently being conducted
  const [loading, setLoading] = useState(false);
  // SelectedLanguage was my attempt to contruct the functionality of the drop down to modify searchResults
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  // Pagination Logic - setting the expected number of elements per page then calculated the number of pages required to render all elements in the list
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 20;
  const totalItems = searchResults.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  // Sets the exact elements that should render on any given page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
  const currentData = searchResults.slice(startIndex, endIndex + 1);

  // Responsible for fetching data from Countries API
  useEffect(() => {
    // Data is grabbed from the search bar as "query"
    const fetchData = async () => {
      if (query.trim() === "") {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      // Try block will use "query" and search for country name matches in the API data base.
      // Results are saved in the variable "data" and is used to set the value for searchResults
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${query}`
        );
        const data = await response.json();
        console.log(data);
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setLoading(false);
    };

    // Timeout to avoid triggering the API call for every keystroke
    const timeoutId = setTimeout(fetchData, 800);

    // Ensures the fetch data function will only run when there is a change to the "query" state. Once complete it will terminate until another change is detected.
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    setQuery(event.target.value);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // My attempt to selected individual languages from the drop down menu then filter the existing SearchResults by that selected language.
  const handleFilterByLanguage = (language: string) => {
    setSelectedLanguage(language);
    setSearchResults(
      searchResults.filter((country) => country.languages.includes(language))
    );
  };

  return (
    <div className="flex justify-center mt-[100px]">
      <Card className="w-[790px]">
        <CardHeader>
          <CardTitle>Country API Search</CardTitle>
          <CardDescription>
            Start searching to find some information about a country
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4 justify-between">
            <Input
              placeholder="Search for country..."
              value={query}
              onChange={handleInputChange}
              className="max-w-sm"
            />

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by language" />
              </SelectTrigger>
              <SelectContent>
                {/* The logic to select all languages in the search results however the logic fails to add only new instances of languages to the list and adds multiples of languages to the list. The drop down also fails to select only a single language and selects all languages. If given more time my next attempt would be to track the index of each language in the list and use the index to specify the language selected */}
                {currentData.map((result, i) => {
                  const uniqueLanguages = new Set();
                  Object.values(result.languages).forEach((language) => {
                    if (!uniqueLanguages.has(language)) {
                      uniqueLanguages.add(language);
                    }
                  });
                  return Array.from(uniqueLanguages).map((language, i) => (
                    <SelectItem
                      key={i}
                      value="text"
                      onClick={() => handleFilterByLanguage(String(language))}
                    >
                      {String(language)}
                    </SelectItem>
                  ));
                })}

                {/* // Another failed attempt to filter repeat languages.
                //   Object.entries(result.languages).map(
                //     ([key, value], index) => (
                //
                //       <SelectItem key={index} value="text">
                //         {String(value)}
                //       </SelectItem>
                //     )
                //   )
                // )} */}

                {/* <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem> */}
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                {/* Displays a loading indicator when search in being conducted */}
                {loading && <TableHead>Loading...</TableHead>}
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Currency</TableHead>
                <TableHead className="text-center">Capital</TableHead>
                <TableHead className="text-center">Neighbors</TableHead>
                <TableHead className="text-right">Population</TableHead>
                <TableHead className="text-right">Continent</TableHead>
                <TableHead className="text-right">Size (sq km)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* map function that returns the relevant data for name, capital, neighbor ing countries, population, continent county occupies and size by square kilometers. I struggled to return the currency due to the unique shape of the data. I'm not sure i have ran into a problem like that before */}
              {currentData.map((result, i) => (
                <TableRow key={i}>
                  <TableCell className="text-center">
                    <a href={result.maps.googleMaps} target="_blank">
                      {" "}
                      {result.name.common}
                    </a>
                  </TableCell>
                  <TableCell className="text-center"></TableCell>
                  <TableCell className="text-center">
                    {result.capital}
                  </TableCell>
                  <TableCell className="text-center">
                    {result.borders && result.borders.join(", ")}
                  </TableCell>
                  <TableCell className="text-center">
                    {result.population}
                  </TableCell>
                  <TableCell className="text-center">
                    {result.continents && result.continents.join(", ")}
                  </TableCell>
                  <TableCell className="text-right">{result.area}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">Page 3 of 5</div>
                <div className="space-x-2">
                  {/* Logic to toggle between pages */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </TableCaption>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchTable;
