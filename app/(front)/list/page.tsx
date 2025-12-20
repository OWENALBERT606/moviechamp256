// import { redirect } from "next/navigation";
// import { getSession } from "@/actions/auth";
// import { MyListContent } from "./components/my-list-content";
// import { getMyList, getMyListStats } from "@/actions/mylist";

// export default async function MyListPage() {
//   const session = await getSession();

//   if (!session?.user) {
//     redirect("/login");
//   }

//   const userId = session.user.id;

//   const [myListData, statsData] = await Promise.all([
//     getMyList(userId),
//     getMyListStats(userId),
//   ]);

//   const myList = myListData.data;
//   const stats = statsData.data || { totalMovies: 0, totalSeries: 0, total: 0 };

//   return (
//     <div className="min-h-screen bg-background">
//       <div className="container mx-auto px-4 md:px-12 lg:px-24 py-12">
//         <div className="mb-8">
//           <h1 className="text-4xl font-bold mb-2">My List</h1>
//           <p className="text-muted-foreground">
//             {stats.total} {stats.total === 1 ? "item" : "items"} •{" "}
//             {stats.totalMovies} {stats.totalMovies === 1 ? "movie" : "movies"} •{" "}
//             {stats.totalSeries} {stats.totalSeries === 1 ? "series" : "series"}
//           </p>
//         </div>

//         {myList && <MyListContent list={myList} userId={userId} />}
//       </div>
//     </div>
//   );
// }





import { getSession } from "@/actions/auth";
import { MyListContent } from "./components/my-list-content";
import { getMyList, getMyListStats } from "@/actions/mylist";
import { AuthCheck } from "@/components/authcheck/list-check";

export default async function MyListPage() {
  const session = await getSession();
  const hasSession = !!session?.user;

  // Fetch data only if user is logged in
  let myList = null;
  let stats = { totalMovies: 0, totalSeries: 0, total: 0 };

  if (hasSession) {
    const userId = session.user.id;
    const [myListData, statsData] = await Promise.all([
      getMyList(userId),
      getMyListStats(userId),
    ]);
    myList = myListData.data;
    stats = statsData.data || stats;
  }

  return (
    <AuthCheck hasSession={hasSession}>
      <div className="min-h-screen lg:pt-12 bg-background">
        <div className="container mx-auto px-4 md:px-12 lg:px-24 py-12">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">My List</h1>
            <p className="text-muted-foreground">
              {stats.total} {stats.total === 1 ? "item" : "items"} •{" "}
              {stats.totalMovies} {stats.totalMovies === 1 ? "movie" : "movies"} •{" "}
              {stats.totalSeries} {stats.totalSeries === 1 ? "series" : "series"}
            </p>
          </div>

          {myList && session?.user && (
            <MyListContent list={myList} userId={session.user.id} />
          )}
        </div>
      </div>
    </AuthCheck>
  );
}