"use client";
import React, { Suspense } from "react";
import { usePaginationQuery } from "@/src/hooks/usePaginationQuery";
import { Pagination } from "antd";
import WhiteBlockTitleArea from "../_components/whiteBlockTitle";
import SearchingArea from "../_components/whiteBlockSearch";
import TableTypesArea from "../_components/table";
import {
  createCreatedAtColumn,
  createGalleryColumn,
  createImageColumn,
  createImageTitleColumn,
  createStatusColumn,
  createUpdatedAtColumn,
} from "@/src/utils/tableColumns";
import { Spin } from "antd";
import { useServerQuery } from "@/src/hooks/useServerActions";
import {
  Column,
  CustomLocales,
  Projects,
  SolutionsItem,
} from "@/src/services/interface";
import { solutions_list } from "@/src/services/interface/constant";
import { getSolutions } from "@/src/actions/client/solutions.actions";

export default function AdminPage() {
  const { queryParams, handleChange, locale } = usePaginationQuery();
  const { data, isLoading, isError, refetch } = useServerQuery(
    solutions_list,
    getSolutions,
    {
      params: {
        page: queryParams.page,
        pageSize: queryParams.pageSize,
        query: queryParams.title,
        locale: locale as CustomLocales,
      },
    }
  );

  const totalCount = Number(data?.paginations?.dataCount) || 0;
  const page = Number(data?.paginations?.page) || 1;
  const pageSize = Number(data?.paginations?.pageSize) || 12;
  const totalPages = Number(data?.paginations?.totalPages) || 1;

  const columns: Column<SolutionsItem>[] = [
    createImageTitleColumn<SolutionsItem>(),
    createStatusColumn<any>(),
    createCreatedAtColumn<SolutionsItem>(),
    createUpdatedAtColumn<SolutionsItem>(),
    createImageColumn<SolutionsItem>({
      page: "solutions",
    }) as Column<Projects>,
    createGalleryColumn<SolutionsItem>({
      page: "solutions",
    }) as Column<SolutionsItem>,
  ];

  return (
    <div>
      <WhiteBlockTitleArea
        title="Həllərimiz"
        link="/manage/solutions/create?locale=az"
      />
      <SearchingArea link="manage/solutions" />
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "50px",
            }}
          >
            <Spin size="large" />
          </div>
        }
      >
        <TableTypesArea<SolutionsItem>
          columns={columns}
          page="solutions"
          model={solutions_list}
          dataItems={(data?.data as unknown as SolutionsItem[]) || []}
          isError={isError}
          refetch={refetch}
          locale={locale}
          invalidateQueryKey={solutions_list}
          isLoading={isLoading}
        />
      </Suspense>

      {totalPages > 1 && (
        <div style={{ marginTop: "40px" }}>
          <Pagination
            current={page}
            total={totalCount}
            pageSize={pageSize}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
}
