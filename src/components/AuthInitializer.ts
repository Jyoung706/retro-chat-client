"use client";

import { getNewAccessToken } from "@/api/auth";
import useAuthStore from "@/store/authStore";
import useSocketStore from "@/store/socketStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const PUBLIC_PATHS = ["/", "/signup", "/login"];

export default function AuthInitializer() {
  const router = useRouter();
  const pathname = usePathname();
  const { accessToken, setAccessToken } = useAuthStore();
  const { connect, disconnect, getSocket } = useSocketStore();

  useEffect(() => {
    const initializeAuth = async () => {
      const socket = getSocket();

      if (!PUBLIC_PATHS.includes(pathname)) {
        if (!accessToken) {
          const newAccessToken = await getNewAccessToken();
          if (newAccessToken) {
            setAccessToken(newAccessToken);
            if (!socket) {
              connect(newAccessToken);
            }
          } else {
            router.push("/");
          }
        } else if (!socket) {
          connect(accessToken);
        }
      }
    };

    initializeAuth();

    return () => {
      if (PUBLIC_PATHS.includes(pathname)) {
        disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, pathname]);

  return null;
}
