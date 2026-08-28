import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "nohint404",
    short_name: "nohint404",
    description: "The engineering portfolio of nohint404.",
    start_url: "/",
    display: "standalone",
    background_color: "#080806",
    theme_color: "#080806",
  };
}
