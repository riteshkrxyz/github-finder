import HomePageComponent from "@/components/homepage";
const token = process.env.TOKEN;
export default function Home() {
  return (
    <>
      <HomePageComponent token={token} />
    </>
  );
}
