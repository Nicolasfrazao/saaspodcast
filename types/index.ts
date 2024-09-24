/* eslint-disable no-unused-vars */

import { Dispatch, SetStateAction } from "react";

import { Id } from "@/convex/_generated/dataModel";

/**
 * EmptyStateProps is a type that represents the props that can be passed
 * to the EmptyState component. The EmptyState component is a generic
 * component that can be used to display an empty state in various
 * parts of the application, such as on the home page or in the search
 * results page.
 *
 * title: The title of the empty state.
 * search: A boolean indicating whether the empty state is being
 *         displayed in the search results page. If true, the
 *         EmptyState component will display a search input field
 *         and a button to search for podcasts.
 * buttonText: The text to display on the search button.
 * buttonLink: The link to navigate to when the search button is
 *             clicked.
 */
export interface EmptyStateProps {
  title: string;
  search?: boolean;
  buttonText?: string;
  buttonLink?: string;
}

/**
 * TopPodcastersProps is a type that represents the props that can be
 * passed to the TopPodcasters component. The TopPodcasters component is
 * a component that displays a list of the top podcasters on the home
 * page. The top podcasters are determined by the number of podcasts
 * they have created.
 *
 * _id: The ID of the user.
 * _creationTime: The time when the user was created.
 * email: The email of the user.
 * imageUrl: The URL of the user's profile image.
 * clerkId: The ID of the Clerk user.
 * name: The name of the user.
 * podcast: An array of podcast objects. Each podcast object contains
 *          the title of the podcast and the ID of the podcast.
 * totalPodcasts: The total number of podcasts created by the user.
 */
export interface TopPodcastersProps {
  _id: Id<"users">;
  _creationTime: number;
  email: string;
  imageUrl: string;
  clerkId: string;
  name: string;
  podcast: {
    podcastTitle: string;
    podcastId: Id<"podcasts">;
  }[];
  totalPodcasts: number;
}

/**
 * PodcastProps is a type that represents the props that can be passed
 * to the PodcastCard component. The PodcastCard component displays a
 * podcast in a card format, with information about the podcast such as
 * the title, description, author, views, and duration.
 *
 * _id: The ID of the podcast.
 * _creationTime: The time when the podcast was created.
 * audioStorageId: The ID of the audio file in the storage.
 * user: The ID of the user who created the podcast.
 * podcastTitle: The title of the podcast.
 * podcastDescription: The description of the podcast.
 * audioUrl: The URL of the audio file.
 * imageUrl: The URL of the podcast image.
 * imageStorageId: The ID of the image file in the storage.
 * author: The name of the author of the podcast.
 * authorId: The ID of the author of the podcast.
 * authorImageUrl: The URL of the author's profile image.
 * voicePrompt: The prompt for the voice generator.
 * imagePrompt: The prompt for the image generator.
 * voiceType: The type of voice to use when generating the audio.
 * audioDuration: The duration of the audio in seconds.
 * views: The number of views of the podcast.
 */
export interface PodcastProps {
  _id: Id<"podcasts">;
  _creationTime: number;
  audioStorageId: Id<"_storage"> | null;
  user: Id<"users">;
  podcastTitle: string;
  podcastDescription: string;
  audioUrl: string | null;
  imageUrl: string | null;
  imageStorageId: Id<"_storage"> | null;
  author: string;
  authorId: string;
  authorImageUrl: string;
  voicePrompt: string;
  imagePrompt: string | null;
  voiceType: string;
  audioDuration: number;
  views: number;
}

/**
 * ProfilePodcastProps is a type that represents the props that can be passed
 * to the ProfileCard component. The ProfileCard component displays a
 * user's profile, including the podcasts they have created and the number
 * of listeners.
 *
 * podcasts: An array of podcast objects. Each podcast object is a
 *          PodcastProps object.
 * listeners: The number of listeners of the user.
 */
export interface ProfilePodcastProps {
  podcasts: PodcastProps[];
  listeners: number;
}

