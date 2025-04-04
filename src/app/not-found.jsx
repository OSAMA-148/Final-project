export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-gray-800 pb-24">
            <h1 className="text-2xl font-bold">🔒 404 - Page Not Found</h1>
            <p>You must log in first to access this page.</p>
            <a
                href="/login"
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-3xl hover:bg-blue-600 transition duration-200"
            >
                Go to Login Page
            </a>

        </div>
    );
}
