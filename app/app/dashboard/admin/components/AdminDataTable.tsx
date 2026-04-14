"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Pagination } from "@heroui/pagination";
import { Spinner } from "@heroui/spinner";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/table";
import { ReactNode } from "react";

interface AdminColumn {
  key: string;
  label: string;
}

interface AdminDataTableProps<T extends { uuid: string }> {
  title: string;
  columns: AdminColumn[];
  rows: T[];
  isLoading?: boolean;
  page: number;
  total: number;
  limit: number;
  controls?: ReactNode;
  emptyContent?: string;
  onPageChange: (page: number) => void;
  renderCell: (row: T, columnKey: string) => ReactNode;
}

export function AdminDataTable<T extends { uuid: string }>({
  title,
  columns,
  rows,
  isLoading = false,
  page,
  total,
  limit,
  controls,
  emptyContent = "No data available.",
  onPageChange,
  renderCell,
}: AdminDataTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <Card className="border border-default-200">
      <CardHeader className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {controls}
      </CardHeader>
      <CardBody className="gap-4">
        <Table aria-label={title} removeWrapper>
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody
            items={rows}
            emptyContent={isLoading ? "Loading..." : emptyContent}
            loadingContent={<Spinner label="Loading..." />}
            loadingState={isLoading ? "loading" : "idle"}
          >
            {(item) => (
              <TableRow key={item.uuid}>
                {(columnKey) => <TableCell>{renderCell(item, String(columnKey))}</TableCell>}
              </TableRow>
            )}
          </TableBody>
        </Table>

        <div className="flex justify-end">
          <Pagination
            total={totalPages}
            page={Math.min(page, totalPages)}
            onChange={onPageChange}
            showControls
            isCompact
          />
        </div>
      </CardBody>
    </Card>
  );
}
