// src/hooks/useServerActions.ts
"use client";
import {
  useQuery,
  useMutation,
  useQueryClient,
  useQueries,
  type UseQueryOptions,
  type UseMutationOptions,
  type QueryKey,
} from "@tanstack/react-query";

// ============ TYPE DEFINITIONS ============

type QueryParams = Record<string, string | number | boolean | undefined | null>;

type ServerActionConfig<TData, TInput> = Omit<
  UseMutationOptions<TData, Error, TInput>,
  "mutationFn"
> & {
  invalidateKeys?: string[];
  refetchActive?: boolean;
};

type ServerQueryConfig<TData> = Omit<
  UseQueryOptions<TData, Error>,
  "queryKey" | "queryFn"
> & {
  params?: QueryParams;
};

type MultiServerQueryConfig<TData, TParams> = Omit<
  UseQueryOptions<TData, Error>,
  "queryKey" | "queryFn"
> & {
  params: TParams;
};

type ServerQueryItem<TData = unknown, TParams = QueryParams> = {
  queryName: string;
  actionFn: (params: TParams) => Promise<TData>;
  config: MultiServerQueryConfig<TData, TParams>;
};

// ============ QUERY KEY BUILDER ============

export const createServerQueryKey = (
  actionName: string,
  params?: QueryParams,
  id?: string | number
): QueryKey => {
  const keys: any[] = [actionName];

  if (id) {
    keys.push("detail", id);
  } else {
    keys.push("list");
    if (params && Object.keys(params).length > 0) {
      keys.push(params);
    }
  }

  return keys;
};

// ============ INVALIDATION HELPER ============

const invalidateServerQueries = async (
  queryClient: ReturnType<typeof useQueryClient>,
  keys: string[],
  refetchActive: boolean = true
) => {
  await Promise.all(
    keys.map((key) =>
      queryClient.invalidateQueries({
        queryKey: [key],
        exact: false,
        refetchType: "all",
      })
    )
  );

  if (refetchActive) {
    await Promise.all(
      keys.map((key) =>
        queryClient.refetchQueries({
          queryKey: [key],
          exact: false,
          type: "active",
        })
      )
    );
  }
};

// ============ HOOKS ============

/**
 * Server Action üçün mutation hook (CREATE, UPDATE, DELETE)
 */
export const useServerAction = <TData = unknown, TInput = unknown>(
  actionFn: (input: TInput) => Promise<TData>,
  config?: ServerActionConfig<TData, TInput>
) => {
  const queryClient = useQueryClient();
  const {
    invalidateKeys = [],
    refetchActive = true,
    ...options
  } = config || {};

  return useMutation<TData, Error, TInput>({
    mutationFn: async (input) => {
      const result = await actionFn(input);
      return result;
    },
    onSuccess: async (data, variables, context, mutationContext) => {
      // ✅ 4 parametr
      if (invalidateKeys.length > 0) {
        await invalidateServerQueries(
          queryClient,
          invalidateKeys,
          refetchActive
        );
      }

      if (options.onSuccess) {
        await options.onSuccess(data, variables, context, mutationContext); // ✅ 4 parametr
      }
    },
    ...options,
  });
};

/**
 * Server Action üçün GET query hook (LIST)
 */
export const useServerQuery = <TData = unknown, TParams = QueryParams>(
  queryName: string,
  actionFn: (params: TParams) => Promise<TData>,
  config?: ServerQueryConfig<TData> & { params: TParams }
) => {
  const { params, ...options } = config || {};
  const queryKey = createServerQueryKey(queryName, params as QueryParams);

  return useQuery<TData, Error>({
    queryKey,
    queryFn: async () => {
      const result = await actionFn(params as TParams);
      return result;
    },
    ...options,
  });
};

/**
 * Multiple Server Actions üçün parallel query hook
 */
export const useMultiServerQuery = <
  TQueries extends ServerQueryItem<any, any>[]
>(
  queries: TQueries
) => {
  return useQueries({
    queries: queries.map((query) => {
      const { queryName, actionFn, config } = query;
      const { params, ...options } = config;
      const queryKey = createServerQueryKey(queryName, params as QueryParams);

      return {
        queryKey,
        queryFn: async () => {
          try {
            const result = await actionFn(params);
            return result;
          } catch (error) {
            console.error(`❌ [${queryName.toUpperCase()}] Error:`, error);
            throw error;
          }
        },
        retry: 1,
        retryDelay: 1000,
        ...options,
      };
    }),
  });
};

/**
 * Server Action üçün GET BY ID query hook (DETAIL)
 */
export const useServerQueryById = <TData = unknown, TParams = any>(
  queryName: string,
  actionFn: (
    params: TParams
  ) => Promise<{ data?: TData; message?: string; code?: string }>,
  id: string | number | undefined | null,
  additionalParams?: Omit<TParams, "id">,
  config?: Omit<UseQueryOptions<TData, Error>, "queryKey" | "queryFn">
) => {
  const params = { id, ...additionalParams } as TParams;
  const queryKey = createServerQueryKey(
    queryName,
    additionalParams as QueryParams,
    id as string | number
  );

  return useQuery<TData, Error>({
    queryKey,
    queryFn: async () => {
      const response = await actionFn(params);

      if (!response.data) {
        throw new Error(response.message || "Data not found");
      }

      return response.data;
    },
    enabled: !!id && config?.enabled !== false,
    ...config,
  });
};

/**
 * Manual invalidation helper
 */
export const useInvalidateServerQueries = () => {
  const queryClient = useQueryClient();

  return {
    invalidate: async (keys: string | string[], refetch: boolean = true) => {
      const keyArray = Array.isArray(keys) ? keys : [keys];

      await Promise.all(
        keyArray.map((key) =>
          queryClient.invalidateQueries({
            queryKey: [key],
            exact: false,
          })
        )
      );

      if (refetch) {
        await Promise.all(
          keyArray.map((key) =>
            queryClient.refetchQueries({
              queryKey: [key],
              exact: false,
              type: "active",
            })
          )
        );
      }
    },
    invalidateAll: async () => {
      await queryClient.invalidateQueries();
    },
  };
};
