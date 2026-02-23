import type React from "react";

// Column definition 
export interface Column<T> {
    key: keyof T;
    header: string;
    // T[keyof T] ensures the value matches a property of the object
    render?: (value: T[keyof T], row: T) => React.ReactNode;
    width?: number;
}

interface DataTableProps<T extends object> {
    data: T[];
    columns: Column<T>[];
    rowKey: keyof T;
    onRowClick?: (row: T) => void;
    emptyMessage?: string;
}

function DataTable<T extends object>({
    data,
    columns,
    rowKey,
    onRowClick,
    emptyMessage = 'No data found.',
}: DataTableProps<T>) {
    
    if (data.length === 0) return <p style={{ textAlign: 'center', padding: 20 }}>{emptyMessage}</p>;

    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '1rem' }}>
            <thead>
                <tr style={{ background: '#1E3A8A', color: '#fff' }}>
                    {columns.map(col => (
                        <th 
                            key={String(col.key)} 
                            style={{ padding: 12, textAlign: 'left', width: col.width }}
                        >
                            {col.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row,ri) => (
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
    );
}

export default DataTable;
