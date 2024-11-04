import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {

  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY)

  console.log(JSON.stringify(posts, null, 2))

  // const posts = [
  //   {
  //     _createdAt: new Date(),
  //     views: 55,
  //     author: { _id: 1, name: "Elon Musk" },
  //     _id: 1,
  //     description: "This is a description",
  //     image: "https://images.unsplash.com/photo-1730401723426-5ef4de56df92?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxNHx8fGVufDB8fHx8fA%3D%3D",
  //     category: "Robots",
  //     title: "We Robots",
  //   },
  // ];

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br /> Connect with Entrepreneurs
        </h1>

        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote on Pitches and Get Notices in Virtual Competitions.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section_container">
        <p className="text-30-semibold ">
          {query ? `Search results for "${query}"` : "All Startups"}
        </p>

        <ul className="mt-7 card_grid">
          {
            posts?.length>0 ? (
              posts.map( (post: StartupCardType, number) => (
              <StartupCard key={post?._id}  post={post} />
              ))
            ) : (
              <p className="no-results">
                No Starups Found
              </p>
            )
          }
        </ul>
      </section>
    </>
  );
}
