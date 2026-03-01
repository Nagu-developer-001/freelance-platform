import Sidebar from "./sideBar";

export default function FreelancerDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex bg-slate-900 min-h-screen text-white">

      <Sidebar role="freelancer" />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-6">
          Welcome {user?.name}
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl">Applied Jobs</h2>
            <p className="text-3xl mt-2">4</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl">Active Projects</h2>
            <p className="text-3xl mt-2">1</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl">Completed</h2>
            <p className="text-3xl mt-2">6</p>
          </div>

        </div>

        {/* Job List */}
        <div className="mt-10 bg-slate-800 p-6 rounded-lg">
          <h2 className="text-xl mb-4">Available Jobs</h2>

          <div className="border-b border-gray-600 pb-3">
            Website Development — ₹8000
            <button className="ml-5 bg-green-600 px-4 py-1 rounded">
              Bid
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}