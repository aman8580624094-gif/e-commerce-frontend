
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let active = true;

    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/check-auth`,
          {
            withCredentials: true,
          }
        );

        if (!active) return;

        if (response.data.isAuthenticated) {
          setIsAuthenticated(true);
          setLoading(false);
        } else {
          router.replace("/login");
        }

      } catch (error) {
        if (active) {
          router.replace("/login");
        }
      }
    };

    checkAuth();

    return () => {
      active = false;
    };
  }, [router]);

  if (loading || !isAuthenticated) {
    return <p>Checking authentication...</p>;
  }

  return <>{children}</>;
}
