import React , { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { CiSearch } from "react-icons/ci";

import { CategoryItem, IssuesType } from "@/types/technicalseo/IssuesType";
import { BsDot } from "react-icons/bs";
import Loader from "@/app/component/Loader";
import IssueCustomAccordion from "./IssueCustomAccordion";
import FeaturedIcon from "@/components/svgComponents/FeaturedIcon";
import { CrawlingData, IssueTab } from "@/types/technicalseo/technicalSeoTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import ApiCall from "@/app/utils/apicalls/axiosInterceptor";
import { CurrentProperty } from "@/app/utils/currentProperty";
import { issuesData } from "./(technicalseo)/issueData";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { FaCaretDown, FaCaretRight } from "react-icons/fa6";
import { Button } from "@/components/ui/button";

// Define the data type for table rows
interface IssueTableData {
  id: string;
  key: string;
  value: number;
  description?: string;
  fix?: string;
  title?: string;
}

const columnHelper = createColumnHelper<IssueTableData>();

export default function Issues() {
  const [currentFilter, setCurrentFilter] = useState("All issues");
  const [expandedRowId, setExpandedRowId] = useState<string | null>(null);
  
  const id = CurrentProperty();

  const issues = useQuery({
    queryKey: ["issues"],
    queryFn: async () => {
      const response = await ApiCall.get(`/user/crawler/technical-seo/by-tab/${id.id}?tab=issues`);
      return response.data;
    }
  });

  const rawData = issues?.data?.project?.crawlings[0]?.crawlingData[0]?.data?.issues;

  const capitalizeFirstLetter = (val: string) => {
    if (!val) return '';
    return val.charAt(0).toUpperCase() + val.slice(1);
  };

  interface filteredDataDto {
    [key: string]: number;
  }

  const filterData = (): filteredDataDto => {
    return (rawData && Object.entries(rawData as Record<string, number>)
      .filter(([key, value]) => value > 0)
      .reduce((acc, [key, value]) => {
        acc[key] = value as number;
        return acc;
      }, {} as Record<string, number>)) || {};
  };

  // Fixed function to match by extracting key from title
  const getIssueByKey = (key: string) => {
    // Try to find by extracting the key from the title (in parentheses)
    const issue = issuesData.find(issue => {
      // Extract text within parentheses from the title
      const titleMatch = issue.title.match(/\(([^)]+)\)/);
      if (titleMatch) {
        const extractedKey = titleMatch[1];
        return extractedKey === key;
      }
      return false;
    });
    
    // Debug logging
    if (!issue) {
      // console.log(`No issue found for key: "${key}"`);
      console.log('Available issues:', issuesData.map(i => {
        const titleMatch = i.title.match(/\(([^)]+)\)/);
        return {
          title: i.title,
          extractedKey: titleMatch ? titleMatch[1] : null
        };
      }));
    }
    
    return issue;
  };

  // Handle single row expansion - only one row can be open at a time
  const toggleRowExpansion = (rowId: string) => {
    setExpandedRowId(prev => prev === rowId ? null : rowId);
  };

  const tableData = useMemo(() => {
    try {
      const data = filterData() || {};
      return Object.entries(data).map(([key, value]) => {
        const issueInfo = getIssueByKey(key);
        
        // Try different possible property names for description and fix
        let description = "No description available";
        let fix = "No fix information available";
        
        if (issueInfo) {
          // Try multiple possible property names for description
          description = (issueInfo as any).Description || 
                       (issueInfo as any).description || 
                       (issueInfo as any).desc || 
                       "No description available";
          
          // Try multiple possible property names for fix
          fix = (issueInfo as any)["How to Fix"] || 
                (issueInfo as any)["how to fix"] || 
                (issueInfo as any).fix || 
                (issueInfo as any).Fix || 
                (issueInfo as any).solution || 
                (issueInfo as any).Solution || 
                "No fix information available";
        }
        
        return {
          id: key,
          key,
          value: Number(value) || 0,
          description,
          fix,
          title: (issueInfo as any)?.title || capitalizeFirstLetter(key)
        };
      });
    } catch (error) {
      console.error("Error processing table data:", error);
      return [];
    }
  }, [rawData]);

  // Define table columns
  const columns = [
    columnHelper.accessor('key', {
      header: 'Issues',
      cell: (info) => (
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleRowExpansion(info.row.id);
            }}
            className="flex items-center gap-2 hover:text-blue-600 transition-colors"
          >
            {expandedRowId === info.row.id ? (
              <FaCaretDown className="w-4 h-4" />
            ) : (
              <FaCaretRight className="w-4 h-4" />
            )}
            <Image
              src="/dashboard/error.svg"
              alt="Error"
              width={20}
              height={20}
            />
            <span className="font-medium">
              {info.row.original.title}
            </span>
          </button>
        </div>
      ),
    }),
    columnHelper.accessor('value', {
      header: 'Pages Affected',
      cell: (info) => (
        <span className="text-gray-600">
          {info.getValue()} pages
        </span>
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Description and How to Fix',
      cell: (info) => (
        <div className="flex justify-center">
          <span className="text-blue-600 text-sm">
            {expandedRowId === info.row.id ? 'Click to collapse' : 'Click to expand'}
          </span>
        </div>
      ),
    }),
  ];

  // Create table instance - NO EXPANSION STATE
  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  const tabsFilter = [
    { name: "All issues" },
    {
      name: "Errors",
      icon: (
        <Image
          src="/dashboard/error.svg"
          alt="Error"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "Warnings",
      icon: (
        <Image
          src="/dashboard/warning.svg"
          alt="Warning issues"
          width={24}
          height={24}
        />
      ),
    },
    {
      name: "Notices",
      icon: (
        <Image
          src="/dashboard/notices.svg"
          alt="Notices"
          width={24}
          height={24}
        />
      ),
    },
  ];

  if (issues.isPending) {
    return (
      <div className="h-14 w-full flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 py-8">
      {/* TOP FILTERS */}
      <section className="w-full">
        <div className="flex flex-wrap items-center justify-between w-full gap-4 bg-white">
          {/* <div className="flex items-center gap-2 flex-wrap">
            {tabsFilter.map((item, index) => (
              <button
                key={index}
                title={item.name}
                className={`flex items-center border shadow-md rounded-md p-4 py-2 gap-2 hover:bg-[#EFF8FF] transition-colors ${
                  currentFilter === item.name ? "bg-[#EFF8FF]" : "bg-[#FFF]"
                }`}
                onClick={() => setCurrentFilter(item.name)}
              >
                {item.icon && item.icon} 
                <span>
                  {item.name}
                  {item.name === "All issues" && `, ${Object.keys(filterData()).length}`}
                </span>
              </button>
            ))}
          </div> */}
        </div>
      </section>

      {/* TABLE */}
      <div className="w-full">
        <div className="rounded-lg border bg-white shadow-sm">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="border-b">
                  {headerGroup.headers.map((header) => (
                    <TableHead 
                      key={header.id}
                      className="px-6 py-4 text-left text-sm font-semibold text-gray-900"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <React.Fragment key={row.id}>
                  {/* Main row */}
                  <TableRow 
                    className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => toggleRowExpansion(row.id)}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="px-6 py-4">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                  
                  {/* Expanded content */}
                  {expandedRowId === row.id && (
                    <TableRow className="bg-gray-50">
                      <TableCell colSpan={columns.length} className="px-6 py-0">
                        <div 
                          className="overflow-hidden transition-all duration-300 ease-in-out"
                          style={{
                            maxHeight: expandedRowId === row.id ? '500px' : '0px',
                          }}
                        >
                          <div className="py-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-3">
                                <h4 className="font-semibold text-gray-900 text-lg">
                                  Issue Description
                                </h4>
                                <div className="text-sm text-gray-600 leading-relaxed">
                                  {row.original.description}
                                </div>
                              </div>
                              <div className="space-y-3 bg-green-50 p-4 rounded-lg">
                                <h4 className="font-semibold text-gray-900 text-lg">
                                  How to Fix
                                </h4>
                                <div className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                  {row.original.fix}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-2 py-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length
              )}{' '}
              of {table.getFilteredRowModel().rows.length} results
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="px-3 py-1"
            >
              Previous
            </Button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: table.getPageCount() }, (_, i) => i).map((pageIndex) => (
                <Button
                  key={pageIndex}
                  variant={table.getState().pagination.pageIndex === pageIndex ? "default" : "outline"}
                  size="sm"
                  onClick={() => table.setPageIndex(pageIndex)}
                  className="px-3 py-1 min-w-[40px]"
                >
                  {pageIndex + 1}
                </Button>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="px-3 py-1"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}