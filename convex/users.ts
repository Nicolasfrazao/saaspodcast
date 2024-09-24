import { ConvexError, v } from "convex/values";

import { internalMutation, query } from "./_generated/server";

/**
 * A query to get a user by their Clerk ID.
 *
 * This query takes a single argument, `clerkId`, which is the Clerk ID of the
 * user to retrieve.
 *
 * The query uses the `filter` method to find a single document in the `users`
 * table that has a `clerkId` field equal to the provided `clerkId` argument.
 *
 * If no matching document is found, the query throws a `ConvexError` with the
 * message "User not found".
 *
 * Otherwise, the query returns the matching user document.
 */
export const getUserById = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    /**
     * Find a single document in the `users` table that has a `clerkId` field
     * equal to the provided `clerkId` argument.
     */
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    /**
     * If no matching document is found, throw a `ConvexError` with the message
     * "User not found".
     */
    if (!user) {
      throw new ConvexError("User not found");
    }

    /**
     * Otherwise, return the matching user document.
     */
    return user;
  },
});
// this query is used to get the top user by podcast count. first the podcast is sorted by views and then the user is sorted by total podcasts, so the user with the most podcasts will be at the top.

/**
 * A query to get the top user by podcast count.
 *
 * This query takes no arguments.
 *
 * The query first finds all users in the `users` table and then for each user,
 * it finds all of the user's podcasts in the `podcasts` table. The podcasts are
 * sorted in descending order by the `views` field (i.e. the podcast with the
 * most views is first) and then the user is sorted by the total number of
 * podcasts they have.
 *
 * The result is an array of objects where each object has the following
 * properties:
 *
 * - `clerkId`: the Clerk ID of the user
 * - `email`: the user's email
 * - `imageUrl`: the user's image URL
 * - `name`: the user's name
 * - `totalPodcasts`: the total number of podcasts the user has
 * - `podcast`: an array of objects where each object has the following
 *   properties:
 *   - `podcastTitle`: the title of the podcast
 *   - `podcastId`: the ID of the podcast
 *
 * The array is sorted so that the user with the most podcasts is at the top.
 */
export const getTopUserByPodcastCount = query({
  args: {},
  handler: async (ctx, args) => {
    // Find all users in the `users` table
    const user = await ctx.db.query("users").collect();

    // For each user, find all of their podcasts in the `podcasts` table
    const userData = await Promise.all(
      user.map(async (u) => {
        // Find all of the user's podcasts in the `podcasts` table
        const podcasts = await ctx.db
          .query("podcasts")
          .filter((q) => q.eq(q.field("authorId"), u.clerkId))
          .collect();

        // Sort the podcasts in descending order by the `views` field
        const sortedPodcasts = podcasts.sort((a, b) => b.views - a.views);

        // For each podcast, create an object with the title and ID of the
        // podcast
        const podcastObjects = sortedPodcasts.map((p) => ({
          podcastTitle: p.podcastTitle,
          podcastId: p._id,
        }));

        // Return an object with the user's information and the array of
        // podcast objects
        return {
          ...u,
          totalPodcasts: podcasts.length,
          podcast: podcastObjects,
        };
      })
    );

    // Sort the array of user objects by the total number of podcasts each
    // user has
    return userData.sort((a, b) => b.totalPodcasts - a.totalPodcasts);
  },
});

/**
 * A mutation to create a new user.
 *
 * This mutation takes the following arguments:
 *
 * - `clerkId`: the Clerk ID of the user to create
 * - `email`: the user's email
 * - `imageUrl`: the user's image URL
 * - `name`: the user's name
 *
 * The mutation checks if the user already exists and if so, throws a
 * `ConvexError` with the message "User already exists". Otherwise, it creates a
 * new user document in the `users` table with the provided arguments.
 */

/**
 * A mutation to create a new user.
 *
 * This mutation takes the following arguments:
 *
 * - `clerkId`: the Clerk ID of the user to create
 * - `email`: the user's email
 * - `imageUrl`: the user's image URL
 * - `name`: the user's name
 *
 * The mutation checks if the user already exists and if so, throws a
 * `ConvexError` with the message "User already exists". Otherwise, it creates a
 * new user document in the `users` table with the provided arguments.
 */
export const createUser = internalMutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    imageUrl: v.string(),
    name: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if the user already exists
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (existingUser) {
      // If the user already exists, throw a ConvexError with the message
      // "User already exists"
      throw new ConvexError("User already exists");
    }

    // If the user doesn't exist, create a new user document in the `users`
    // table with the provided arguments
    await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      imageUrl: args.imageUrl,
      name: args.name,
    });
  },
});

/**
 * A mutation to update an existing user.
 *
 * This mutation takes the same arguments as the `createUser` mutation.
 *
 * The mutation updates the user document in the `users` table with the
 * provided arguments.
 */

/**
 * A mutation to update an existing user.
 *
 * This mutation takes the same arguments as the `createUser` mutation.
 *
 * The mutation updates the user document in the `users` table with the
 * provided arguments.
 *
 * Additionally, the mutation also updates any podcast documents in the
 * `podcasts` table whose `authorId` matches the `clerkId` argument. This is
 * because when a user updates their profile, we want to update the author
 * image URL on any of their existing podcasts.
 */
export const updateUser = internalMutation({
  args: {
    clerkId: v.string(),
    imageUrl: v.string(),
    email: v.string(),
  },
  async handler(ctx, args) {

    /**
     * First, we check if the user exists. If not, we throw a ConvexError
     * with the message "User not found". This is because we can't update a
     * user that doesn't exist.
     */
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    /**
     * If the user exists, we patch the user document with the new values.
     */
    await ctx.db.patch(user._id, {
      imageUrl: args.imageUrl,
      email: args.email,
    });

    /**
     * Next, we find all podcast documents in the `podcasts` table whose
     * `authorId` matches the `clerkId` argument. We do this so that we can
     * update the author image URL on any of the user's existing podcasts.
     */
    const podcast = await ctx.db
      .query("podcasts")
      .filter((q) => q.eq(q.field("authorId"), args.clerkId))
      .collect();

    /**
     * Finally, we loop through the array of podcast documents and patch each
     * one with the new author image URL.
     */
    await Promise.all(
      podcast.map(async (p) => {
        await ctx.db.patch(p._id, {
          authorImageUrl: args.imageUrl,
        });
      })
    );
  },
});

/**
 * A mutation to delete a user.
 *
 * This mutation takes a single argument, `clerkId`, which is the Clerk ID of
 * the user to delete.
 *
 * The mutation deletes the user document in the `users` table with the
 * provided Clerk ID.
 */

/**
 * A mutation to delete a user.
 *
 * This mutation takes a single argument, `clerkId`, which is the Clerk ID of
 * the user to delete.
 *
 * The mutation deletes the user document in the `users` table with the
 * provided Clerk ID. If the user does not exist, it throws a ConvexError with
 * the message "User not found". This is because we can't delete a user that
 * doesn't exist.
 */
export const deleteUser = internalMutation({
  args: { clerkId: v.string() },
  async handler(ctx, args) {
    /**
     * First, we check if the user exists. If not, we throw a ConvexError
     * with the message "User not found". This is because we can't delete a
     * user that doesn't exist.
     */
    const user = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
      .unique();

    if (!user) {
      throw new ConvexError("User not found");
    }

    /**
     * If the user exists, we delete the user document in the `users` table
     * with the provided Clerk ID.
     */
    await ctx.db.delete(user._id);
  },
});

