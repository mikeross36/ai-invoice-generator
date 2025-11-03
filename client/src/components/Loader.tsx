import { LoaderIcon } from "lucide-react";

export default function Loader() {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <LoaderIcon className="animate-spin size-48 text-emerald-700" />
    </div>
  );
}
