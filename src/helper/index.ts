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