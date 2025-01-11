import moment from "moment";

export function FormattedDate(date: string){
return moment(date).format("Do MMM, YYYY")
}

export const arrowStyle = (value: number): string => {
    return value > 0 ? "text-green-500" : value < 0 ? "text-red-400 rotate-180" : "";
  };

  export const getClass = (value: number) => {
    return value > 0 ? "text-green-200" : value < 0 ? "text-red-400" : "text-gray-200";
  };
  export const getClassTwo = (value1: number, value2: number) => {
    return value2 > value1 ? " text-green-500" : value1 > value2 ? "text-red-300" : " text-gray-300";
  };

  export const arrowStyleTwo = (value1: number, value2: number): string => {
    return value2 > value1  ? "text-green-500" : value2 < value1 ? "text-red-400 rotate-180" : "text-gray-200";
  };