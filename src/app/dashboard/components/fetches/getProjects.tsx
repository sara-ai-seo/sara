import ApiCall from "@/app/utils/apicalls/axiosInterceptor";


export async function getServerSideProps(){
    const res = ApiCall.get('/crawl/property');

    return {
        props: {res}
    }
}