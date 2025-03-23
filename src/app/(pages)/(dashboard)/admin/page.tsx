import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Admin from ".";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    // Handle the case where session is null, e.g., redirect or show an error message
    return <div>Session not found</div>;
  }
  return <Admin session={session} />;
};

export default AdminPage;
