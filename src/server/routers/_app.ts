import { router } from "../trpc";
import { auctionRouter } from "./auction";
import { tokenRouter } from "./token";

export const appRouter = router({
  token: tokenRouter,
  auction: auctionRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
