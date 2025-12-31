"use client";
import { Suspense } from "react";
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
  ServicesCategoryItem,
} from "@/src/services/interface";
import { service_category_list } from "@/src/services/interface/constant";
import { getServicesCategory } from "@/src/actions/client/services.actions";

export default function AdminPage() {
  const { queryParams, handleChange, locale } = usePaginationQuery();
  const { data, isLoading, isError, refetch } = useServerQuery(
    service_category_list,
    getServicesCategory,
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

  const columns: Column<ServicesCategoryItem>[] = [
    createImageTitleColumn<ServicesCategoryItem>(),
    createStatusColumn<any>(),
    createCreatedAtColumn<ServicesCategoryItem>(),
    createUpdatedAtColumn<ServicesCategoryItem>(),
    createImageColumn<ServicesCategoryItem>({
      page: "services-category",
    }) as Column<ServicesCategoryItem>,
    createGalleryColumn<ServicesCategoryItem>({
      page: "services-category",
    }) as Column<ServicesCategoryItem>,
  ];

  return (
    <div>
      <WhiteBlockTitleArea
        title="Xidmətlər Kateqoriyaları"
        link="/manage/services-category/create?locale=az"
      />
      <SearchingArea link="manage/services-category" />
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
        <TableTypesArea<ServicesCategoryItem>
          columns={columns}
          page="services-category"
          model={service_category_list}
          dataItems={(data?.data as unknown as ServicesCategoryItem[]) || []}
          isError={isError}
          refetch={refetch}
          locale={locale}
          invalidateQueryKey={service_category_list}
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
