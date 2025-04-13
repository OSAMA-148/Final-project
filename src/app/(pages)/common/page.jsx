"use client";
import { useState, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { useLanguage } from "@/context/LanguageContext"; // ← استيراد اللغة

const diseases = {
    en: [
        {
            id: 1,
            name: "Leaf Blight",
            image: "/leaf-blight.jpg",
            description: "Fungal disease affecting leaves.",
        },
        {
            id: 2,
            name: "Powdery Mildew",
            image: "/powdery-mildew.webp",
            description: "White powder-like fungal infection.",
        },
        {
            id: 3,
            name: "Root Rot",
            image: "/Root-Rot.webp",
            description: "Caused by overwatering and poor drainage.",
        },
        {
            id: 4,
            name: "Downy Mildew",
            image: "/Downy-Mildew.jpg",
            description: "Mold growth on the underside of leaves.",
        },
        {
            id: 5,
            name: "Anthracnose",
            image: "/anthracnose.jpg",
            description: "Dark lesions on leaves, stems, and fruits.",
        },
        {
            id: 6,
            name: "Rust",
            image: "/Rust.webp",
            description: "Orange or reddish-brown spots on leaves.",
        },
        {
            id: 7,
            name: "Fusarium Wilt",
            image: "/Fusarium-Wilt.jpg",
            description: "Fungal infection causing wilting and yellowing.",
        },
        {
            id: 8,
            name: "Bacterial Leaf Spot",
            image: "/bacterial-leaf-spot.webp",
            description: "Dark water-soaked spots on leaves.",
        },
        {
            id: 9,
            name: "Botrytis Blight",
            image: "/Botrytis-Blight.jpg",
            description: "Gray mold affecting flowers and fruits.",
        },
    ],
    ar: [
        {
            id: 1,
            name: "لفحة الأوراق",
            image: "/leaf-blight.jpg",
            description: "مرض فطري يصيب الأوراق.",
        },
        {
            id: 2,
            name: "البياض الدقيقي",
            image: "/powdery-mildew.webp",
            description: "عدوى فطرية تشبه المسحوق الأبيض.",
        },
        {
            id: 3,
            name: "تعفن الجذور",
            image: "/Root-Rot.webp",
            description: "ناتج عن الإفراط في الري وسوء التصريف.",
        },
        {
            id: 4,
            name: "البياض الزغبي",
            image: "/Downy-Mildew.jpg",
            description: "نمو العفن على الجانب السفلي من الأوراق.",
        },
        {
            id: 5,
            name: "الأنثراكنوز",
            image: "/anthracnose.jpg",
            description: "آفات داكنة على الأوراق والسيقان والثمار.",
        },
        {
            id: 6,
            name: "الصدأ",
            image: "/Rust.webp",
            description: "بقع برتقالية أو بنية محمرة على الأوراق.",
        },
        {
            id: 7,
            name: "ذبول الفيوزاريوم",
            image: "/Fusarium-Wilt.jpg",
            description: "عدوى فطرية تسبب الذبول واصفرار الأوراق.",
        },
        {
            id: 8,
            name: "تبقع الأوراق البكتيري",
            image: "/bacterial-leaf-spot.webp",
            description: "بقع داكنة مشبعة بالماء على الأوراق.",
        },
        {
            id: 9,
            name: "لفحة البوتريتيس",
            image: "/Botrytis-Blight.jpg",
            description: "عفن رمادي يصيب الأزهار والثمار.",
        },
    ],
};

export default function DiseasesPage() {
    const { language } = useLanguage(); // ← الحصول على اللغة الحالية
    const [search, setSearch] = useState("");
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    useEffect(() => {
        if (emblaApi) emblaApi.scrollTo(0);
    }, [emblaApi]);

    const filteredDiseases = diseases[language].filter((d) =>
        d.name.toLowerCase().includes(search.toLowerCase())
    );

    const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
    const scrollNext = () => emblaApi && emblaApi.scrollNext();

    return (
        <div className="min-h-screen flex flex-col items-center lg:pt-[94px] pt-42">
            <input
                type="text"
                placeholder={
                    language === "en"
                        ? "Search for a disease..."
                        : "ابحث عن مرض..."
                }
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="lg:w-full lg:max-w-md border border-gray-300 p-2 lg:rounded-md mb-1 outline-none rounded-lg shadow-lg"
            />

            <div className="relative w-5xl">
                <div className="overflow-hidden" ref={emblaRef}>
                    <div className="flex">
                        {filteredDiseases.map((disease) => (
                            <div
                                key={disease.id}
                                className="flex-[0_0_33.333%] px-2"
                            >
                                <div className="bg-transparent rounded-2xl shadow-md px-2 py-1 text-center">
                                    <img
                                        src={disease.image}
                                        alt={disease.name}
                                        className="w-full h-35 object-cover rounded-xl"
                                    />
                                    <h3 className="font-bold text-green-800 text-md mb-1">
                                        {disease.name}
                                    </h3>
                                    <p className="text-gray-500">
                                        {disease.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* أزرار التحكم */}
                <button
                    className="absolute top-1/2 -left-8 transform -translate-y-1/2 bg-green-700 text-white p-2 rounded-full shadow-lg"
                    onClick={scrollPrev}
                >
                    <FaArrowLeft className="text-2xl" />
                </button>

                <button
                    className="absolute top-1/2 -right-8 transform -translate-y-1/2 bg-green-700 text-white p-2 rounded-full shadow-lg"
                    onClick={scrollNext}
                >
                    <FaArrowRight className="text-2xl" />
                </button>
            </div>
        </div>
    );
}
