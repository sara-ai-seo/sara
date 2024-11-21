import React from 'react';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";


interface DataProps {
    location_name: string;
    flags?: { svg: string };
    location_code: number;
    available_languages: any[]
}
interface Props {
    handleCountrySelect: (country: string) => void;
    placeholder?: string;
    data: DataProps[]
}

const CountrySelect: React.FC<Props> = ({
    handleCountrySelect,
    placeholder = "Select a location",
    data
}) => {
    return (
        <Select onValueChange={(value) => {
            handleCountrySelect(value)
        }}>
            <SelectTrigger className="p-6 max-w-[300px]">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Countries</SelectLabel>
                    {data.map((country, i) => (
                        <SelectItem key={i} value={country.location_name} className=''>
                         <div className='flex items-center gap-2 py-3'>
                         {country.flags?.svg && (
                          <Image src={country.flags.svg} alt={country.location_name} height={10} width={20} />
                        )}
                        <span>{country.location_name}</span>
                         </div>
                      </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default CountrySelect;