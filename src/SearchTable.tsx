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

const rows = [{}, {}, {}, {}, {}, {}, {}];

const SearchTable: React.FC = () => {
  return (
    <div className="flex justify-center mt-[100px]">
      <Card className="w-[720px]">
        <CardHeader>
          <CardTitle>Country API Search</CardTitle>
          <CardDescription>
            Start searching to find some information about a country
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center py-4 justify-between">
            <Input placeholder="Search for country..." className="max-w-sm" />

            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Currency</TableHead>
                <TableHead className="text-center">Capital</TableHead>
                <TableHead className="text-right">Neighbors</TableHead>
                <TableHead className="text-right">Population</TableHead>
                <TableHead className="text-right">Continent</TableHead>
                <TableHead className="text-right">Size</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className="text-center">one</TableCell>
                  <TableCell className="text-center">two</TableCell>
                  <TableCell className="text-center">three</TableCell>
                  <TableCell className="text-center">four</TableCell>
                  <TableCell className="text-center">five</TableCell>
                  <TableCell className="text-center">six</TableCell>
                  <TableCell className="text-right">seven</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableCaption>
              <div className="flex items-center justify-between space-x-2 py-4">
                <div className="text-sm text-muted-foreground">Page 3 of 5</div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
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
