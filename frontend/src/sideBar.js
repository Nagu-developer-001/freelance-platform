export default function sideBar({ role }) {
  return (
    <div className="w-64 h-screen bg-[#020617] text-white p-6">

      <h1 className="text-2xl font-bold mb-10">
        FreelanceHub
      </h1>

      <ul className="space-y-4">

        <li className="hover:text-blue-400 cursor-pointer">
          Dashboard
        </li>

        {role === "client" && (
          <>
            <li className="hover:text-blue-400 cursor-pointer">
              Post Job
            </li>
            <li className="hover:text-blue-400 cursor-pointer">
              My Jobs
            </li>
          </>
        )}

        {role === "freelancer" && (
          <>
            <li className="hover:text-blue-400 cursor-pointer">
              Available Jobs
            </li>
            <li className="hover:text-blue-400 cursor-pointer">
              My Bids
            </li>
          </>
        )}

        <li
          className="text-red-400 cursor-pointer mt-10"
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
        >
          Logout
        </li>

      </ul>
    </div>
  );
}