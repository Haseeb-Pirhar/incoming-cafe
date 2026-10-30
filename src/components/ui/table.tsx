"use client";
import React from "react";
import { Table } from "@radix-ui/themes";
import Loader from "@/components/ui/loader";

interface ReusableTableProps {
  headers: string[];
  loading?: boolean;
  rows: React.ReactNode[];
  emptyMessage?: string;
  loadingLabel?: string;
}

const ReusableTable: React.FC<ReusableTableProps> = ({
  headers,
  loading = false,
  loadingLabel = "Loading",
  rows,
  emptyMessage = "No data found.",
}) => {
  return (
    <Table.Root variant="surface" className="text-nowrap">
      <Table.Header>
        <Table.Row>
          {headers.map((header) => (
            <Table.ColumnHeaderCell key={header}>
              {header}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {loading ? (
          <Table.Row className="hover:!bg-gray-100 !align-middle !h-[200px]">
            <Table.Cell colSpan={headers.length} className="text-center">
              <Loader label={loadingLabel} />
            </Table.Cell>
          </Table.Row>
        ) : rows.length === 0 ? (
          <Table.Row className="hover:!bg-gray-100 !align-middle !h-[200px]">
            <Table.Cell colSpan={headers.length} className="text-center">
              {emptyMessage}
            </Table.Cell>
          </Table.Row>
        ) : (
          rows
        )}
      </Table.Body>
    </Table.Root>
  );
};

export default ReusableTable;
