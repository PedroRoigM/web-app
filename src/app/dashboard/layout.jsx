import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
export default function ClientLayout({ children }) {

    return (
        <div className="flex h-screen">
            {/* Sidebar */}
            <div className="h-[100vh] bg-white">
                <Sidebar />
            </div>

            <div className="flex-1 flex flex-col">
                {/* Topbar */}
                <div className=" text-white">
                    <Topbar />
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-gray-100 overflow-auto">
                    {children}
                </div>
            </div>
        </div>

    );
}
