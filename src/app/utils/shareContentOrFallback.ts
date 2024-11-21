import toast from "react-hot-toast";

export function shareContent(url: string, title: string, text: string) {
  if (navigator.share) {
    navigator
      .share({
        title,
        text,
        url,
      })
      .then(() => {
        console.log("Successfully shared!");
      })
      .catch((error) => {
        toast.error("Something went wrong sharing the content", error);
      });
  } else {
    toast.error("Web Share API is not supported on this browser.");
  }
}

export function fallbackShare(url: string) {
  const shareUrl = url;
  navigator.clipboard
    .writeText(shareUrl)
    .then(() => {
      toast.success(
        "Link copied to clipboard because your browser doesn't support share!"
      );
    })
    .catch((err) => {
      toast.error("Failed to copy: ", err);
    });
}

interface shareOrFallbackType {
  url: string;
  title: string;
  text: string;
}

export function shareOrFallback({ url, title, text }: shareOrFallbackType) {
  if (typeof navigator.share === "function") {
    shareContent(url, title, text);
  } else {
    fallbackShare(url);
  }
}
