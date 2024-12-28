"use client";

import { getNewAccessToken } from "@/api/auth";
import useAuthStore from "@/store/authStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PUBLIC_PATHS = ["/", "/signup", "/login"];

export default function AuthInitializer() {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, setAccessToken } = useAuthStore();

  useEffect(() => {
    const initializeAuth = async () => {
      if (!PUBLIC_PATHS.includes(pathname) && !accessToken) {
        const newAccessToken = await getNewAccessToken();

        if (newAccessToken) {
          setAccessToken(newAccessToken);
          console.log("accessToken refreshed");
        } else {
          router.push("/");
        }
      }
    };

    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
