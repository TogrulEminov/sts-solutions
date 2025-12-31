"use client";
import { Suspense } from "react";
import { usePaginationQuery } from "@/src/hooks/usePaginationQuery";
import { Pagination } from "antd";
import WhiteBlockTitleArea from "../_components/whiteBlockTitle";
import SearchingArea from "../_components/whiteBlockSearch";
import TableTypesArea from "../_components/table";
import {  Column, CustomLocales, StrategicItem } from "@/src/services/interface";
import {
  createCreatedAtColumn,
  createImageColumn,
  createImageTitleColumn,
  createSlugColumn,
  createStatusColumn,
  createUpdatedAtColumn,
} from "@/src/utils/tableColumns";
import { useSession } from "next-auth/react";
import { Spin } from "antd"; 
import { useServerQuery } from "@/src/hooks/useServerActions";
import {  goals_content_list } from "@/src/services/interface/constant";
import { getStrategicGoals } from "@/src/actions/client/strategic-goals.actions";

export default function AdminCategoriesPage() {
  const { queryParams, handleChange, locale } = usePaginationQuery();
  const { data, isLoading, isError, refetch } = useServerQuery(
    goals_content_list,
    getStrategicGoals,
    {
      params: {
        page: queryParams.page,
        pageSize: queryParams.pageSize,
        query: queryParams.title,
        locale: locale as CustomLocales,
      },
    }
  );
  const { data: session } = useSession();
  const isSuperAdmin = session?.user.role === "SUPER_ADMIN";

  const totalCount = Number(data?.paginations?.dataCount) || 0;
  const page = Number(data?.paginations?.page) || 1;
  const pageSize = Number(data?.paginations?.pageSize) || 12;
  const totalPages = Number(data?.paginations?.totalPages) || 1;

  const columns: Column<StrategicItem>[] = [
    createImageTitleColumn<StrategicItem>(),
    createStatusColumn<any>(),
    createSlugColumn<StrategicItem>(),
    createCreatedAtColumn<StrategicItem>(),
    createUpdatedAtColumn<StrategicItem>(),
    createImageColumn<StrategicItem>({
      page: "strategic-goals",
    }) as Column<StrategicItem>,
  ];

  return (
    <div>
      <WhiteBlockTitleArea
        title="Strateji hədəflər"
        disabled={Boolean(!isSuperAdmin)}
        link="/manage/strategic-goals/create?locale=az"
      />
      <SearchingArea link="manage/strategic-goals" />
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
        <TableTypesArea<StrategicItem>
          columns={columns}
          page="strategic-goals"
          model={goals_content_list}
          dataItems={(data?.data as unknown as StrategicItem[]) || []}
          isError={isError}
          refetch={refetch}
          locale={locale}
          invalidateQueryKey={goals_content_list}
          isLoading={isLoading}
          isAdmin={isSuperAdmin}
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
