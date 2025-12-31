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
  ServicesSubCategoryItem,
} from "@/src/services/interface";
import { service_sub_category_list } from "@/src/services/interface/constant";
import { getServicesSubCategory } from "@/src/actions/client/services-sub.actions";

export default function AdminPage() {
  const { queryParams, handleChange, locale } = usePaginationQuery();
  const { data, isLoading, isError, refetch } = useServerQuery(
    service_sub_category_list,
    getServicesSubCategory,
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

  const columns: Column<ServicesSubCategoryItem>[] = [
    createImageTitleColumn<ServicesSubCategoryItem>(),
    createStatusColumn<any>(),
    createCreatedAtColumn<ServicesSubCategoryItem>(),
    createUpdatedAtColumn<ServicesSubCategoryItem>(),
    createImageColumn<ServicesSubCategoryItem>({
      page: "services-sub-category",
    }) as Column<ServicesSubCategoryItem>,
    createGalleryColumn<ServicesSubCategoryItem>({
      page: "services-sub-category",
    }) as Column<ServicesSubCategoryItem>,
  ];

  return (
    <div>
      <WhiteBlockTitleArea
        title="Xidmətlər alt Kateqoriyaları"
        link="/manage/services-sub-category/create?locale=az"
      />
      <SearchingArea link="manage/services-sub-category" />
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
        <TableTypesArea<ServicesSubCategoryItem>
          columns={columns}
          page="services-sub-category"
          model={service_sub_category_list}
          dataItems={(data?.data as unknown as ServicesSubCategoryItem[]) || []}
          isError={isError}
          refetch={refetch}
          locale={locale}
          invalidateQueryKey={service_sub_category_list}
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
