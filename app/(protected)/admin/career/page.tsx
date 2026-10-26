import CareerTable from "./career-table";
import { getApplications } from "@/lib/actions/application-action";

const CareerPage = async () => {
  const applications = await getApplications();

  return (
    <div className="mt-2">
      <CareerTable data={applications} title="Career Applications" />
    </div>
  );
};

export default CareerPage;