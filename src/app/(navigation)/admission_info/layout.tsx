import type {Metadata} from "next";


export const metadata:Metadata= {
  title: "Admission Information | Citadel-i",
};

export default function AdmissionLayout ({children}:any){
    return <>{children}</>
}