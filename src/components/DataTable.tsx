
import type React from "react";
import { useEffect, useState } from "react";

// Column definition 
export interface Column<T> {
    key: keyof T;
    header: string;
    // T[keyof T] ensures the value matches a property of the object
    render?: (value: T[keyof T], row: T) => React.ReactNode;
    width?: number;
    sortable?:boolean
}

interface DataTableProps<T extends object> {
    data: T[];
    columns: Column<T>[];
    rowKey: keyof T;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
    filterKey?:keyof T;
    pageSize?:number;
}

function DataTable<T extends object>({
    data,
    columns,
    rowKey,
    onRowClick,
    emptyMessage = 'No data found.',
    filterKey,
    pageSize,
}: DataTableProps<T>) {
    const [sortConfig,setSortConfig]=useState<{key:keyof T,direction:'asc'|'desc'}|null>(null);
    const [filterText,setFilterText]=useState<string>('');
    const [page,setPage]=useState<number>(1);
    useEffect(()=>{
        setPage(1);
    },[filterText])
    const handleSort=(key:keyof T)=>{
        let direction:'asc'|'desc'='asc';
        if(sortConfig?.key===key && sortConfig.direction==='asc'){
            direction='desc'
        }
        setSortConfig({key,direction})
    }
    const filteredData=filterKey && filterText
    ? data.filter((row)=>
    String(row[filterKey])
    .toLowerCase()
    .includes(filterText.toLowerCase())
    ) : data;
    const sortedData=[...filteredData].sort((a,b)=>{
        if(!sortConfig) return 0;
        const aValue=a[sortConfig.key];
        const bValue=b[sortConfig.key];
        if(typeof aValue==='string' && typeof bValue==='string'){
            return sortConfig.direction==='asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        if(aValue===bValue) return 0;
        if(sortConfig.direction==='asc'){
            return aValue>bValue? 1 : -1;
        }else{
            return aValue<bValue ? 1 :-1;
        }
    })
    if (sortedData.length === 0) return <p style={{ textAlign: 'center', padding: 20 }}>{emptyMessage}</p>;
    const totalPages=pageSize ? Math.ceil(sortedData.length/pageSize) : 1;
    const safePage=pageSize ? Math.min(page,totalPages) : 1; //clamping if rows are reduced
    const paginatedData=pageSize ? sortedData.slice(
        (safePage-1)*pageSize, 
        safePage*pageSize
    ) : sortedData;
    return ( 
        <div>
            {filterKey && (
                <div style={{marginBottom:12}}>
                    <input 
                    type="text"
                    placeholder={`Filter by ${String(filterKey)}...`}
                    value={filterText}
                    onChange={(e : React.ChangeEvent<HTMLInputElement>)=>
                        setFilterText(e.target.value)
                    }
                    style={{
                        padding:"6px 10px",
                        borderRadius:4,
                        border:"1px solid  #D1D5DB",
                        width:220
                    }}
                    />
                </div>
            )}
        <table
        style={{
            width: '100%',
            borderCollapse: 'separate',
            borderSpacing: '0 8px', // 🔥 row spacing
            marginTop: '16px',
        }}
        >
            <thead>
                <tr
                style={{
                background: '#fff',
                boxShadow: '0 2px 6px rgba(0,0,0,0.04)',
            }}
                >
                    {columns.map(col => (
                        <th 
                            key={String(col.key)} 
                            onClick={()=>col.sortable && handleSort(col.key)}
                            style={{ padding: 12, textAlign: 'left', width: col.width, cursor:col.sortable? 'pointer' : 'default', userSelect:'none' }}
                        >
                            {col.header}
                            {col.sortable && sortConfig?.key===col.key && (
                                <span>{sortConfig.direction==='asc' ? '↑' : '↓'}</span>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {paginatedData.map((row,ri) => (
                    <tr 
                        key={String(row[rowKey])}
                        onClick={() => onRowClick?.(row)}
                        style={{ 
                            background:ri%2===0 ? '#fff':'#F8FAFC',
                            cursor:onRowClick?'pointer':'default',
                        }}
                    >
                        {columns.map((col) => (
                            <td key={String(col.key)} style={{ padding: 12 }}>
                                {col.render 
                                    ? col.render(row[col.key], row) 
                                    : String(row[col.key])
                                }
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        {pageSize && totalPages > 1 && (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginTop: 12
        }}>
        <button
            disabled={safePage <= 1}
            onClick={() => setPage(p => Math.max(1, p - 1))}
        >
        ← Previous
        </button>

        <span>
         Page {safePage} of {totalPages}
        </span>

        <button
        disabled={safePage >= totalPages}
        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
        >
        Next →
        </button>
        </div>
    )}
        </div>
    );
}

export default DataTable;
