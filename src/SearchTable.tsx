import { ChevronDownIcon } from "@radix-ui/react-icons";
import { table } from "console";
import { Button } from "./components/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/Card";
import { Input } from "./components/Input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/Table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@radix-ui/react-select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

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
          <div className="flex items-center py-4">
            <Input placeholder="Search for country..." className="max-w-sm" />
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
                  <TableCell className="font-medium">one</TableCell>
                  <TableCell>two</TableCell>
                  <TableCell>three</TableCell>
                  <TableCell>four</TableCell>
                  <TableCell>five</TableCell>
                  <TableCell>six</TableCell>
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
