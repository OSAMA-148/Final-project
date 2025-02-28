import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

const report = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
            {/* أيقونة الرجوع */}
            <Link href="/home" className="absolute left-5 top-5 text-2xl">
                <IoIosArrowBack />
            </Link>
            {/* صورة المستخدم ونص الترحيب */}
            <div className="flex justify-center items-center absolute left-3.5 top-1/5 pb-6 lg:top-28">
                <Image
                    src="/profile.png"
                    alt="Profile Picture"
                    width={50}
                    height={50}
                    className="rounded-full"
                />
                <p className="text-2xl font-bold ml-5">
                    (Name)
                </p>
            </div>
            <div className="flex flex-col items-center space-y-5 w-full h-full max-lg:pb-14">
                {/* صندوق الإدخال */}
                <textarea
                    placeholder="Describe Your Problem"
                    className="w-full max-w-md h-34 border text-2xl border-gray-300 rounded-md p-3 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-400 resize-none mt-4 lg:max-w-[45%]"
                ></textarea>

                {/* زر الإرسال */}
                <button className="mt-4 bg-blue-500 text-white font-semibold py-3 px-16 rounded-full text-lg shadow-md hover:bg-blue-600 transition">
                    Send
                </button>
            </div>
        </div>
    );
};

export default report;
