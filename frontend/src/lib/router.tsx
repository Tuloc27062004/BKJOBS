"use client";

import Link, { type LinkProps } from "next/link";
import {
  useParams as useNextParams,
  usePathname,
  useRouter,
} from "next/navigation";
import type { ComponentPropsWithoutRef } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

type NavigateOptions = {
  replace?: boolean;
  state?: unknown;
};

type SetSearchParamsOptions = {
  replace?: boolean;
};

type SearchParamsInit =
  | string
  | URLSearchParams
  | Record<string, string | number | boolean | null | undefined>;

const ROUTE_ALIASES: Record<string, string> = {
  "/auth/login": "/login",
  "/auth/register": "/register",
};

function normalizeHref(href: string) {
  return ROUTE_ALIASES[href] || href;
}

function toURLSearchParams(init: SearchParamsInit) {
  if (typeof init === "string") {
    return new URLSearchParams(init);
  }

  if (init instanceof URLSearchParams) {
    return new URLSearchParams(init.toString());
  }

  const params = new URLSearchParams();
  Object.entries(init).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.set(key, String(value));
    }
  });
  return params;
}

export function useNavigate() {
  const router = useRouter();

  return useCallback(
    (to: string | number, options?: NavigateOptions) => {
      if (typeof window === "undefined") {
        return;
      }

      if (typeof to === "number") {
        if (to === -1) {
          router.back();
          return;
        }

        if (to === 1) {
          router.forward();
          return;
        }

        window.history.go(to);
        return;
      }

      const href = normalizeHref(to);
      if (options?.replace) {
        router.replace(href);
        return;
      }

      router.push(href);
    },
    [router],
  );
}

export function useLocation() {
  const pathname = usePathname();

  return useMemo(
    () => ({
      pathname,
      search: "",
      hash: "",
      state: null,
      key: pathname,
    }),
    [pathname],
  );
}

export function useParams<T extends Record<string, string | string[]>>() {
  return useNextParams<T>();
}

export function useSearchParams(): [
  URLSearchParams,
  (nextInit: SearchParamsInit, options?: SetSearchParamsOptions) => void,
] {
  const pathname = usePathname();
  const router = useRouter();
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const syncFromLocation = () => {
      setSearch(window.location.search);
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);

    return () => {
      window.removeEventListener("popstate", syncFromLocation);
    };
  }, []);

  const currentParams = useMemo(() => {
    const normalized = search.startsWith("?") ? search.slice(1) : search;
    return new URLSearchParams(normalized);
  }, [search]);

  const setSearchParams = useCallback(
    (nextInit: SearchParamsInit, options?: SetSearchParamsOptions) => {
      const nextParams = toURLSearchParams(nextInit);
      const query = nextParams.toString();
      const href = query ? `${pathname}?${query}` : pathname;
      setSearch(query ? `?${query}` : "");

      if (options?.replace) {
        router.replace(href);
        return;
      }

      router.push(href);
    },
    [pathname, router],
  );

  return [currentParams, setSearchParams];
}

type RouterLinkProps = Omit<ComponentPropsWithoutRef<"a">, "href"> &
  Omit<LinkProps, "href"> & {
    to: string;
  };

export function RouterLink({ to, ...props }: RouterLinkProps) {
  return <Link href={normalizeHref(to)} {...props} />;
}

export function Navigate({
  to,
  replace,
}: {
  to: string;
  replace?: boolean;
}) {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, replace, to]);

  return null;
}

export { RouterLink as Link };
