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
  controlsPlacement?: "inline" | "below";
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
  controlsPlacement = "inline",
  emptyContent = "No data available.",
  onPageChange,
  renderCell,
}: AdminDataTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <Card className="border border-default-200">
      <CardHeader className="flex flex-col items-stretch gap-4 lg:flex-row lg:items-start lg:justify-between">
        <h3 className="shrink-0 text-lg font-semibold">{title}</h3>
        {controls && controlsPlacement === "inline" ? (
          <div className="min-w-0 w-full lg:flex lg:max-w-[min(100%,48rem)] lg:justify-end xl:max-w-none">{controls}</div>
        ) : null}
        {controls && controlsPlacement === "below" ? (
          <div className="w-full">{controls}</div>
        ) : null}
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
