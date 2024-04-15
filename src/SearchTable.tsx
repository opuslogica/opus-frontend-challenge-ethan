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
import { useEffect, useMemo, useState } from "react";

const SearchTable: React.FC = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [filteredResults, setFilteredResults] = useState<any[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(
    ""
  );

  const [currentData, setCurrentData] = useState<any[]>([]);

  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 20;
  const totalItems = searchResults.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  const safeSearchResults = useMemo(
    () => (Array.isArray(searchResults) ? searchResults : []),
    [searchResults]
  );
  // const currentData = safeSearchResults.slice(startIndex, endIndex + 1);

  console.log("Current Data", currentData);
  useEffect(() => {
    const fetchData = async () => {
      if (query.trim() === "") {
        setSearchResults([]);
        return;
      }
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 3000));
      try {
        const response = await fetch(
          `https://restcountries.com/v3.1/name/${query}`
        );
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
      setLoading(false);
    };
    const timeoutId = setTimeout(fetchData, 400);
    return () => clearTimeout(timeoutId);
  }, [query]);

  useEffect(() => {
    const filteredResults = safeSearchResults.filter(
      (country) => Object.values(country.languages).includes(selectedLanguage),
      console.log("SelectedLanguage in useEffect", selectedLanguage)
    );
    setFilteredResults(filteredResults);
  }, [selectedLanguage, safeSearchResults]);

  useEffect(() => {
    // Determine which array to use based on whether filteredResults is empty or not
    const dataToUpdate =
      filteredResults.length > 0 ? filteredResults : safeSearchResults;

    // Update currentData with the relevant data
    setCurrentData(dataToUpdate.slice(startIndex, endIndex + 1));
  }, [safeSearchResults, filteredResults, startIndex, endIndex]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleToggleItems = () => {
    setSelectedLanguage("");
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

            <Select
              defaultValue={selectedLanguage}
              onValueChange={(language) => {
                if (language === selectedLanguage) {
                  console.log("Selected Language", selectedLanguage, language);
                  setFilteredResults(currentData);
                } else {
                  setSelectedLanguage(language);
                }
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by language" />
              </SelectTrigger>
              <SelectContent>
                {(() => {
                  const uniqueLanguages = new Set<string>();
                  currentData.forEach((result) => {
                    const languagesObject = result.languages;
                    Object.keys(languagesObject).forEach((key) => {
                      uniqueLanguages.add(languagesObject[key]);
                    });
                  });
                  const uniqueLanguagesList = Array.from(uniqueLanguages);
                  return uniqueLanguagesList.map((language, index) => (
                    <SelectItem key={index} value={language}>
                      {language}
                    </SelectItem>
                  ));
                })()}
              </SelectContent>
            </Select>
            <button onClick={handleToggleItems}>Toggle language</button>
          </div>
          {safeSearchResults.length === 0 && !loading ? (
            <div className="text-center">No results matched your query</div>
          ) : loading ? (
            <div>Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
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
                {currentData.map((result, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-center">
                      <a
                        href={result.maps.googleMaps}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {" "}
                        {result.name.common}
                      </a>
                    </TableCell>
                    <TableCell className="text-center">
                      {Object.keys(result.currencies).map((currency) => (
                        <div key={currency}>
                          {result.currencies[currency].name}
                        </div>
                      ))}
                    </TableCell>
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
                  <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className="space-x-2">
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SearchTable;
