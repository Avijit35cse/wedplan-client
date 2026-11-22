
import { requireRole } from "@/lib/require-role";
import AddServiceForm from "./add-service-form";

export const instant = false;

export default async function AddServicePage() {
  await requireRole(["vendor"]);

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold">Add Wedding Service</h1>
      <p className="mt-2 mb-6 text-gray-600">
        Submit your wedding service for admin approval.
      </p>

      <AddServiceForm />
    </main>
  );
}
