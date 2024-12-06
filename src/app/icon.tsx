import {ImageResponse} from "next/og";
export const runtime = "edge";
export const size = {
    width: 32,
    height: 32,
}
export const contentType = "image/png";
export default function Icon(){
    return new ImageResponse(
        <div style={{
            width:"100%",
            height:"100%",
            backgroundColor:"#1570EF",
            color:"#fff",
            display:"flex",
            justifyContent:"center",
        }}>
            W
        </div>
    ), {...size}
}