import Sidebar from "./sideBar";

export default function ClientDashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="flex bg-slate-900 min-h-screen text-white">

      <Sidebar role="client" />

      <div className="flex-1 p-10">

        <h1 className="text-3xl font-bold mb-6">
          Welcome {user?.name}
        </h1>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl">Jobs Posted</h2>
            <p className="text-3xl mt-2">5</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl">Active Jobs</h2>
            <p className="text-3xl mt-2">2</p>
          </div>

          <div className="bg-slate-800 p-6 rounded-lg">
            <h2 className="text-xl">Completed</h2>
            <p className="text-3xl mt-2">3</p>
          </div>

        </div>

        {/* Post Job Button */}
        <button className="mt-10 bg-blue-600 px-6 py-3 rounded-lg">
          + Post New Job
        </button>

      </div>
    </div>
  );
}