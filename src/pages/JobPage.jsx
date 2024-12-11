import PropTypes from "prop-types";
import { FaArrowLeft, FaMapMarker } from "react-icons/fa";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const JobPage = ({ deleteJob }) => {
  const job = useLoaderData();
  // const [job, setJob] = useState(null);
  // const apiURL = `/api/jobs/${id}`;

  // useEffect(() => {
  //   const fetchJob = async () => {

  //     try {
  //       const res = await fetch(apiURL);
  //       console.log(res);
  //       const data = await res.json();
  //       setJob(data);
  //     } catch (error) {
  //       console.log("Error fetching data: " + error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchJob();
  // }, []);

  const navigate = useNavigate();
  const onDeleteClick = (jobId) => {
    const confirm = window.confirm("Are you sure you want to delete this?");

    if (!confirm) return;

    deleteJob(jobId);

    toast.success("Job deleted successfully!");
    return navigate("/jobs");
  };

  return (
    <>
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            to="/jobs"
            className="text-indigo-500 hover:text-indigo-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Job Listings
          </Link>
        </div>
      </section>
      <section className="bg-indigo-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-[7fr_3fr] w-full gap-6">
            <main>
              <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
                <div className="text-gray-500 mb-4">{job.type}</div>
                <h1 className="text-3xl font-bold mb-4">{job.title}</h1>
                <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
                  <FaMapMarker className="text-lg text-orange-700 mr-2" />

                  <p className="text-orange-700">{job.location}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-indigo-800 text-lg font-bold mb-6">
                  Job Description
                </h3>

                <p className="mb-4">{job.description}</p>

                <h3 className="text-indigo-800 text-lg font-bold mb-2">
                  Salary
                </h3>

                <p className="mb-4">{job.salary} / Year</p>
              </div>
            </main>

            {/* <!-- Sidebar --> */}
            <aside>
              {/* <!-- Company Info --> */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6">Company Info</h3>

                <h2 className="text-2xl">{job.company.name}</h2>

                <p className="my-2">{job.company.description}</p>

                <hr className="my-4" />

                <h3 className="text-xl">Contact Email:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactEmail}
                </p>

                <h3 className="text-xl">Contact Phone:</h3>

                <p className="my-2 bg-indigo-100 p-2 font-bold">
                  {job.company.contactPhone}
                </p>
              </div>

              {/* <!-- Manage --> */}
              <div className="bg-white p-6 rounded-lg shadow-md mt-6">
                <h3 className="text-xl font-bold mb-6">Manage Job</h3>
                <Link
                  to={`/edit-job/${job.id}`}
                  className="bg-indigo-500 hover:bg-indigo-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Edit Job
                </Link>
                <button
                  onClick={() => onDeleteClick(job.id)}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >
                  Delete Job
                </button>
              </div>
            </aside>
          </div>
        </div>
      </section>{" "}
    </>
  );
};

const jobLoader = async ({ params }) => {
  const res = await fetch(`${API_BASE_URL}/jobs/${params.id}`);
  const data = res.json();
  return data;
};

JobPage.propTypes = {
  deleteJob: PropTypes.func.isRequired,
};

export { JobPage as default, jobLoader };
