import Image from "next/image";
function Loading() {
  return (
    <>
      <div className="bg-white absolute top-0 left-0 w-full h-screen flex flex-col gap-3 items-center justify-center">
        <Image
          alt=""
          src={"/images/logo.jpg"}
          width={100}
          height={100}
          className="animate-pulse"
        />
        <h3 className="text-primary-main text-center text-2xl font-semibold animate-bounce">
          Loading...
        </h3>
      </div>
    </>
  );
}

export default Loading;
