import type { BookDetail, GoogleBookResponse } from "../../../shared/bookModel";

export default defineEventHandler(async (event): Promise<BookDetail> => {
  const id = getRouterParam(event, "id");

  if (!id) {
    throw createError({
      statusCode: 400,
      statusMessage: "Book ID is required",
    });
  }

  const config = useRuntimeConfig();

  try {
    const response = await $fetch<GoogleBookResponse>(
      `https://www.googleapis.com/books/v1/volumes/${id}`,
      {
        query: {
          key: config.googleBooksApiKey,
        },
      },
    );

    const volumeInfo = response.volumeInfo;

    return {
      id: response.id,
      title: volumeInfo.title ?? "Unknown title",
      authors: volumeInfo.authors ?? [],
      publishedYear: volumeInfo.publishedDate
        ? Number.parseInt(volumeInfo.publishedDate.substring(0, 4))
        : undefined,
      description: volumeInfo.description ?? "",
      cover:
        volumeInfo.imageLinks?.thumbnail ??
        volumeInfo.imageLinks?.smallThumbnail ??
        "",
      publisher: volumeInfo.publisher ?? "",
      pageCount: volumeInfo.pageCount ?? 0,
      categories: volumeInfo.categories ?? [],
      averageRating: volumeInfo.averageRating,
      ratingsCount: volumeInfo.ratingsCount,
      language: volumeInfo.language ?? "",
      previewLink: volumeInfo.previewLink ?? "",
    };
  } catch (error) {
    console.error("Google Books API error:", error);

    throw createError({
      statusCode: 500,
      statusMessage: "Unable to fetch books",
    });
  }
});
