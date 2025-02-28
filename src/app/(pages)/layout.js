import Image from "next/image";
import { IoIosArrowBack } from "react-icons/io";
import Link from "next/link";

export default function HomeLayout({ children }) {
    return (
        <>
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
                <p className="text-2xl font-bold ml-5">(Name)</p>
            </div>
            <main>{children}</main>
        </>
    );
}
