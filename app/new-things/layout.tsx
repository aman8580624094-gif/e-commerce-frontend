
import ProtectedRoute from "../component/protectionroute";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
        
      {children}
    </ProtectedRoute>
  );
}
