import axios from "axios";
import { cn } from "../utils/cn";
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { urlValidator } from "@/validators/formValidators";

type DbUrl = {
  originalUrl: string;
  shortenedUrl: string;
  expiresAt: Date;
};

function MyUrls() {
  const [urls, setUrls] = useState<DbUrl[]>([]);
  let inputUrlRef = useRef<HTMLInputElement>(null);
  let [isValidInputUrl, setIsValidInputUrl] = useState<boolean>(true);
  let [inputUrlErrorMessage, setInputUrlErrorMessage] = useState<string>();

  useEffect(() => {
    async function getUrls() {
      try {
        const response = await axios.get("http://localhost:4000/api/urls");
        setUrls(response.data);
      } catch (error) {
        console.error("Failed to fetch URLs:", error);
      }
    }
    getUrls();
  }, []);

  function handleShortenUrl(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();

    let parsedUrlResult = urlValidator.safeParse(inputUrlRef.current?.value);
    if (!parsedUrlResult.success) {
      setIsValidInputUrl(false);
      setInputUrlErrorMessage(parsedUrlResult.error.issues[0].message);
    } else {
      setIsValidInputUrl(true);
    }
  }

  return (
    <div className="min-h-screen w-full dark:bg-black ">
      <h3 className="pt-5 px-10 dark:text-white text-center text-2xl font-bold	 ">
        Generate Short URL
      </h3>
      <div className="px-10 pt-10 flex items-center justify-center gap-4">
        {!isValidInputUrl ? (
          <p className="text-red-700 ml-2 text-sm">{inputUrlErrorMessage}</p>
        ) : null}
        <input
          type={"text"}
          placeholder="Your URL goes here..."
          className={cn(
            `flex h-10 w-full border-none bg-gray-50 dark:bg-zinc-800 text-black dark:text-white shadow-input rounded-md px-3 py-2 text-sm  file:border-0 file:bg-transparent 
          file:text-sm file:font-medium placeholder:text-neutral-400 dark:placeholder-text-neutral-600 
          focus-visible:outline-none focus-visible:ring-[2px]  focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-600
           disabled:cursor-not-allowed disabled:opacity-50
           dark:shadow-[0px_0px_1px_1px_var(--neutral-700)]
           group-hover:shadow-none transition duration-400
           `
          )}
        />
        <Button className="text-lg" onClick={handleShortenUrl}>
          Shorten URL
        </Button>
      </div>

      <h3 className="mt-10 px-10 dark:text-white text-center text-2xl font-bold	 ">
        Your URLs
      </h3>
      <div className="mt-10 px-10 dark:text-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-wrap">Short URL</TableHead>
              <TableHead>Original URL</TableHead>
              <TableHead className="w-[100px]">Expires At</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {urls.map((url) => {
              return (
                <TableRow key={url.shortenedUrl}>
                  <TableCell>{url.shortenedUrl}</TableCell>
                  <TableCell>{url.originalUrl}</TableCell>
                  <TableCell>{url.expiresAt.toUTCString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default MyUrls;