/**
 * GeneratePodcastProps is a type that represents the props that can be passed
 * to the GeneratePodcast component. The GeneratePodcast component is a form
 * that allows the user to generate a podcast by providing a voice type and
 * a prompt for the voice generator.
 *
 * voiceType: The type of voice to use when generating the audio.
 * setAudio: A function that sets the URL of the generated audio.
 * audio: The URL of the generated audio.
 * setAudioStorageId: A function that sets the ID of the audio file in
 *                   the storage.
 * voicePrompt: The prompt for the voice generator.
 * setVoicePrompt: A function that sets the prompt for the voice generator.
 * setAudioDuration: A function that sets the duration of the generated audio.
 */
export interface GeneratePodcastProps {
  voiceType: string;
  setAudio: Dispatch<SetStateAction<string>>;
  audio: string;
  setAudioStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  voicePrompt: string;
  setVoicePrompt: Dispatch<SetStateAction<string>>;
  setAudioDuration: Dispatch<SetStateAction<number>>;
}

/**
 * GenerateThumbnailProps is a type that represents the props that can be
 * passed to the GenerateThumbnail component. The GenerateThumbnail
 * component is a form that allows the user to generate a thumbnail image
 * for their podcast by providing a prompt for the image generator.
 *
 * setImage: A function that sets the URL of the generated image.
 * setImageStorageId: A function that sets the ID of the image file in
 *                   the storage.
 * image: The URL of the generated image.
 * imagePrompt: The prompt for the image generator.
 * setImagePrompt: A function that sets the prompt for the image generator.
 */
export interface GenerateThumbnailProps {
  setImage: Dispatch<SetStateAction<string>>;
  setImageStorageId: Dispatch<SetStateAction<Id<"_storage"> | null>>;
  image: string;
  imagePrompt: string;
  setImagePrompt: Dispatch<SetStateAction<string>>;
}

/**
 * LatestPodcastCardProps is a type that represents the props that can be
 * passed to the LatestPodcastCard component. The LatestPodcastCard component
 * displays a podcast in a card format, with information about the podcast
 * such as the title, duration, author, views, and ID.
 *
 * imgUrl: The URL of the podcast image.
 * title: The title of the podcast.
 * duration: The duration of the podcast in seconds.
 * index: The index of the podcast in the list of latest podcasts.
 * audioUrl: The URL of the audio file.
 * author: The name of the author of the podcast.
 * views: The number of views of the podcast.
 * podcastId: The ID of the podcast.
 */
export interface LatestPodcastCardProps {
  imgUrl: string;
  title: string;
  duration: string;
  index: number;
  audioUrl: string;
  author: string;
  views: number;
  podcastId: Id<"podcasts">;
}

/**
 * PodcastDetailPlayerProps is a type that represents the props that can be
 * passed to the PodcastDetailPlayer component. The PodcastDetailPlayer
 * component displays a podcast in a detail view, with information about
 * the podcast such as the title, author, image, ID, image storage ID, and
 * audio storage ID.
 *
 * audioUrl: The URL of the audio file.
 * podcastTitle: The title of the podcast.
 * author: The name of the author of the podcast.
 * isOwner: A boolean indicating whether the user is the owner of the
 *         podcast.
 * imageUrl: The URL of the podcast image.
 * podcastId: The ID of the podcast.
 * imageStorageId: The ID of the image file in the storage.
 * audioStorageId: The ID of the audio file in the storage.
 * authorImageUrl: The URL of the author's profile image.
 * authorId: The ID of the author.
 */
export interface PodcastDetailPlayerProps {
  audioUrl: string;
  podcastTitle: string;
  author: string;
  isOwner: boolean;
  imageUrl: string;
  podcastId: Id<"podcasts">;
  imageStorageId: Id<"_storage">;
  audioStorageId: Id<"_storage">;
  authorImageUrl: string;
  authorId: string;
}

