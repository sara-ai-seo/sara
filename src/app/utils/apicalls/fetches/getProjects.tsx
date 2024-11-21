import ApiCall from "../axiosInterceptor";

export async function getServerSideProps(){
    const res = ApiCall.get('/crawl/property');

    return {
        props: {res}
    }
}