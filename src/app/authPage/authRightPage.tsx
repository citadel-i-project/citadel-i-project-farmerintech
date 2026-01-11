import logo from "@/app/assets/Logo.svg";
import asideImage from "@/app/assets/reg.jpg";
import Image from "next/image";

export const AuthPage = () => {
  return (
    <div className="relative w-full h-64 md:h-auto">
      {/* Background Image */}
      <Image
        src={asideImage}
        alt="Education background"
        fill
        className="object-cover rounded-t-lg md:rounded-t-none"
        priority
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 rounded-t-lg md:rounded-t-none" />

      {/* Logo */}
      <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
        <Image src={logo} alt="Citadel logo" width={100} height={30} />
        <p className="text-white text-xs">| Education is all we do</p>
      </div>

      {/* Quote */}
      <div className="absolute bottom-12 left-4 md:left-12 right-4 text-white z-10 max-w-md md:max-w-[50%]">
        <p className="font-semibold text-sm md:text-base">
          “The beautiful thing about learning is that no one can take it away from
          you.”
        </p>
        <p className="text-xs text-right mt-3">– B.B. King</p>
      </div>
    </div>
  );
};
