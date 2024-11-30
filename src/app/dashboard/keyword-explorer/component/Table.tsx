import React from 'react'

export default function Table() {
  return (
    <div>
        <table className="w-full">
            <thead className="bg-[#F9FAFB] w-full">
              <tr className=" h-[44px] text-xs text-[#475467]  font-medium">
                <th className="text-left px-6">
                  {/* {" "}
                  <span className="flex items-center gap-2 p-2 px-6">
                    {" "}
                    <input type="checkbox" className="" /> Keywords{" "}
                  </span> */}
                  Keywords
                </th>
                <th>
                  {" "}
                  <span className="flex items-center gap-1 p-2 px-6">
                    {" "}
                    Volume <DetailButton title={""} /> <MdArrowUpward />{" "}
                  </span>{" "}
                </th>
                <th>
                  {" "}
                  <span className="flex items-center gap-1 p-2 px-6">
                    {" "}
                    KD <DetailButton title={""} />{" "}
                  </span>{" "}
                </th>
                <th>
                  {" "}
                  <span className="flex items-center gap-1 p-2 px-6">
                    {" "}
                    CPC <DetailButton title={""} />{" "}
                  </span>{" "}
                </th>
                {/* <th>
                  {" "}
                  <span className="flex items-center gap-1 p-2 px-6">
                    {" "}
                    SERP features <DetailButton title={""} />{" "}
                  </span>{" "}
                </th> */}

                <th>
                  <span className="flex items-center gap-1 p-2 px-6">LTB</span>
                </th>

                <th>
                  <span className="flex items-center gap-1 p-2 px-6">HTB</span>
                </th>
                <th>
                  {" "}
                  <span className="flex items-center gap-1 p-2 px-6">
                    {" "}
                    Update
                  </span>{" "}
                </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {isPending && (
                <div className="h-20 w-full">
                  <Loader />
                </div>
              )}
              {data?.map((data: any, index: number) => {
                // const detail = {
                //   keyword: 
                // }
                return (
                  <tr key={index} className=" border-b">
                    <td className="px-6">
                      <span className="flex items-center gap-2 ">
                        {/* <input type="checkbox" className="" /> */}
                        {data[0] }
                        <AiOutlineExpandAlt
                          onClick={() => {
                            setDetail(true);
                            setKeyword(data.keyword);
                            setCurrent()
                            
                          }}
                          className="bg-[#EFF8FF] p-0.5 text-[#1570EF] cursor-pointer rounded text-2xl"
                        />
                      </span>
                    </td>
                    <td className="  p-2 px-6 rounded-full">
                      <span className={``}>{data.search_volume ?? 0} </span>{" "}
                    </td>
                    <td className="  p-2  rounded-full">
                      <span
                        className={`p-1 w-2/3 rounded-3xl text-center flex items-center justify-center ${
                          data.competition_index > 39
                            ? "bg-[#F6FEF9] text-[#12B76A]"
                            : "bg-[#FFFAEB] text-[#B54708] "
                        }`}
                      >
                        {" "}
                        <GoDotFill />
                        {data.competition_index ?? 0}{" "}
                      </span>{" "}
                    </td>
                    <td className="  p-2 px-6 rounded-full">
                      <span className={``}>${data.cpc ?? 0}</span>{" "}
                    </td>
                    {/* <td className="  p-2 px-6 rounded-full"> */}
                    {/* <span className={`flex items-center gap-2 text-sm`}>
                        {data.serp.includes("link") && <FaLink />}
                        {data.serp.includes("image") && <CiImageOn />}
                        {data.serp.includes("shop") && <IoCartOutline />}
                        {data.serp.includes("video") && <FaVideo />}
                      </span>{" "} */}
                    {/* </td> */}

                    <td className="  p-2 px-6 rounded-full">
                      {data.high_top_of_page_bid ?? 0}
                    </td>

                    <td className="  p-2 px-6 rounded-full">
                      {data.low_top_of_page_bid ?? 0}
                    </td>
                    <td className="  p-2 px-6 rounded-full">
                      <span className={``}>
                        {/* {moment(keywordAnalysisData?.[0].project).fromNow()} */}
                      </span>
                    </td>
                    {/* <td className="  p-2 px-6  ">
                      <span
                        className={`  border flex p-3 items-center justify-center rounded-lg cursor-pointer text-primary `}
                      >
                        {" "}
                        <FiRefreshCw />
                      </span>{" "}
                    </td> */}
                  </tr>
                );
              })}
              
            </tbody>
          </table>
    </div>
  )
}
