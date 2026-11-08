import { useEffect, useRef, useState } from "react";
import { doc, onSnapshot, updateDoc, increment } from "firebase/firestore";
import { db } from "../firebase";

type LikeErrorDetail = { likes: number; message: string };
type LikeSuccessDetail = { message: string };

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [status, setStatus] = useState("");
  const mounted = useRef(false);
  const animationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    mounted.current = true;
    setIsClient(true);
    if (!db) {
      setIsLoading(false);
      setLoadError(true);
      setStatus("The like count is unavailable right now.");
      return () => {
        mounted.current = false;
      };
    }
    setIsLiked(localStorage.getItem("websiteIsLiked") === "true");

    const likeDocRef = doc(db, "likes", "counter");
    const unsubscribe = onSnapshot(likeDocRef, (docSnap) => {
      if (!mounted.current) return;
      if (docSnap.exists()) {
        const value = docSnap.data().likes;
        setLikes(typeof value === "number" && Number.isFinite(value) ? Math.max(0, value) : 0);
      }
      setIsLoading(false);
      setLoadError(false);
      setStatus((previous) => previous === "The like count is unavailable right now." ? "" : previous);
    }, (error) => {
      console.error("Error loading likes:", error);
      if (!mounted.current) return;
      setIsLoading(false);
      setLoadError(true);
      setStatus("The like count is unavailable right now.");
    });

    const handleLikeError = (event: Event) => {
      const detail = (event as CustomEvent<LikeErrorDetail>).detail;
      if (!mounted.current || !detail) return;
      setLikes(detail.likes);
      setIsLiked(false);
      setIsProcessing(false);
      setIsAnimating(false);
      setStatus(detail.message);
    };
    const handleLikeSuccess = (event: Event) => {
      const detail = (event as CustomEvent<LikeSuccessDetail>).detail;
      if (!mounted.current || !detail) return;
      setIsLiked(true);
      setIsProcessing(false);
      setIsAnimating(false);
      setStatus(detail.message);
    };
    window.addEventListener("portfolio:like-error", handleLikeError);
    window.addEventListener("portfolio:like-success", handleLikeSuccess);

    return () => {
      mounted.current = false;
      unsubscribe();
      window.removeEventListener("portfolio:like-error", handleLikeError);
      window.removeEventListener("portfolio:like-success", handleLikeSuccess);
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
    };
  }, []);

  const handleLike = async () => {
    if (!db || isLoading || isProcessing || isLiked) return;

    const previousLikes = likes;
    setLikes((previous) => previous + 1);
    setIsLiked(true);
    setStatus("");
    localStorage.setItem("websiteIsLiked", "true");

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsAnimating(true);
      if (animationTimeout.current) clearTimeout(animationTimeout.current);
      animationTimeout.current = setTimeout(() => {
        if (mounted.current) setIsAnimating(false);
      }, 600);
    }

    try {
      setIsProcessing(true);
      const likeDocRef = doc(db, "likes", "counter");
      await updateDoc(likeDocRef, { likes: increment(1) });
      window.dispatchEvent(new CustomEvent<LikeSuccessDetail>("portfolio:like-success", {
        detail: { message: "Thanks for the like." },
      }));
    } catch (error) {
      console.error("Error updating likes:", error);
      localStorage.removeItem("websiteIsLiked");
      window.dispatchEvent(new CustomEvent<LikeErrorDetail>("portfolio:like-error", {
        detail: { likes: previousLikes, message: "Your like could not be saved. Please try again." },
      }));
    } finally {
      if (mounted.current) setIsProcessing(false);
    }
  };

  if (!isClient) return null;

  const borderColorClass = isLiked ? "border-[var(--sec)]" : "border-[var(--white-icon)]";
  const feedback = isLoading ? "Loading likes…" : status || (loadError ? "The like count could not be loaded." : "");
  const feedbackIsError = /unavailable|could not/i.test(feedback);

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleLike}
        disabled={isLoading || isProcessing || isLiked}
        aria-pressed={isLiked}
        aria-busy={isLoading || isProcessing}
        className={`like-button group relative flex h-10 w-40 items-center justify-center rounded-full border-2 p-3 transition-all duration-300 ease-in-out ${borderColorClass} ${!isLiked && !isLoading ? "hover:scale-105 hover:border-[var(--white)]" : "cursor-default"} ${isAnimating ? "animate-heart-pulse" : ""}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={`h-6 w-6 transition-all duration-300 ease-in-out ${isLiked ? "scale-110 text-[var(--sec)]" : "text-[var(--white-icon)] group-hover:scale-105 group-hover:text-[var(--white)]"}`}>
          <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0484 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z" />
        </svg>
        <span className="pl-3 text-sm font-medium text-[var(--white)]">{isLoading ? "Loading…" : `${likes} Likes`}</span>
      </button>
      {feedback && <p className={`text-xs ${feedbackIsError ? "text-rose-300" : "text-[var(--white-icon)]"}`} role="status" aria-live="polite">{feedback}</p>}
    </div>
  );
};

export default LikeButton;