/**
 * AudioProps is a type that represents the properties of an audio file.
 *
 * title: The title of the audio file.
 * audioUrl: The URL of the audio file.
 * author: The name of the author of the audio file.
 * imageUrl: The URL of the image associated with the audio file.
 * podcastId: The ID of the podcast that the audio file belongs to.
 */
export interface AudioProps {
  title: string;
  audioUrl: string;
  author: string;
  imageUrl: string;
  podcastId: string;
}

/**
 * AudioContextType is the type of the context value for the AudioContext
 * context. It contains the current audio file and a function to set the
 * current audio file.
 */
export interface AudioContextType {
  /**
   * audio is the current audio file. It is undefined if there is no audio
   * file being played.
   */
  audio: AudioProps | undefined;

  /**
   * setAudio is a function to set the current audio file.
   */
  setAudio: React.Dispatch<React.SetStateAction<AudioProps | undefined>>;
}

/**
 * PodcastCardProps is the type of the props for the PodcastCard component.
 *
 * imgUrl: The URL of the image for the podcast.
 * title: The title of the podcast.
 * description: A short description of the podcast.
 * podcastId: The ID of the podcast.
 */
export interface PodcastCardProps {
  imgUrl: string;
  title: string;
  description: string;
  podcastId: Id<"podcasts">;
}

/**
 * CarouselProps is the type of the props for the Carousel component.
 *
 * fansLikeDetail is an array of top podcasters. Each element in the array
 * represents a podcast and contains the following properties:
 *
 *   - podcastId: The ID of the podcast.
 *   - title: The title of the podcast.
 *   - podcastDescription: A short description of the podcast.
 *   - author: The name of the author of the podcast.
 *   - imageUrl: The URL of the image associated with the podcast.
 *   - authorImageUrl: The URL of the author's profile image.
 *   - authorId: The ID of the author.
 */
export interface CarouselProps {
  fansLikeDetail: TopPodcastersProps[];
}

/**
 * ProfileCardProps is the type of the props for the ProfileCard component.
 *
 * podcastData is an array of podcasts. Each element in the array represents a
 * podcast and contains the following properties:
 *
 *   - podcastId: The ID of the podcast.
 *   - title: The title of the podcast.
 *   - podcastDescription: A short description of the podcast.
 *   - author: The name of the author of the podcast.
 *   - imageUrl: The URL of the image associated with the podcast.
 *   - authorImageUrl: The URL of the author's profile image.
 *   - authorId: The ID of the author.
 *
 * imageUrl is the URL of the image associated with the profile.
 * userFirstName is the first name of the user.
 */
export interface ProfileCardProps {
  podcastData: ProfilePodcastProps[];
  imageUrl: string;
  userFirstName: string;
}
/**
 * UseDotButtonType is the type of the object returned by the useDotButton hook.
 *
 * useDotButton is a hook that is used to manage the state of the dot buttons
 * in the EmblaCarousel component. The hook returns an object with three
 * properties:
 *
 *   - selectedIndex: The index of the currently selected dot button. This
 *     property is a number that indicates the index of the currently
 *     selected dot button. For example, if the first dot button is
 *     selected, then selectedIndex is 0.
 *
 *   - scrollSnaps: An array of numbers that represent the scroll snap
 *     positions of the EmblaCarousel component. This property is an array
 *     of numbers where each number represents the position of a scroll
 *     snap in the EmblaCarousel component.
 *
 *   - onDotButtonClick: A function that is called when a dot button is
 *     clicked. This function takes a single argument, which is the index
 *     of the dot button that was clicked. For example, if the first dot
 *     button is clicked, then the index argument will be 0.
 */
export type UseDotButtonType = {
  /**
   * The index of the currently selected dot button.
   */
  selectedIndex: number;

  /**
   * An array of numbers that represent the scroll snap positions of the
   * EmblaCarousel component.
   */
  scrollSnaps: number[];

  /**
   * A function that is called when a dot button is clicked. This function
   * takes a single argument, which is the index of the dot button that was
   * clicked.
   */
  onDotButtonClick: (index: number) => void;
};


