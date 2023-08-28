import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flexBetween h-screen">
      <div className="w-2/5 h-full">
        <Image
          src="/entry.png"
          alt="entry background"
          width={900}
          height={1200}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
      <div className="w-3/5 h-full flex justify-center">
        <div className="max-w-[720px] w-full">{children}</div>
      </div>
    </div>
  );
}
